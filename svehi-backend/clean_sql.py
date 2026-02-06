import re

def clean_sql(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # 1. Remove LOB storage clauses
    # Matches LOB (...) STORE AS SECUREFILE (...) ;
    content = re.sub(r'LOB\s*\([^)]+\)\s*STORE\s*AS\s*SECUREFILE\s*\([^;]+;', ';', content, flags=re.IGNORECASE | re.DOTALL)
    
    # 2. Fix Sequence MAXVALUE
    content = content.replace('MAXVALUE 999999999999999999999999999', 'MAXVALUE 9223372036854775807')

    # 3. Remove CREATE VIEW blocks
    # These often contain Oracle-specific syntax or missing tables (DB Links)
    content = re.sub(r'CREATE\s+(?:OR\s+REPLACE\s+)?(?:FORCE\s+)?(?:EDITIONABLE\s+)?VIEW.*?;', '-- Removed complex view\n', content, flags=re.IGNORECASE | re.DOTALL)

    # 4. Remove remaining DB Links (@...)
    content = re.sub(r'@\w+', '', content)

    # 5. Fix closing );
    content = re.sub(r'\)\s*;', ');', content)
    
    # 6. Remove any remaining Oracle-isms like "ENABLE" at the end of constraints if they cause issues
    # Oracle: ALTER TABLE ... ADD CONSTRAINT ... ENABLE;
    # Postgres doesn't use "ENABLE" there.
    content = re.sub(r'ENABLE\s*;', ';', content, flags=re.IGNORECASE)

    # 7. Add psql specific settings at the top
    # Use \set for psql variables
    header = "\\set ON_ERROR_STOP off\n"
    if not content.startswith("\\set ON_ERROR_STOP"):
        content = header + content

    with open(filename, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    clean_sql('init-db/01-schema.sql')
    clean_sql('../.agent/bbdd/BBDD_SVEHI_PG.sql')

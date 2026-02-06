import re
import sys
import os

def convert_oracle_to_postgres(input_file, output_file):
    print(f"Converting {input_file} to {output_file}...")
    
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as f_in:
        content = f_in.read()

    # 1. Remove Oracle-specific block headers/footers and noise
    lines = content.splitlines()
    
    # Updated skip list and logic to handle semicolons
    
    # We will process line by line but track if we dropped a semicolon
    
    clean_lines = []
    pending_semicolon = False
    
    for line in lines:
        stripped = line.strip()
        
        # Skip SQL*Plus commands or Oracle specific headers not needed
        if stripped.startswith('--------------------------------------------------------') or stripped.startswith('--'):
            clean_lines.append(line)
            continue
        
        # Check if line has a semicolon at the end
        has_semicolon = stripped.endswith(';')
        
        # Identification of garbage lines
        is_garbage = False
        
        # Prefixes to skip (case insensitive check effectively)
        garbage_prefixes = [
            'PCTFREE', 'PCTUSED', 'INITRANS', 'MAXTRANS', 'NOCOMPRESS', 'LOGGING', 
            'STORAGE', 'TABLESPACE', 'BUFFER_POOL', 'PCTINCREASE', 'FREELISTS', 
            'FREELIST GROUPS', 'SEGMENT CREATION', 'CONNECT TO', 'USING \''
        ]
        
        if any(stripped.startswith(prefix) for prefix in garbage_prefixes):
            is_garbage = True
        
        if 'CREATE DATABASE LINK' in line:
            is_garbage = True # actually we want to comment this out, handled below?
            # The original code commented it out. Let's stick to that logic but implemented cleaner.
            pass

        # Special handling for "SEGMENT CREATION IMMEDIATE" which might be after ) on same line
        # But here we are iterating lines. 
        # If the line is just garbage, skip it.
        # If it contains garbage but also useful stuff (like closing parenthesis), be careful?
        # In the file, ) is usually on its own line or with SEGMENT CREATION.
        
        if is_garbage:
            if has_semicolon:
                 # Append semicolon to the last added non-comment line
                 idx = len(clean_lines) - 1
                 while idx >= 0:
                     if not clean_lines[idx].strip().startswith('--'):
                         s_stripped = clean_lines[idx].rstrip()
                         if not s_stripped.endswith(';'):
                              clean_lines[idx] = s_stripped + ';'
                         break
                     idx -= 1
            continue
            
        # Handle SEGMENT CREATION on the same line as )
        if ') SEGMENT CREATION' in line:
            # removing ' SEGMENT CREATION ...'
            # Check if original line had semicolon
            had_semi = ';' in line
            line = re.sub(r'\)\s*SEGMENT CREATION.*', ')', line)
            if had_semi and not line.strip().endswith(';'):
                line = line.rstrip() + ';'
            
        clean_lines.append(line)

    content = '\n'.join(clean_lines)
    
    # 2. General Replacements
    # ... (same as before)


    # 2. General Replacements
    
    # NUMBER data types
    # NUMBER(p,0) -> NUMERIC(p,0) or BIGINT/INTEGER depending on p, but NUMERIC is safest
    # NUMBER(p,s) -> NUMERIC(p,s)
    # NUMBER -> NUMERIC
    content = re.sub(r'NUMBER\((\d+),0\)', r'NUMERIC(\1,0)', content)
    content = re.sub(r'NUMBER\((\d+),(\d+)\)', r'NUMERIC(\1,\2)', content)
    content = re.sub(r'NUMBER', 'NUMERIC', content)
    
    # VARCHAR2 -> VARCHAR
    content = re.sub(r'VARCHAR2', 'VARCHAR', content)
    
    # BYTE qualifier in VARCHAR (e.g. VARCHAR2(200 BYTE)) -> VARCHAR(200)
    content = re.sub(r'VARCHAR\((\d+) BYTE\)', r'VARCHAR(\1)', content)
    
    # DATE -> TIMESTAMP (Oracle DATE contains time)
    # But often converted to TIMESTAMP in PG. 
    # Let's use TIMESTAMP for safety as Oracle Dates have time.
    content = re.sub(r' DATE', ' TIMESTAMP', content)
    
    # SYSDATE -> NOW() or CURRENT_TIMESTAMP
    content = re.sub(r'SYSDATE', 'CURRENT_TIMESTAMP', content)

    # Sequences
    # Oracle: CREATE SEQUENCE "SCHEMA"."SEQ" ...
    # Postgres: CREATE SEQUENCE "SCHEMA"."SEQ" ... (Syntax is mostly compatible)
    # Removing 'NOCYCLE', 'NOORDER', 'NOKEEP', 'NOSCALE', 'GLOBAL' which might not be supported or default
    content = re.sub(r' NOCYCLE', '', content)
    content = re.sub(r' NOORDER', '', content)
    content = re.sub(r' NOKEEP', '', content)
    content = re.sub(r' NOSCALE', '', content)
    content = re.sub(r' GLOBAL ', ' ', content) # GLOBAL is often used in temp tables but here maybe sequence scope?
    
    # 3. Clean up the trailing garbage in CREATE TABLE statements
    # The loop above removed lines, but we might have left hanging parenthesis or commas if not careful.
    # But simply removing lines like PCTFREE often leaves the previous line ending with a comma or parens fine.
    # However, create table in Oracle ends like:
    # ...
    # ) SEGMENT CREATION ...
    # PCTFREE ...
    # TABLESPACE ... ;
    #
    # We stripped the lines, so we might have:
    # ...
    # ) 
    # ;
    # Or
    # ...
    # ) ;
    # We need to make sure the closing parenthesis + semicolon is proper.
    
    # Let's aggressively look for the pattern:
    # ) <stuff we removed> ;
    
    # Since we removed the lines, 'content' now has empty lines where those were (or just joined).
    # Let's ensure semicolons are preserved.
    
    # 4. Schema Handling
    # The SQL uses "SVEHI". If we want to use that schema, we must create it.
    initial_sql = """
-- Converted from Oracle to PostgreSQL
CREATE SCHEMA IF NOT EXISTS "SVEHI";
SET search_path TO "SVEHI", public;

"""
    content = initial_sql + content

    # 5. Comment out GRANTs if roles don't exist?
    # For now, let's comment out GRANTs to avoid errors if roles are missing
    # or replace them with a generic role replacement if needed. 
    # User might not have "SVEHI_RW", "VEHI_RO" roles in Supabase.
    # It's safer to comment them out.
    content = re.sub(r'(GRANT\s+.*)', r'-- \1', content)

    # 6. Blob/Clob
    content = re.sub(r'BLOB', 'BYTEA', content)
    content = re.sub(r'CLOB', 'TEXT', content)

    with open(output_file, 'w', encoding='utf-8') as f_out:
        f_out.write(content)

    print("Conversion complete.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        # Default behavior for this task
        input_path = '/home/luis/Modernizaciones/.agent/bbdd/BBDD SVEHI.sql'
        output_path = '/home/luis/Modernizaciones/.agent/bbdd/BBDD_SVEHI_PG.sql'
    else:
        input_path = sys.argv[1]
        output_path = sys.argv[2]
        
    convert_oracle_to_postgres(input_path, output_path)

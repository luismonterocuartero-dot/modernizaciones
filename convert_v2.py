import re
import sys

def convert(input_file, output_file):
    print(f"Converting {input_file} to {output_file}...")
    
    with open(input_file, 'r', encoding='ISO-8859-1', errors='ignore') as f_in:
        content = f_in.read()

    # Split into statements approximately (by semicolon at end of line?)
    # Or just process line by line.
    
    lines = content.splitlines()
    clean_lines = []
    
    # Garbage removal
    skip_prefixes = [
        'PCTFREE', 'PCTUSED', 'INITRANS', 'MAXTRANS', 'NOCOMPRESS', 'LOGGING', 
        'STORAGE', 'TABLESPACE', 'BUFFER_POOL', 'PCTINCREASE', 'FREELISTS', 
        'FREELIST GROUPS', 'SEGMENT CREATION', 'CONNECT TO', 'USING \'',
        'GRANT ', '--', 'REM ', 'SET DEFINE'
    ]

    for line in lines:
        stripped = line.strip()
        if not stripped:
            clean_lines.append('')
            continue
            
        if any(stripped.startswith(p) for p in skip_prefixes):
            # Check for trailing semicolon on previous line logic? 
            # Or if this garbage line ENDS command.
            if stripped.endswith(';'):
                # Ensure previous valid line has semicolon?
                pass
            continue
            
        if stripped.startswith('----------------'):
            continue

        clean_line = line
        
        # Remove "SVEHI". prefix (quoted or unquoted, case insensitive)
        clean_line = re.sub(r'(?i)"?SVEHI"?\.', '', clean_line)
        
        # Remove all double quotes to force lowercase in Postgres
        clean_line = clean_line.replace('"', '')
        
        # Type mappings
        clean_line = re.sub(r'NUMBER\(10,0\)', 'BIGINT', clean_line)
        clean_line = re.sub(r'NUMBER\(1,0\)', 'SMALLINT', clean_line)
        clean_line = re.sub(r'NUMBER\((\d+),(\d+)\)', r'NUMERIC(\1,\2)', clean_line)
        clean_line = re.sub(r'NUMBER', 'NUMERIC', clean_line)
        
        clean_line = re.sub(r'VARCHAR2', 'VARCHAR', clean_line)
        clean_line = re.sub(r'VARCHAR\((\d+) BYTE\)', r'VARCHAR(\1)', clean_line)
        
        clean_line = re.sub(r' NOCYCLE', '', clean_line)
        clean_line = re.sub(r' NOORDER', '', clean_line)
        clean_line = re.sub(r' NOKEEP', '', clean_line)
        clean_line = re.sub(r' NOSCALE', '', clean_line)
        clean_line = re.sub(r' GLOBAL ', ' ', clean_line)
        
        # clean_line = re.sub(r'\sDATE', ' TIMESTAMP', clean_line) # Keep DATE for compatibility
        clean_line = re.sub(r'SYSDATE', 'CURRENT_TIMESTAMP', clean_line)
        
        clean_line = re.sub(r'BLOB', 'BYTEA', clean_line)
        clean_line = re.sub(r'CLOB', 'TEXT', clean_line)
        
        # Constraints
        clean_line = clean_line.replace(' ENABLE', '')
        
        # Clean up segments
        clean_line = re.sub(r'\)\s*SEGMENT CREATION.*', ');', clean_line)
        
        clean_lines.append(clean_line)

    final_sql = '\n'.join(clean_lines)
    
    # Fix double semicolons
    final_sql = final_sql.replace(';;', ';')
    
    with open(output_file, 'w', encoding='utf-8') as f_out:
        f_out.write(final_sql)

if __name__ == "__main__":
    convert('/home/luis/Modernizaciones/.agent/bbdd/BBDD SVEHI.sql', '/home/luis/Modernizaciones/svehi_full.sql')

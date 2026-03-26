import json
import os
import re

def unescape_sk_json():
    file_path = r'c:\Brains WEB\src\locales\sk.json'
    
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The issue is that sequences like \\u010c are stored as literal backslash + u + 010c.
    # We want to convert them to actual Unicode characters or at least single-escaped \u010c.
    
    # We can use json.loads to unescape it if we treat the whole thing as a JSON string, 
    # but that's risky. Better to use a targeted regex replacement for double-escaped unicode.
    
    # Pattern to find \\u followed by 4 hex digits
    pattern = re.compile(r'\\\\u([0-9a-fA-F]{4})')
    
    def replace_unicode(match):
        # Convert hex code to actual character
        return chr(int(match.group(1), 16))

    new_content = pattern.sub(replace_unicode, content)
    
    # Also handle literal \\" if any
    new_content = new_content.replace('\\\\"', '\\"')

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Successfully fixed encoding in {file_path}")

if __name__ == "__main__":
    unescape_sk_json()

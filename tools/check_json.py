import json
import sys

try:
    with open('github_sk.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("VALID")
except Exception as e:
    print(f"INVALID: {e}")

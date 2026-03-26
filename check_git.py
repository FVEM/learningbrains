import subprocess
import os

def run_command(cmd):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return f"COMMAND: {cmd}\nSTDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}\nEXIT CODE: {result.returncode}\n"
    except Exception as e:
        return f"COMMAND: {cmd}\nEXCEPTION: {str(e)}\n"

output_file = "git_diagnostic.log"
commands = [
    "git remote -v",
    "git status",
    "git branch -a",
    "git log -n 5",
    "git fetch origin main",
    "git status",
    "npm run build"
]

with open(output_file, "w", encoding="utf-8") as f:
    f.write("Git Diagnostic Log\n")
    f.write("==================\n\n")
    for cmd in commands:
        f.write(run_command(cmd))
        f.write("-" * 40 + "\n")

print(f"Diagnostic completed. See {output_file}")

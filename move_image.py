import os
import shutil

src = r"c:\Brains WEB\public\News\BilbaoKickoff.jpg"
dst = r"c:\Brains WEB\public\images\news\bilbaokickoff.jpg"

if os.path.exists(src):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.move(src, dst)
    print("Moved successfully")
else:
    print("Source not found")

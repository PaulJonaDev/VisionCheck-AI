import os
from PIL import Image

def run(src_dir, dst_dir, size=(224, 224)):
    os.makedirs(dst_dir, exist_ok=True)
    for root, _, files in os.walk(src_dir):
        for f in files:
            p = os.path.join(root, f)
            try:
                im = Image.open(p).convert('RGB').resize(size)
                out = os.path.join(dst_dir, os.path.relpath(p, src_dir))
                os.makedirs(os.path.dirname(out), exist_ok=True)
                im.save(out)
            except Exception:
                pass
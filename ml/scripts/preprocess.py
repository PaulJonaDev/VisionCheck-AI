import os
from PIL import Image

def preprocess_dir(src, dst, size=(224, 224)):
    os.makedirs(dst, exist_ok=True)
    for root, _, files in os.walk(src):
        for f in files:
            p = os.path.join(root, f)
            try:
                im = Image.open(p).convert('RGB').resize(size)
                out = os.path.join(dst, os.path.relpath(p, src))
                os.makedirs(os.path.dirname(out), exist_ok=True)
                im.save(out)
            except Exception:
                pass
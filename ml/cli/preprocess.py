import os
import json
from PIL import Image
from pathlib import Path

CFG_PATH = Path(__file__).resolve().parents[1] / 'train' / 'config.json'
RAW_DIR = Path(__file__).resolve().parents[1] / 'data' / 'raw'
OUT_DIR = Path(__file__).resolve().parents[1] / 'data' / 'processed'

def load_cfg():
    with open(CFG_PATH, 'r') as f:
        return json.load(f)

def preprocess_one(src_path: Path, dst_path: Path, size=(224, 224)):
    try:
        img = Image.open(src_path).convert('RGB').resize(size)
        dst_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(dst_path)
        return True
    except Exception:
        return False

def run():
    cfg = load_cfg()
    size = (int(cfg.get('image_size', 224)), int(cfg.get('image_size', 224)))
    count_ok = 0
    for root, _, files in os.walk(RAW_DIR):
        for f in files:
            src = Path(root) / f
            rel = src.relative_to(RAW_DIR)
            dst = OUT_DIR / rel
            if preprocess_one(src, dst, size):
                count_ok += 1
    print(f'Preprocess finished. {count_ok} files written to {OUT_DIR}')

if __name__ == '__main__':
    run()
import json
from pathlib import Path
from datetime import datetime

CFG_PATH = Path(__file__).resolve().parents[1] / 'train' / 'config.json'
PROCESSED_DIR = Path(__file__).resolve().parents[1] / 'data' / 'processed'
MODEL_DIR = Path(__file__).resolve().parents[1] / 'models' / 'mobilenet_v1'

def load_cfg():
    with open(CFG_PATH, 'r') as f:
        return json.load(f)

def run():
    cfg = load_cfg()
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    meta_path = MODEL_DIR / 'metadata.json'
    meta = {
        'architecture': 'mobilenet_v1',
        'input_size': cfg.get('image_size', 224),
        'trained_on': str(PROCESSED_DIR),
        'classes': cfg.get('classes', []),
        'version': '0.1.0',
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    }
    with open(meta_path, 'w') as f:
        json.dump(meta, f, indent=2)
    # Crear un marcador de placeholder para el modelo
    (MODEL_DIR / 'model.h5').write_text('PLACEHOLDER_MODEL_FILE\n')
    print(f'Model metadata written to {meta_path}. Placeholder model created.')

if __name__ == '__main__':
    run()
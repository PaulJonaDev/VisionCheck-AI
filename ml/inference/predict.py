def predict(image_path, model_dir="ml/models/mobilenet_v1", metadata_file="metadata.json"):
    return {
        "enrojecimiento": 0.3,
        "opacidad": 0.2,
        "reflejo_irregular": 0.4,
        "inflamacion": 0.1,
        "fatiga": 0.5,
        "model": model_dir,
        "metadata": metadata_file,
    }
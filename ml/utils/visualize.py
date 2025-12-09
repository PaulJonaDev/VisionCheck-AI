from PIL import Image

def show(img: Image.Image):
    try:
        img.show()
    except Exception:
        pass
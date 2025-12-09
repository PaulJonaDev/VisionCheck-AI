from PIL import Image, ImageEnhance

def apply_augmentations(img: Image.Image, brightness=0.0, contrast=0.0, rotation=0, flip_horizontal=True):
    if brightness:
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(1.0 + brightness)
    if contrast:
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.0 + contrast)
    if rotation:
        img = img.rotate(rotation)
    if flip_horizontal:
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
    return img
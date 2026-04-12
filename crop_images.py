from PIL import Image
import os
import glob

def crop_and_save(file_path):
    try:
        img = Image.open(file_path)
        width, height = img.size
        # We want a nice landscape ratio, say 16:10 or 4:3. Let's do 16:10 (width : width * 10/16)
        target_width = width
        target_height = int(width * 10 / 16)
        
        if height > target_height:
            # Crop from top (many brochures have header/images at top)
            # Actually, let's crop the center-top (maybe 10% from top)
            top = int(height * 0.1)
            bottom = top + target_height
            if bottom > height:
                bottom = height
                top = height - target_height
            
            img_cropped = img.crop((0, top, target_width, bottom))
            new_path = file_path.replace('.jpg', '_cropped.jpg')
            img_cropped.save(new_path, quality=90)
            print(f"Cropped: {new_path}")
    except Exception as e:
        print(f"Error on {file_path}: {e}")

for path in glob.glob("public/assets/images/overview/*.jpg"):
    if "_cropped" not in path:
        crop_and_save(path)

for path in glob.glob("public/assets/images/workstation/*.jpg"):
    if "_cropped" not in path:
        crop_and_save(path)

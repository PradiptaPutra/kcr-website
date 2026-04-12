from PIL import Image
import os

# Custom crops to remove the green bar on the side
def crop_custom(file_path, top_offset_ratio, bottom_offset_ratio, left_offset_ratio=0.045, right_offset_ratio=0.01):
    try:
        img = Image.open(file_path)
        w, h = img.size
        
        # Calculate new horizontal bounds to remove the green bar (mostly on the left)
        left = int(w * left_offset_ratio)
        right = int(w * (1 - right_offset_ratio))
        
        # Vertical bounds based on previous vision analysis
        top = int(h * top_offset_ratio)
        bottom = int(h * bottom_offset_ratio)
        
        img_cropped = img.crop((left, top, right, bottom))
        
        # Force 16:10 aspect ratio
        cw, ch = img_cropped.size
        target_h = int(cw * 10 / 16)
        if ch > target_h:
            diff = ch - target_h
            img_cropped = img_cropped.crop((0, diff//2, cw, ch - diff//2))

        new_path = file_path.replace('.jpg', '_cropped.jpg')
        img_cropped.save(new_path, quality=95)
        print(f"Removed Border: {new_path}")
    except Exception as e:
        print(f"Error on {file_path}: {e}")

# Group 1: Overview
overview_files = [
    "BARA_02.jpg", "COSMO_BEDSERIES.jpg", "FERMI_RMT01.jpg", "FERMI_ST3.jpg",
    "FORMA_SERIES.jpg", "HOSPITALITY_OTHERS.jpg", "INCORE_SERIES.jpg",
    "INTERIOR_FITOUT.jpg", "LUNA_SERIES.jpg", "MODERNA_SERIES.jpg",
    "NOVA_SERIES.jpg", "PRIME_SERIES.jpg"
]

for f in overview_files:
    crop_custom(os.path.join("public/assets/images/overview", f), 0.08, 0.52, 0.045, 0.01)

# Group 2: Workstation
workstation_dir = "public/assets/images/workstation"
full_page = ["WORKSTATION_FORMA.jpg", "WORKSTATION_MODERNA.jpg", "EXECUTIVEDESK_PRIME_SERIES.jpg"]
for f in full_page:
    crop_custom(os.path.join(workstation_dir, f), 0.15, 0.95, 0.045, 0.01)

dual_prod = ["LAMINA_COMPACT_LAMINA_EXTENT.jpg", "PRIME_COMPACT_PRIME_EXTENT.jpg"]
for f in dual_prod:
    crop_custom(os.path.join(workstation_dir, f), 0.10, 0.48, 0.045, 0.01)

others = ["STAND_ALONE_DESK_INCORE.jpg", "STAND_ALONE_DESK_LAMINA.jpg", 
          "CUSTOMIZE_COLOR_ACESCORIES.jpg", "CUSTOMIZE_COLOR_ACESCORIES2.jpg", "CUSTOMIZE_COLOR_ACESCORIES3.jpg"]
for f in others:
    crop_custom(os.path.join(workstation_dir, f), 0.05, 0.60, 0.045, 0.01)


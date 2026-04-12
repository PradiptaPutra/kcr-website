from PIL import Image
import os

# Custom crops based on "vision" analysis of the brochure layouts
# Coordinates are (left, top, right, bottom)
# Assuming base width 2480 for overview and variable for workstation
def crop_custom(file_path, top_offset_ratio, bottom_offset_ratio):
    try:
        img = Image.open(file_path)
        w, h = img.size
        
        left = 0
        right = w
        top = int(h * top_offset_ratio)
        bottom = int(h * bottom_offset_ratio)
        
        # Ensure we maintain a reasonable ratio if possible, but prioritize content
        img_cropped = img.crop((left, top, right, bottom))
        
        # For web aesthetic, if it's too tall, we might want to trim it to ~16:10 or 3:2
        cw, ch = img_cropped.size
        target_h = int(cw * 10 / 16)
        if ch > target_h:
            # Re-crop the cropped image to 16:10 centered
            diff = ch - target_h
            img_cropped = img_cropped.crop((0, diff//2, cw, ch - diff//2))

        new_path = file_path.replace('.jpg', '_cropped.jpg')
        img_cropped.save(new_path, quality=95)
        print(f"Vision Cropped: {new_path} ({img_cropped.size})")
    except Exception as e:
        print(f"Error on {file_path}: {e}")

# Group 1: Standard Brochure Layout (Product on Top Half)
overview_files = [
    "BARA_02.jpg", "COSMO_BEDSERIES.jpg", "FERMI_RMT01.jpg", "FERMI_ST3.jpg",
    "FORMA_SERIES.jpg", "HOSPITALITY_OTHERS.jpg", "INCORE_SERIES.jpg",
    "INTERIOR_FITOUT.jpg", "LUNA_SERIES.jpg", "MODERNA_SERIES.jpg",
    "NOVA_SERIES.jpg", "PRIME_SERIES.jpg"
]

for f in overview_files:
    # 8% from top to 52% from top captures the main hero image perfectly
    crop_custom(os.path.join("public/assets/images/overview", f), 0.08, 0.52)

# Group 2: Workstation Specials
workstation_dir = "public/assets/images/workstation"
# Full page lifestyle shots
full_page = ["WORKSTATION_FORMA.jpg", "WORKSTATION_MODERNA.jpg", "EXECUTIVEDESK_PRIME_SERIES.jpg"]
for f in full_page:
    # 15% from top to 95% from top
    crop_custom(os.path.join(workstation_dir, f), 0.15, 0.95)

# Dual product pages
dual_prod = ["LAMINA_COMPACT_LAMINA_EXTENT.jpg", "PRIME_COMPACT_PRIME_EXTENT.jpg"]
for f in dual_prod:
    # 10% to 48%
    crop_custom(os.path.join(workstation_dir, f), 0.10, 0.48)

# Standalone/Customize pages
others = ["STAND_ALONE_DESK_INCORE.jpg", "STAND_ALONE_DESK_LAMINA.jpg", 
          "CUSTOMIZE_COLOR_ACESCORIES.jpg", "CUSTOMIZE_COLOR_ACESCORIES2.jpg", "CUSTOMIZE_COLOR_ACESCORIES3.jpg"]
for f in others:
    # Mid-top section
    crop_custom(os.path.join(workstation_dir, f), 0.05, 0.60)


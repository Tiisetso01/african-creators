#!/usr/bin/env python3
"""
PostNet 300 DPI Print-Ready Business Card Generator (Pixel-Perfect)
-------------------------------------------------------------------
PostNet Specifications:
  - Final Trim Size: 90mm x 50mm
  - Total Bleed Canvas: 110mm x 70mm (10mm total bleed = 5mm on each edge)
  - Target Resolution: 300 DPI (Print Standard)
  - Bleed Canvas Pixels (300 DPI): 1299 x 827 px
  - Trim Pixels (300 DPI): 1063 x 591 px
"""

import os
from PIL import Image, ImageDraw, ImageFont

def generate_postnet_cards():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    artifacts_dir = os.path.join(os.path.expanduser("~"), ".gemini/antigravity-ide/brain/078def98-f127-4ee9-8605-7a855442ca85")

    front_src = os.path.join(artifacts_dir, "raw_template_front.jpg")
    back_src = os.path.join(artifacts_dir, "raw_template_back.jpg")

    if not os.path.exists(front_src):
        front_src = os.path.join(base_dir, "public/images/media__1785592683746.jpg")
    if not os.path.exists(back_src):
        back_src = os.path.join(base_dir, "public/images/media__1785592683751.jpg")

    BLEED_W, BLEED_H = 1299, 827  # 110mm x 70mm @ 300 DPI
    TRIM_W, TRIM_H = 1063, 591    # 90mm x 50mm @ 300 DPI

    # -------------------------------------------------------------
    # 1. PROCESS BACK CARD (ERASE OLD TEXT & RE-RENDER CRISP CONTACTS)
    # -------------------------------------------------------------
    back_img = Image.open(back_src).convert("RGB")
    
    # Sample pure blank dark texture between y=290 and y=420 (x: 40 to 530)
    pure_blank_texture = back_img.crop((40, 290, 530, 420))
    
    # Create clean image canvas and erase all old contact text cleanly
    clean_back = back_img.copy()
    clean_back.paste(pure_blank_texture, (40, 430))
    clean_back.paste(pure_blank_texture, (40, 550))

    draw = ImageDraw.Draw(clean_back)

    # Crisp typography
    try:
        font_contact = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 21)
    except Exception:
        font_contact = ImageFont.load_default()

    gold_icon = (195, 150, 90)
    gold_text = (225, 212, 185)

    def draw_phone_icon(d, x, y):
        d.rectangle([x+2, y+2, x+16, y+16], outline=gold_icon, width=2)
        d.ellipse([x+6, y+6, x+12, y+12], outline=gold_icon, width=1)

    def draw_email_icon(d, x, y):
        d.rectangle([x, y+2, x+18, y+14], outline=gold_icon, width=2)
        d.line([x, y+2, x+9, y+9], fill=gold_icon, width=2)
        d.line([x+18, y+2, x+9, y+9], fill=gold_icon, width=2)

    def draw_globe_icon(d, x, y):
        d.ellipse([x, y, x+16, y+16], outline=gold_icon, width=2)
        d.line([x, y+8, x+16, y+8], fill=gold_icon, width=1)
        d.line([x+8, y, x+8, y+16], fill=gold_icon, width=1)

    def draw_pin_icon(d, x, y):
        d.ellipse([x+3, y, x+13, y+10], outline=gold_icon, width=2)
        d.line([x+8, y+10, x+8, y+16], fill=gold_icon, width=2)

    contacts = [
        (draw_phone_icon, "+27 76 354 0378"),
        (draw_email_icon, "tiisetso@africancreators.co.za"),
        (draw_globe_icon, "africancreators.co.za"),
        (draw_pin_icon, "Cape Town, South Africa"),
    ]

    start_x = 65
    start_y = 445
    spacing = 38

    for i, (icon_fn, text) in enumerate(contacts):
        cy = start_y + i * spacing
        icon_fn(draw, start_x, cy + 2)
        draw.text((start_x + 36, cy), text, fill=gold_text, font=font_contact)

    # -------------------------------------------------------------
    # 2. RESIZE TO POSTNET 300 DPI SPECS (LANCZOS HIGH QUALITY)
    # -------------------------------------------------------------
    front_img = Image.open(front_src).convert("RGB")

    # A) 300 DPI Bleed Files (1299 x 827 px = 110mm x 70mm with 10mm total bleed)
    front_300_bleed = front_img.resize((BLEED_W, BLEED_H), Image.Resampling.LANCZOS)
    back_300_bleed = clean_back.resize((BLEED_W, BLEED_H), Image.Resampling.LANCZOS)

    # B) 300 DPI Trim Files (1063 x 591 px = 90mm x 50mm exact cut)
    front_300_trim = front_img.resize((TRIM_W, TRIM_H), Image.Resampling.LANCZOS)
    back_300_trim = clean_back.resize((TRIM_W, TRIM_H), Image.Resampling.LANCZOS)

    out_dir = os.path.join(base_dir, "public/images")
    os.makedirs(out_dir, exist_ok=True)

    # Save high-res print files with DPI headers
    front_300_bleed.save(os.path.join(out_dir, "postnet_business_card_front_300dpi_bleed.png"), dpi=(300, 300))
    back_300_bleed.save(os.path.join(out_dir, "postnet_business_card_back_300dpi_bleed.png"), dpi=(300, 300))

    front_300_trim.save(os.path.join(out_dir, "postnet_business_card_front_300dpi_trim.png"), dpi=(300, 300))
    back_300_trim.save(os.path.join(out_dir, "postnet_business_card_back_300dpi_trim.png"), dpi=(300, 300))

    # Save web UI display versions
    front_img.save(os.path.join(out_dir, "business-card-front.png"))
    clean_back.save(os.path.join(out_dir, "business-card-back.png"))

    # Copy print files to artifacts for easy downloading/reviewing
    front_300_bleed.save(os.path.join(artifacts_dir, "postnet_front_300dpi_110x70mm_bleed.png"), dpi=(300, 300))
    back_300_bleed.save(os.path.join(artifacts_dir, "postnet_back_300dpi_110x70mm_bleed.png"), dpi=(300, 300))
    front_300_trim.save(os.path.join(artifacts_dir, "postnet_front_300dpi_90x50mm_trim.png"), dpi=(300, 300))
    back_300_trim.save(os.path.join(artifacts_dir, "postnet_back_300dpi_90x50mm_trim.png"), dpi=(300, 300))

    print("✅ Successfully generated PostNet 300 DPI business cards!")

if __name__ == "__main__":
    generate_postnet_cards()

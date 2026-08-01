#!/usr/bin/env python3
"""
Deterministic Business Card Generator for African Creators
-----------------------------------------------------------
Usage:
  python3 scripts/generate_business_card.py \
    --email "tiisetso@africancreators.co.za" \
    --website "africancreators.co.za" \
    --phone "+27 76 354 0378" \
    --location "Cape Town, South Africa"
"""

import os
import argparse
from PIL import Image, ImageDraw, ImageFont

def generate_card(name, title, phone, email, website, location, output_path):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    template_path = os.path.join(base_dir, "public", "images", "business-card-back-template.jpg")
    
    if not os.path.exists(template_path):
        template_path = os.path.join(base_dir, "public", "images", "business-card-back.png")

    img = Image.open(template_path).convert("RGB")

    # Clone clean dark texture over the contact area
    bg_patch = img.crop((60, 280, 500, 460))
    img.paste(bg_patch, (60, 440))

    draw = ImageDraw.Draw(img)

    try:
        font_sans = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 21)
    except Exception:
        font_sans = ImageFont.load_default()

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

    items = [
        (draw_phone_icon, phone),
        (draw_email_icon, email),
        (draw_globe_icon, website),
        (draw_pin_icon, location),
    ]

    start_y = 445
    spacing = 38

    for i, (draw_fn, text) in enumerate(items):
        cy = start_y + i * spacing
        draw_fn(draw, 66, cy + 2)
        draw.text((106, cy), text, fill=gold_text, font=font_sans)

    img.save(output_path)
    print(f"✅ Generated deterministic card image at: {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate deterministic business card image.")
    parser.add_argument("--name", default="Tiisetso Mmaboko")
    parser.add_argument("--title", default="Founder & Digital Solutions Consultant")
    parser.add_argument("--phone", default="+27 76 354 0378")
    parser.add_argument("--email", default="tiisetso@africancreators.co.za")
    parser.add_argument("--website", default="africancreators.co.za")
    parser.add_argument("--location", default="Cape Town, South Africa")
    parser.add_argument("--output", default="public/images/business-card-back.png")

    args = parser.parse_args()
    generate_card(args.name, args.title, args.phone, args.email, args.website, args.location, args.output)

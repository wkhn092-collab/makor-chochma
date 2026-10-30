"""Temporary Pitum HaKetoret product still until the institute photo arrives."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "product-pitum-v1.jpg"
NYPL_BAD = ROOT / "public" / "images" / "product-pitum-nypl.jpg"

W, H = 900, 1100


def pick_font(size: int) -> ImageFont.ImageFont:
    for name in ("frank.ttf", "arial.ttf", "segoeui.ttf", "times.ttf"):
        path = Path(r"C:\Windows\Fonts") / name
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def main() -> None:
    im = Image.new("RGB", (W, H), (245, 236, 214))
    d = ImageDraw.Draw(im)

    for i in range(40):
        a = int(18 * (1 - i / 40))
        d.rectangle([i, i, W - 1 - i, H - 1 - i], outline=(210 + a, 190 + a, 150 + a))

    d.rounded_rectangle([70, 90, W - 70, H - 90], radius=18, outline=(168, 138, 72), width=3)
    d.rounded_rectangle([86, 106, W - 86, H - 106], radius=12, outline=(201, 169, 98), width=1)

    title = pick_font(64)
    body = pick_font(28)
    small = pick_font(22)

    y = 180
    for text, font, fill in (
        ("פיטום הקטורת", title, (90, 70, 40)),
        ("כתוב על קלף · להמחשה", small, (120, 100, 70)),
    ):
        bbox = d.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        d.text(((W - tw) / 2, y), text, font=font, fill=fill)
        y += (bbox[3] - bbox[1]) + 18

    d.line([(200, y + 10), (W - 200, y + 10)], fill=(168, 138, 72), width=2)
    y += 40

    for t in (
        "הַצֳרִי וְהַצִּפֹּרֶן הַחֶלְבְּנָה וְהַלְּבוֹנָה",
        "מוֹר וּקְצִיעָה שִׁבֹּלֶת נֵרְדְּ וְכַרְכֹּם",
        "קֹשְׁט וּקִלּוּפָה קִנָּמוֹן בֹּשֶׂם",
        "מֶלַח סְדוֹמִית וּמַעֲלֶה עָשָׁן",
    ):
        bbox = d.textbbox((0, 0), t, font=body)
        tw = bbox[2] - bbox[0]
        d.text(((W - tw) / 2, y), t, font=body, fill=(55, 45, 30))
        y += (bbox[3] - bbox[1]) + 22

    note = "צילום להמחשה · עד שתגיע תמונת המכון"
    bbox = d.textbbox((0, 0), note, font=small)
    tw = bbox[2] - bbox[0]
    d.text(((W - tw) / 2, H - 160), note, font=small, fill=(140, 120, 80))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    im.save(OUT, quality=92)
    print(f"wrote {OUT} {im.size}")

    if NYPL_BAD.exists():
        NYPL_BAD.unlink()
        print("removed bad nypl file")


if __name__ == "__main__":
    main()

#!/usr/bin/env bash
#
# optimize-photos.sh: prepare photos in src/assets/photos for the web. Run with: pnpm photos
#
# For every image (jpg, jpeg, png, webp, any letter case; names with spaces are fine):
#   - longest side over 1600px  -> shrink it to fit 1600x1600
#   - EXIF metadata present     -> rotate it upright, then strip the metadata
#                                  (phone photos can carry GPS location)
# A photo is only rewritten when it needs one of these, so running the script again never makes
# already-processed photos lose quality from repeated JPEG re-encoding.
# Prints one line per optimized photo with its old size and new size.
#
# Requires ImageMagick 7 (`magick`).
set -euo pipefail

MAX=1600
cd "$(dirname "$0")/../src/assets/photos"

find . -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0 |
  while IFS= read -r -d '' f; do
    longest=$(magick identify -format '%[fx:max(w,h)]' "$f[0]")
    exif=$(magick identify -format '%[EXIF:*]' "$f[0]" 2>/dev/null || true)

    if [ "$longest" -gt "$MAX" ] || [ -n "$exif" ]; then
      before=$(du -h "$f" | cut -f1)
      magick mogrify -auto-orient -strip -resize "${MAX}x${MAX}>" -quality 82 "$f"
      echo "optimized ${f#./}  (${longest}px, ${before} -> $(du -h "$f" | cut -f1))"
    fi
  done

echo "done"

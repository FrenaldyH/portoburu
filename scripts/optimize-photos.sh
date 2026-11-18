#!/usr/bin/env bash
# Prepare photos in src/assets/photos for the web. Run with: pnpm photos
# Safe to run any time: a photo is only rewritten when it actually needs it,
# so already-processed photos never lose quality from repeated JPEG re-encoding.
#   - longest side > 1600px  -> shrink to fit 1600x1600
#   - has EXIF metadata      -> rotate upright, then strip it (phone photos can carry GPS location)
# Requires ImageMagick 7 (`magick`).
set -euo pipefail

MAX=1600
cd "$(dirname "$0")/../src/assets/photos"

# Visit every image file (any extension case), null-separated so spaces in names are safe.
find . -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) -print0 |
  while IFS= read -r -d '' f; do
    longest=$(magick identify -format '%[fx:max(w,h)]' "$f[0]")
    exif=$(magick identify -format '%[EXIF:*]' "$f[0]" 2>/dev/null || true)

    # Only rewrite photos that are too large or still carry metadata.
    if [ "$longest" -gt "$MAX" ] || [ -n "$exif" ]; then
      before=$(du -h "$f" | cut -f1)
      magick mogrify -auto-orient -strip -resize "${MAX}x${MAX}>" -quality 82 "$f"
      echo "optimized ${f#./}  (${longest}px, ${before} -> $(du -h "$f" | cut -f1))"
    fi
  done

echo "done"

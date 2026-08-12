#!/bin/sh
set -eu

media_dir=/app/payload/media
seed_dir=/app/payload-media-seed

mkdir -p "$media_dir"

# A named volume hides files baked into its mount point. Seed files therefore
# live elsewhere in the image and are copied only when a filename is missing.
if [ -d "$seed_dir" ]; then
  cp -an "$seed_dir"/. "$media_dir"/
fi

exec "$@"

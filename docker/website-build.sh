#!/bin/sh
set -eu

: "${PAYLOAD_API_URL:?PAYLOAD_API_URL is required}"
: "${PUBLIC_SITE_URL:?PUBLIC_SITE_URL is required}"

case "$PAYLOAD_API_URL" in
  http://*|https://*) ;;
  *) echo "PAYLOAD_API_URL must be an http(s) URL" >&2; exit 1 ;;
esac

case "$PUBLIC_SITE_URL" in
  http://*|https://*) ;;
  *) echo "PUBLIC_SITE_URL must be an http(s) URL" >&2; exit 1 ;;
esac

attempt=1
until node -e "fetch('${PAYLOAD_API_URL}/pages?limit=1&depth=0').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"; do
  if [ "$attempt" -ge 30 ]; then
    echo "Payload API did not become ready after 60 seconds" >&2
    exit 1
  fi

  echo "Waiting for Payload API ($attempt/30)..."
  attempt=$((attempt + 1))
  sleep 2
done

cd /app/website
pnpm build

release_name="release-$(date +%Y%m%d%H%M%S)-$$"
release_dir="/output/releases/$release_name"
old_release="$(readlink /output/current 2>/dev/null || true)"

mkdir -p "$release_dir"
cp -a dist/. "$release_dir"/
ln -s "releases/$release_name" /output/current.new
mv -Tf /output/current.new /output/current

case "$old_release" in
  releases/release-*) rm -rf "/output/$old_release" ;;
esac

echo "Static website published as $release_name"

# xCloud deployment

The production Compose stack has three long-lived concerns, but only two
long-lived application containers:

- `payload` runs Payload CMS on private port 3000 and joins the external
  PostgreSQL network;
- `website-build` is a one-shot Astro builder. It waits for Payload, fetches
  CMS content over private HTTP, writes static `dist` files, and exits. It uses
  the `build` profile, so xCloud's automatic initial `compose up` does not run
  it before database migrations;
- `router` serves the static Astro files and proxies `/admin`, `/api`, and
  `/_next` to Payload on private port 3000.

Only `router` publishes host port 8081 by default and maps it to Nginx port
8080 inside the container. Configure the xCloud domain for the `router` service
and select published/Primary port `8081`.

## Environment

Create the xCloud environment from `.env.example`. Do not commit `.env`.

- `PUBLIC_SITE_URL`: the one public HTTPS origin, without a path;
- `DATABASE_URL`: PostgreSQL URL whose hostname resolves on
  `POSTGRES_NETWORK`;
- `PAYLOAD_SECRET`: a long, stable random value;
- `POSTGRES_NETWORK`: existing external Docker network, normally
  `phobos-internal`;
- `APP_PORT`: host port published by Nginx, normally `8081`;
- `PAYLOAD_MEDIA_VOLUME`: stable volume name, normally
  `sawicka-payload-media`;
- `DEPLOY_HOOK_URL`: optional xCloud Git redeploy webhook.

`PAYLOAD_API_URL` is intentionally not an xCloud variable. Compose gives the
one-shot Astro builder the private address `http://payload:3000/api`. Public
media URLs are generated from `PUBLIC_SITE_URL`, so the private container name
is never baked into HTML.

## First deployment: schema and initial content

For a new, empty database use this script once. It runs the committed migration,
loads the full content from `payload/src/seed/seed.ts`, and only then starts
Payload and the static Astro build:

```sh
docker compose --env-file .env pull
docker compose --env-file .env down
docker compose --env-file .env build --pull payload website-build
docker compose --env-file .env run --rm --no-deps payload pnpm payload migrate
docker compose --env-file .env run --rm --no-deps -e DEPLOY_HOOK_URL= payload pnpm seed
docker compose --env-file .env up -d payload
docker compose --env-file .env run --rm --no-deps website-build
docker compose --env-file .env up -d --remove-orphans
docker compose --env-file .env ps
```

The seed container uses Payload Local API, connects directly to PostgreSQL, and
writes uploaded files to the same persistent `payload-media` volume. Clearing
`DEPLOY_HOOK_URL` for this one command prevents every seeded document from
triggering another xCloud deployment.

Deployments made before the seed working-directory fix may have media records
in PostgreSQL without files in the persistent volume. Repair those files once,
without changing database records or page content:

```sh
docker compose --env-file .env run --rm --no-deps payload pnpm repair:media
```

Do not keep the seed command in later deployments. Although the seed scripts
skip many existing records, some of them intentionally update existing menus or
page blocks and could overwrite later editorial changes.

## Regular deploy script

Use this as the xCloud deployment script after the repository has been checked
out:

```sh
docker compose --env-file .env pull
docker compose --env-file .env down
docker compose --env-file .env build --pull payload website-build
docker compose --env-file .env run --rm --no-deps payload pnpm payload migrate
docker compose --env-file .env up -d payload
docker compose --env-file .env run --rm --no-deps website-build
docker compose --env-file .env up -d --remove-orphans
docker compose --env-file .env ps
```

Migrations are deliberately separate from Payload startup. The command is safe
to keep in the deployment script: Payload records completed migrations and only
applies pending files. For the very first deployment it creates the schema from
`payload/src/migrations/20260812_122837_initial_schema.ts`. Do not run it against
an existing, unrelated database.

## Static content lifecycle

Every deployment script explicitly runs a fresh `website-build` one-shot
container after migrations and after Payload has started. It fetches current CMS
content and atomically switches Nginx to the new static release. Code changes
therefore require the normal Git push and xCloud redeploy. Payload content
changes also require a redeploy; set `DEPLOY_HOOK_URL` to an xCloud redeploy
webhook to automate that, or trigger a manual redeploy after editing content.

The Docker image build itself does not need database credentials and does not
fetch CMS content. This avoids putting secrets in image layers and avoids the
first-deployment dependency cycle.

## Media persistence

Payload uploads live in the named `payload-media` volume mounted at
`/app/payload/media`. Normal rebuilds and redeploys must keep this volume. Do not
use `docker compose down -v` in deployment scripts.

The repository currently contains no existing `payload/media` files. If legacy
files must be bundled for a one-time import, place them under
`payload/media-seed/`; the entrypoint copies only missing filenames from that
image directory into the persistent volume. Regular admin uploads must never be
committed there.

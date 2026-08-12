ARG NODE_VERSION=22.22.0

FROM node:${NODE_VERSION}-bookworm-slim AS base

ARG PNPM_VERSION=11.20.0
ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
ENV COREPACK_HOME=/corepack

RUN mkdir -p ${COREPACK_HOME} \
  && corepack enable \
  && corepack prepare pnpm@${PNPM_VERSION} --activate \
  && chmod -R a+rX ${COREPACK_HOME}


FROM base AS payload-dependencies

WORKDIR /app/payload

COPY payload/package.json payload/pnpm-lock.yaml payload/pnpm-workspace.yaml payload/.npmrc ./
RUN pnpm install --frozen-lockfile


FROM payload-dependencies AS payload-builder

COPY payload/ ./

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# Keep optional, image-bundled media outside /app/payload/media. The latter is
# hidden by the persistent Docker volume at runtime.
RUN mkdir -p /app/payload/media /app/payload-media-seed \
  && if [ -d /app/payload/media-seed ]; then cp -a /app/payload/media-seed/. /app/payload-media-seed/; fi


FROM base AS payload-runtime

WORKDIR /app/payload

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=payload-builder --chown=node:node /app/payload/package.json ./package.json
COPY --from=payload-builder --chown=node:node /app/payload/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=payload-builder --chown=node:node /app/payload/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=payload-builder --chown=node:node /app/payload/.npmrc ./.npmrc
COPY --from=payload-builder --chown=node:node /app/payload/node_modules ./node_modules
COPY --from=payload-builder --chown=node:node /app/payload/.next ./.next
COPY --from=payload-builder --chown=node:node /app/payload/src ./src
COPY --from=payload-builder --chown=node:node /app/payload/next.config.ts ./next.config.ts
COPY --from=payload-builder --chown=node:node /app/payload/tsconfig.json ./tsconfig.json
COPY --from=payload-builder --chown=node:node /app/payload-media-seed /app/payload-media-seed
COPY --chown=node:node docker/payload-entrypoint.sh /usr/local/bin/payload-entrypoint

RUN mkdir -p /app/payload/media \
  && chown node:node /app/payload \
  && chown -R node:node /app/payload/media /app/payload-media-seed \
  && chmod 0755 /usr/local/bin/payload-entrypoint

USER node

EXPOSE 3000

ENTRYPOINT ["payload-entrypoint"]
CMD ["pnpm", "start", "--hostname", "0.0.0.0", "--port", "3000"]


FROM base AS website-dependencies

WORKDIR /app/website

COPY website/package.json website/pnpm-lock.yaml website/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile


FROM website-dependencies AS website-builder

WORKDIR /app/website

COPY website/ ./
COPY payload/src/payload-types.ts /app/payload/src/payload-types.ts
COPY docker/website-build.sh /usr/local/bin/build-static-site

RUN chmod 0755 /usr/local/bin/build-static-site \
  && mkdir -p /output \
  && chown -R node:node /app /output

ENV NODE_ENV=production

USER node

ENTRYPOINT ["build-static-site"]

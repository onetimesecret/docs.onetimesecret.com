# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.4.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Nuxt"

# Nuxt app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install pnpm
ARG PNPM_VERSION=9.6.0
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY --link . .

# Build application with build secret
#
#   $ echo -n $NUXT_UI_PRO_LICENSE > .mysecret.txt
#   $ docker build --secret id=NUXT_UI_PRO_LICENSE,src=.mysecret.txt .
#
#RUN --mount=type=secret,id=NUXT_UI_PRO_LICENSE \
#    NUXT_UI_PRO_LICENSE="$(cat /run/secrets/NUXT_UI_PRO_LICENSE)" \
#    && pnpm run build
ENV NUXT_UI_PRO_LICENSE=CHANGEME
RUN pnpm run build

# Remove development dependencies
# The `pnpm prune prod` command is regularly failing with
# "Error: Cannot find module '@nuxt/eslint'": Add the offending package to regular dependencies.
#
# Alternate approach to manually delete and reinstall:
#   -- https://github.com/pnpm/pnpm/issues/2160#issuecomment-1553095654
#RUN rm -rf node_modules
#RUN pnpm install --prod
#
# Or simply comment out and leave the dev deps installed.
RUN pnpm prune prod

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
ENV HOST=0
CMD [ "node", ".output/server/index.mjs" ]

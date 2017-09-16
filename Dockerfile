FROM node:8-alpine
# Tags
LABEL maintainer "Nomsy <me@nomsy.net>"

# Set working directory
WORKDIR /usr/src/ankh

# Copy important stuff.
COPY package.json package-lock.json settings.json ./

# Install dependencies
RUN apk add --update \
    && apk add --no-cache cairo pango giflib ca-certificates \
    && apk add --no-cache --virtual .deps build-tools pixman-dev \
    cairo-dev pangomm-dev libjpeg-turbo-dev giflib-dev \
    && npm i \
    && npm i gulp typescript -g \
    && apk del .deps

# Copy and build
COPY . .
RUN gulp build

# Run
CMD [ "node", "--harmony", "dist/ankh.js" ]
FROM mhart/alpine-node:latest
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
    && npm i gulp typescript -g \
    && npm i \
    && apk del .deps

# Copy, build, and run
COPY . .
RUN gulp build
CMD [ "node", "dist/ankh.js" ]
FROM mhart/alpine-node:latest

# Tags
LABEL maintainer "Nomsy <me@nomsy.net>"

# Set working directory
WORKDIR /usr/src/ankh

# Copy important stuff.
COPY package.json package-lock.json ./


# Install dependencies
RUN apk add --update \
    && apk add --no-cache curl \
  	&& apk add --no-cache --virtual .deps git build-base g++ \
  	&& apk add --no-cache --virtual .npm-deps pango pangomm-dev pangomm cairo-dev libjpeg-turbo-dev pango pixman \
    && npm i gulp typescript -g \
    && npm i \
    && apk del .deps

# Set environment variables for configuration
ENV TOKEN= \
    COMMAND_PREFIX= \
    OWNERS= \
    PGSQL_DB= \
    REDIS=

# Copy, build, and run
COPY . .

RUN gulp build

CMD [ "npm", "start" ]
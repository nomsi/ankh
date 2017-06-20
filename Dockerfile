FROM node:8-alpine

LABEL maintainer "Nomsy <me@nomsy.net>"

WORKDIR /usr/src/ankh
COPY package.json yarn.lock ./

RUN apk add --update \
    && apk add --no-cache cairo pango giflib ca-certificates \
    && apk add --no-cache --virtual .deps build-tools pixman-dev \
    cairo-dev pangomm-dev libjpeg-turbo-dev giflib-dev \
    && yarn i \
    && yarn i gulp typescript -g \
    && apk del .deps

COPY . .

ENV TOKEN= \
    PREFIX= \
    OWNER= \
    WEATHER_API_KEY= \
    GOOGLE_API= \
    DATABASE_URI=

RUN gulp build

CMD [ "node", "--harmony", "dist/ankh.js" ]
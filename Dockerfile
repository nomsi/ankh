FROM node:8-alpine

LABEL maintainer "Nomsy <me@nomsy.net>"

WORKDIR /usr/src/ankh
COPY package.json settings.json ./

RUN apk add --update \
    && apk add --no-cache cairo pango giflib ca-certificates \
    && apk add --no-cache --virtual .deps build-tools pixman-dev \
    cairo-dev pangomm-dev libjpeg-turbo-dev giflib-dev \
    && yarn i \
    && yarn i gulp typescript -g \
    && apk del .deps

COPY . .

RUN gulp build

CMD [ "node", "--harmony", "dist/ankh.js" ]
FROM node:16-alpine

#
# Requirements for the Node Canvas Image
#
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev imagemagick
RUN npm i -g node-gyp

# Fonts (for Backend Meme Generation)
RUN apk add msttcorefonts-installer
RUN update-ms-fonts
RUN fc-cache -f

WORKDIR /app

COPY . ./
RUN npm install

CMD [ "npm", "start" ]

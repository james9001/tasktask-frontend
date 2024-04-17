# Node Modules
FROM node:18 as nodemodules

WORKDIR /temp

COPY package*.json /temp/

RUN npm ci


# Lint
FROM node:18 as lint

RUN apt-get update
RUN apt-get install -y \
    python3-pip \
    git

#the --break-system-packages argument is unfortunate; hopefully a temporary workaround
RUN pip3 install pre-commit --break-system-packages
RUN pip3 install xmlformatter --break-system-packages

WORKDIR /app

COPY . /app

COPY --from=nodemodules /temp/node_modules/ /app/node_modules

RUN pre-commit run --all-files


# Build
FROM node:18 as build

WORKDIR /app

COPY . /app

COPY --from=nodemodules /temp/node_modules/ /app/node_modules

RUN npm install -g ionic

RUN ionic build --configuration production


# Runtime
FROM nginx:1.20.1 as runtime

WORKDIR /etc/nginx

COPY --from=build /app/www/ /usr/share/nginx/html

COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

#dummy copy to ensure lint phase happens
COPY --from=lint /app/README.md /README.md

EXPOSE 80

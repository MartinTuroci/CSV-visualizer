# Clean OS distribution as base image
FROM ubuntu:latest

USER root
WORKDIR /usr/src/app

# Install necessary packages
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    python3

# Install dependencies
COPY package*.json ./
RUN npm i

COPY . .

RUN npm run test:unit --ci
RUN npm run build

EXPOSE 8000
WORKDIR /usr/src/app/dist
CMD [ "python3", "-m", "http.server", "8000" ]
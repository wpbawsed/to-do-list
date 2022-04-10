FROM node:14.15.0-alpine

RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app

# Open Port
EXPOSE 9090

# Set Env
ARG TAG_VERSION=latest
ENV VERSION=$TAG_VERSION

# Start Backend Server
CMD npm run start

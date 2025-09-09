FROM ubuntu:latest
LABEL authors="yusse"

FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000


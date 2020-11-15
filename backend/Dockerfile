FROM node:slim

WORKDIR /app
# RUN npm install -g nodemon

COPY package*.json ./

RUN apt-get update
RUN npm ci \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

COPY . .

ENV PORT 3001

EXPOSE 3001

CMD ["yarn", "start"]
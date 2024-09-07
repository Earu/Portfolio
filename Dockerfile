FROM node:20

WORKDIR /app
EXPOSE 8080

COPY ./project/dist ./dist
COPY ./project/package.json ./package.json

RUN npm install
RUN npx cross-env NODE_ENV production
ENTRYPOINT ["node", "./dist/server"]
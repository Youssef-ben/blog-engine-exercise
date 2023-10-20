FROM node:18-alpine as app
WORKDIR /app

EXPOSE 3000

RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

COPY ./src/frontend/web/package.json ./src/frontend/web/yarn.lock ./

# Install dependencies
RUN yarn --production
RUN yarn add vite @vitejs/plugin-react

COPY ./src/frontend/web ./

## Update the .env file to point to the docker container is not already done.
RUN rm -rf .env
RUN touch .env
RUN echo "VITE_BASE_URL=http://host.docker.internal:5000/api" > .env

CMD ["yarn", "dev"]
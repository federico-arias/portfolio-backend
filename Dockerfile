FROM node:fermium-alpine
WORKDIR /app
COPY package.json yarn.lock tsconfig.json .
RUN yarn
COPY src ./src
RUN yarn build
CMD [ "yarn", "start" ]
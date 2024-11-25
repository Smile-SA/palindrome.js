FROM node:bullseye-slim
RUN apt-get update && apt-get install -y procps
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 9000
CMD ["yarn", "run", "start"]
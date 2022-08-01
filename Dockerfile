FROM node:alpine
RUN yarn add global parcel-bundler
WORKDIR /app/palindromeJS
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 1234
CMD ["yarn", "run", "dev"]
# Build dev stage
FROM node:20 AS build-dev-stage
WORKDIR /app
RUN yarn add global parcel-bundler
COPY package.json .
RUN yarn install --ignore-scripts
COPY . .
RUN yarn build:local

# Build storybook stage
FROM node:20 AS build-storybook-stage
WORKDIR /app
COPY package.json .
RUN yarn install --ignore-scripts
COPY . .
RUN yarn build-storybook


# Production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-dev-stage /app/dist /usr/share/nginx/html
COPY --from=build-storybook-stage /app/storybook-static /usr/share/nginx/html/storybook
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 1234
CMD ["nginx", "-g", "daemon off;"]

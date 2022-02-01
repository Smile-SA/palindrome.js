FROM cypress/base:10
WORKDIR /usr/src/app
COPY ./cypress  ./cypress
COPY ./cypress.json ./cypress.json
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn --ignore-engines add cypress --save-dev
CMD ["yarn", "cypress open"]
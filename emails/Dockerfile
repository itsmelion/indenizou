FROM node:alpine

RUN echo '🐳 => Building Indenizou EMAILS...'

# Create app directory
WORKDIR /usr/src/app

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /usr/src/app

EXPOSE 1801

CMD [ "npm", "start" ]
RUN echo '🐳 => Indenizou EMAILS container built! ✅'

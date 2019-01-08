FROM node:alpine

RUN echo '🐳 => Building Indenizou API...'
# Create app directory
WORKDIR /home/api

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY . .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 1800

CMD [ "npm", "start" ]
RUN echo '🐳 => Indenizou API container built! ✅'

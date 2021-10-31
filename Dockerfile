FROM node:lts-alpine3.14

WORKDIR /usr/src/app/exercise-tracker

VOLUME test

RUN apk update

RUN apk upgrade

RUN apk --no-cache add curl

RUN apk --no-cache add git

RUN git clone https://github.com/diveshkamble/fcc-exercise-tracker.git

WORKDIR /usr/src/app/exercise-tracker/fcc-exercise-tracker

RUN npm install

COPY .env /usr/src/app/exercise-tracker/fcc-exercise-tracker

EXPOSE 3000

CMD [ "node", "server.js" ]
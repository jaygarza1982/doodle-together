FROM node:14-alpine

ENV TZ=America/Detroit
RUN apk add tzdata

WORKDIR /app

#Copy and install node dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

#Copy code
COPY . .

CMD [ "npm", "start" ]
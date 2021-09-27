FROM node:14-alpine

ENV TZ=America/Detroit
RUN apk add tzdata

WORKDIR /app

#Copy and install node dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install nodemon -g

#Copy code
COPY . .

#Export port and run our start command
EXPOSE 3000
CMD [ "npm", "start" ]
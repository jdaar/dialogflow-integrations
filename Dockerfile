FROM node:17
WORKDIR /usr/src/app
ENV INTEGRATION=twilio
COPY ${INTEGRATION}/package*.json ./
RUN npm install --only=production
COPY . .
WORKDIR ${INTEGRATION}
CMD [ "npm", "start" ]

FROM node:14

WORKDIR /workspace

RUN npm install
EXPOSE 3000
#CMD [ "node", "server.js" ]
CMD npm start
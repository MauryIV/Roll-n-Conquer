FROM node:20.11.1

COPY ./package.json /app/package.json
COPY . /app/
RUN cd /app && npm install

WORKDIR /app
CMD ["npm", "run", "start"]
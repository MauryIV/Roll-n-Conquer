const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
    db
  }));

  const expressServer = app.listen(PORT, () => {
    console.log(`ExpressServer listening on port ${PORT}`)
    console.log(`GraphQL at http://localhost:${PORT}/graphql`);
  })
  
  const io = new Server(expressServer, { 
    cors: {
      origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000", "10.0.0.199:3000"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('message', (data) => {
      console.log('Message received: ', data);
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // listen for activity ie. typing
    // socket.on('activity', (name) => {
    //   socket.broadcast.emit('activity', name)
    // });
  });
};

startApolloServer();

// NOVU components
// const { notifRoute } = require("./novu/router/notif.js");
// const bodyParser = require("body-parser");
// const cors = require("cors");


// NOVU notification
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use("/home", notifRoute);
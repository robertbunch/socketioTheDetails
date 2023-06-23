// Socket.io server that will service both node
// and react clients
// Req:
// - socket.io
// - @socket.io/cluster-adapter
// - @socket.io/sticky

// entrypoint for our cluster which will make workers
// and the workers will do the Socket.io handling
//See https://github.com/elad/node-cluster-socket.io

const cluster = require("cluster"); //makes it so we can use multiple threads
const http = require("http"); //if we need Express, we will implement it a different way
const { Server } = require("socket.io");
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky"); //makes it so a client can find its way back to the correct worker
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter"); //makes it so the primary node can emit to everyone

const socketMain = require('./socketMain');

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  const httpServer = http.createServer();

  // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  // Node.js < 16.0.0
//   cluster.setupMaster({
//     serialization: "advanced",
//   });
  // Node.js > 16.0.0
  cluster.setupPrimary({
    serialization: "advanced",
  });

  httpServer.listen(3000); // Internet facing!

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const io = new Server(httpServer,{
    cors: {
        origin: 'http://localhost:3001',
        credentials: true,
    }
  });

  // use the cluster adapter
  io.adapter(createAdapter()); //change from the default adapter

  // setup connection with the primary process
  setupWorker(io);

  //socketMain is OUR file where our emits and listens happen.
  //it needs the io object
  socketMain(io,process.pid);

}
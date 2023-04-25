// Socket.io server that will service both node
// and react clients
// Req:
// - socket.io
// - @socket.io/cluster-adapter
// - @socket.io/sticky

// entrypoint for our cluster which will make workers
// and the workers will do the Socket.io handling
//See https://github.com/elad/node-cluster-socket.io


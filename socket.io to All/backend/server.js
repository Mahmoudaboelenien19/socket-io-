const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
app.use( cors() );
const http = require( 'http' );
const server = http.createServer( app );
const { Server } = require( "socket.io" );
const io = new Server( server, {
    cors: {
        origin: "http://localhost:5174"
    }
} );

app.get( '/', ( req, res ) => {
    res.send( '<h1>Hello world</h1>' );
} );

io.on( "connection", ( socket ) => {

    console.log( 'a user connected with id: ' + socket.id );
    socket.on( "send_message", ( data ) => {
        console.log( data );
        //send for All
        socket.broadcast.emit( "receive_message", data );
    } );
} );
server.listen( 3001, () => {
    console.log( 'listening on *:3001' );
} );
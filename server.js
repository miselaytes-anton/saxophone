var net = require('net'),
    _ = require('lodash'),
    colors = require('colors'),
    DuplexEmitter = require('duplex-emitter'),
    server = net.createServer(),
    video = require('./lib/video'),
    config = require('./config'),
    argv = require('minimist')(process.argv.slice(2));

server.on('connection', handleConnection);
server.listen(config.port, function () {
    console.log('screens server listening on %j', server.address());
});



// handle connections
//var numCallers = 0; // number of people who picked up the phone (different from num of connected clients)
var nextId = 0;
var emitters = {}; //all clients
var callers = {}; // active (those who picked up the phone)
function handleConnection(conn) {
    var remoteEmitter = DuplexEmitter(conn);
    var id = ++ nextId;
    emitters[id] = remoteEmitter;

    console.log('> client connected'.green);
    logStats();

    conn.once('close', function () {
        console.log('> client disconnected'.red);
        delete emitters[id];
        delete callers[id];

        var numCallers = _.keys(callers).length;
        broadcast('numCallersChange') (numCallers);
        play(numCallers);
        logStats();
    });


    // on end_call/start_call received from one of the clients
    // notify the other clients that number of callers has changed
    remoteEmitter.on('end_call', function(){
        delete callers[id];
        var numCallers = _.keys(callers).length;
        broadcast('numCallersChange') (numCallers);
        play(numCallers);
        console.log('> received end_call event'.yellow)
        logStats()
    });

    remoteEmitter.on('start_call', function(){
        callers[id] = true;
        var numCallers = _.keys(callers).length;
        broadcast('numCallersChange') (numCallers);
        play(numCallers);

        console.log('> received start_call event'.yellow)
        logStats()
    });

    function logStats(){
        console.log('> num clients', _.keys(emitters).length);
        console.log('> num callers', _.keys(callers).length, '\n');
    }

    //conn.on('error', function (err) {
    //    //todo:  do deletes as well
    //    //todo:  notify as well
    //    console.error('Error on connection: '.red + err.message);
    //});


}

function broadcast(event) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(event);
        Object.keys(emitters).forEach(function (emitterId) {
            var emitter = emitters[emitterId];
            emitter.emit.apply(emitter, args);
        });
    };
}



function play(numCallers){
    if ( argv.v && numCallers>=0) {
        video.play(numCallers);
    }
}

var DuplexEmitter = require('duplex-emitter'),
    config = require('./config'),
    Phone = require('./lib/phone'),
    video = require('./lib/video'),
    colors = require('colors'),
    reconnect = require('reconnect-net'),
    argv = require('minimist')(process.argv.slice(2));

// Establishing connection with the server
var hostname = argv.host||'localhost';
var port = argv.port || config.port;
var opts = {isTestMode: argv.t};
var phone = new Phone(opts);  // node client -t
console.log(opts);


reconnect(function(conn){
    /*
        Called when client connects to the server for the first time
        OR when it reconnects
     */
    console.log('> connected'.green);

    //todo: when client starts it should already know how many are now active
    var remoteEmitter = DuplexEmitter(conn);
    if (phone.isOn) remoteEmitter.emit('start_call'); //on reconnect restart the call

    phone.listen();
    phone.on('end_call', function(){
        // client hanged up

        console.log('> end_call');
        remoteEmitter.emit('end_call'); // Notify the server (and other clients);
    });
    phone.on('start_call', function(){
        // client started the call

        console.log('> start_call')
        remoteEmitter.emit('start_call'); // Notify the server (and other clients);
    });

    // listening to the server sending events
    remoteEmitter.on('numCallersChange', function(numCallers){
        if (phone.isOn){
            var videoIndex = numCallers - 1;
            if ( !opts.isTestMode ) video.play(videoIndex);
        } else {
            if ( !opts.isTestMode ) video.quit();
        }
        console.log('> switching video, because num changed to %s', numCallers);
        console.log('phone is ', phone.isOn? 'on': 'off')

    });

    remoteEmitter.on('error', function(err){
        console.log('remoteEmitter error '.red, err)
    });

}).on('error', function(err){

    console.log(err.red);

}).on('disconnect', function (err) {

    console.log('> disconnect'.red, err)

    phone.removeAllListeners('end_call'); // prevent duplicated events on reconnect
    phone.removeAllListeners('start_call'); // prevent duplicated events on reconnect

}).connect(port, hostname );



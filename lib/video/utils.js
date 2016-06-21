var spawn = require('child_process').spawn,
    shell = require('shelljs/global'),
    config = require('../../config'),
    path = require('path');

module.exports = {
    killOmx: function(){
        var kill = spawn('killall ', ['-9', 'omxplayer.bin'])

        kill.stdin.on('close', function(){
            console.log('close omx')
        });

        kill.on('error', function(err){ console.log('err kill omx', err)});


    },
    killHello: function(){
        var kill = spawn('killall ', ['-9', 'hello_video.bin'])

        kill.stdin.on('close', function(){
            console.log('close hello')
        });

        kill.on('error', function(err){ console.log('err kill hello', err)});

    },
    startNoise: function(){
        exec('hello_video.bin --loop '+config.videoDir+'noise.h264');

    }
};
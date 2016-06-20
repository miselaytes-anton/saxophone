var exec = require('child_process').execSync,
    config = require('../../config'),
    path = require('path');

module.exports = {
    killOmx: function(){
        try {
            exec('killall -9 omxplayer.bin > /dev/null 2>&1')
        } catch(err){

        }

    },
    killHello: function(){
        try {
            exec('killall -9 hello_video.bin > /dev/null 2>&1')
        } catch(err){

        }

    },
    startNoise: function(){
        exec('hello_video.bin --loop '+config.videoDir+'noise.h264');

    }
};
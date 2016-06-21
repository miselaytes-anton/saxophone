var //exec = require('child_process').execSync,
    shell = require('shelljs/global'),
    config = require('../../config'),
    path = require('path');

module.exports = {
    killOmx: function(){
        try {
            exec('killall -9 omxplayer.bin')
        }
        catch(err) {}

    },
    killHello: function(){
        try {
            exec('killall -9 hello_video.bin')
        }
        catch(err) {}


    },
    startNoise: function(){
        exec('hello_video.bin --loop '+config.videoDir+'noise.h264');

    }
};
var execSync = require('child_process').execSync,
    exec = require('child_process').exec,
    config = require('../../config'),
    path = require('path');

module.exports = {
    killOmx: function(){
        execSync('killall -9 omxplayer.bin || true')

    },
    killHello: function(){
        execSync('killall -9 hello_video.bin || true')

    },
    startNoise: function(){
        exec('hello_video.bin --loop '+config.videoDir+'noise.h264');

    }
};
var //exec = require('child_process').execSync,
    shell = require('shelljs/global'),
    config = require('../../config'),
    path = require('path');

module.exports = {
    killOmx: function(){
        exec('killall -9 omxplayer.bin')

    },
    killHello: function(){
        exec('killall -9 hello_video.bin')

    },
    startNoise: function(){
        exec('hello_video.bin --loop '+config.videoDir+'noise.h264');

    }
};
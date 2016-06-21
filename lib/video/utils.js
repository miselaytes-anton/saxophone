var //exec = require('child_process').execSync,
    config = require('../../config'),
    path = require('path');
require('shelljs/global');

module.exports = {
    killOmx: function(){
        exec('killall -9 omxplayer.bin 2>/dev/null')

    },
    killHello: function(){
        exec('killall -9 hello_video.bin 2>/dev/null')

    },
    startNoise: function(){
        exec('hello_video.bin --loop '+config.videoDir+'noise.h264');

    }
};
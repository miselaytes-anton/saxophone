var exec = require('child_process').exec,
    path = require('path');
console.log(path.join(__dirname, './videos/noise.h264'));

module.exports = {
    killAll: function () {
        exec('killall -9 omxplayer.bin');
        exec('killall -9 hello_video.bin');
    },
    startNoise: function(){
        console.log(path.join(__dirname, './videos/noise.h264'));
        exec('hello_video.bin --loop ./videos/noise.h264');
    }
};
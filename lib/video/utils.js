var exec = require('child_process').exec;


module.exports = {
    killAll: function () {
        exec('killall -9 omxplayer.bin');
        exec('killall -9 hello_video.bin');
    },
    startNoise: function(){
        exec('hello_video.bin --loop ./videos/noise.h264');
    }
};
var exec = require('child_process').exec,
    path = require('path');

module.exports = {
    killAll: function () {
        exec('killall -9 omxplayer.bin');
        exec('killall -9 hello_video.bin');
    },
    startNoise: function(){
        //console.log(path.join(__dirname, './videos/noise.h264'));
        exec('hello_video.bin --loop /videos/noise.h264');

        //var noise = new OMXControl('./videos/noise.mov',{
        //    '--layer' : 0,
        //    '--loop' : '',
        //    '--no-osd': '' // Do not display status information on screen
        //});
        //
        //noise.on('error', function(err){
        //    console.log('omx error', err);
        //});
        //
        //noise.play();
    }
};
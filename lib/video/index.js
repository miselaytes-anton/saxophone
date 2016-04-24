var OMXControl = require('omx-controller'),
    videoUtils = require('./utils.js');

var videos = [
    './videos/meduza.mkv',
    './videos/BabyWombat.mp4',
    './videos/enot.mp4'
];

videoUtils.killAll();// kill all current OMX and hello_video processes before starting any new ones
videoUtils.startNoise();


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

var omx = null;

function constructVideo (path) {
    omx = new OMXControl(path, {
        '--layer' : 2,
        '--loop': '',
        '--no-osd': '' // Do not display status information on screen
    });

    omx.on('error', function(err){
        console.log('omx error', err);
    });

    omx.on('closed', function(){
        // player has closed, and the video has stopped.
        console.log('closed event');
    });

    omx.play();
}


module.exports = {
    play: function (videoIndex) {
            if ( typeof(videoIndex) === 'undefined' || videoIndex === null ) {
                console.log('no index');
                return null;
            }

            if (omx)omx.quit();
            constructVideo(videos[videoIndex]);
        },
    quit: function (){
        console.log(' quit omx ');
        if (omx)omx.quit();
    }
};
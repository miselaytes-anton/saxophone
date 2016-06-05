var OMXControl = require('omx-controller'),
    videoUtils = require('./utils.js');

videoUtils.killAll();// kill all current OMX and hello_video processes before starting any new ones
videoUtils.startNoise();

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
            // e.g.: 2-callers.mp4
            var path = config.videoDir +videoIndex + '-callers.mp4';
            console.log('> play ', path);
            constructVideo(path);
        },
    quit: function (){
        console.log(' quit omx ');
        if (omx)omx.quit();
    }
};
var OMXControl = require('omx-controller'),
    killAllOmx = require('./killAllOmx');

var videos = [
    './videos/meduza.mkv',
    './videos/BabyWombat.mp4',
    './videos/enot.mp4'
];

killAllOmx();// kill all current OMX processes before starting any new ones



var noise = new OMXControl('./videos/noise.mov',{
    '--layer' : 0,
    '--loop' : '',
    '--no-osd': '', // Do not display status information on screen
    '--no-keys':'' //  Disable keyboard input
});
noise.play();

var omx = null;
function getStatus(){
    return omx;
}

function constructVideo (path) {
    omx = new OMXControl(path, {
        '--layer' : 2,
        '--no-osd': '', // Do not display status information on screen
        '--no-keys':'' //  Disable keyboard input
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

function play (videoIndex) {
    if ( typeof(videoIndex) === 'undefined' || videoIndex === null ) {
        console.log('no index');
        return null;
    }

    var status = getStatus();

    if (status === null) {
        console.log('new');
        //constructVideo('./test.mkv');
    //} else if ( status && status.path && videos[videoIndex] && videos[videoIndex].indexOf(status.path) < 0) {
    } else if ( status ) {
        //something is playing, kill it
        console.log(' quit omx ');
        omx.quit();
    }

    constructVideo(videos[videoIndex]);
}

function quit(){
    var status = getStatus();
    if ( status ) {
        console.log(' quit omx ');
        omx.quit();
    }
}



//var videoIndex = 0;
//
//Video(videoIndex);

//setInterval(function(){
//    videoIndex += 1; console.log('next video ', videoIndex);
//    if (videoIndex === videos.length) {
//        console.log('reset v index');
//        videoIndex = 0;
//    }
//    Video(videoIndex);
//},5000);


module.exports = {
    play: play,
    quit: quit
};
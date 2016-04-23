var OMXControl = require('omx-controller');

var videos = [
    '../videos/test.mkv',
    '../videos/BabyWombat.mp4',
    '../videos/chapter_test.mp4'
];

var noise = new OMXControl('../videos/noise.mov',{
    '--layer' : 0,
    '--loop' : ''
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
    omx.play();
}

function Video (videoIndex) {
    if ( typeof(videoIndex) === 'undefined' || videoIndex === null ) {
        console.log('no index');
        return null;
    }

    var status = getStatus();

    if (status === null) {
        console.log('new');
        //constructVideo('./test.mkv');
    } else if ( status && status.path && videos[videoIndex] && videos[videoIndex].indexOf(status.path) < 0) {
        //something is playing, kill it
        console.log(' quit omx ', videos[videoIndex]);
        omx.quit();
    }

    constructVideo(videos[videoIndex]);


    omx.on('error', function(err){
        console.log('omx error', err);
    });

    omx.on('closed', function(){
        // player has closed, and the video has stopped.
        console.log('closed event');
    });
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


module.exports = {play: Video};
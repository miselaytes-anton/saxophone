var OMXControl = require('omx-controller'),
    killAllOmx = require('./killAllOmx');

function Video(opts){
    var self = this;

    self.videos = [
        './videos/meduza.mkv',
        './videos/BabyWombat.mp4',
        './videos/enot.mp4'
    ];

    killAllOmx();// kill all current OMX processes before starting any new ones


    self.noise = new OMXControl('./videos/noise.mov',{
        '--layer' : 0,
        '--loop' : '',
        '--no-osd': '' // Do not display status information on screen

    });
    self.noise.on('error', function(err){
        console.log('noise error', err);
    });

    self.noise.on('closed', function(){
        console.log('noise closed');
    });

    self.noise.play();//required?

    self.omx = null;
}


Video.prototype.play = function(videoIndex){
    var self = this;
    if ( typeof(videoIndex) === 'undefined' || videoIndex === null ) {
        console.log('no index');
        return null;
    }

    if (self.omx) self.omx.quit();

    var path = self.videos[videoIndex];

    self.omx = new OMXControl(path, {
        '--layer' : 2,
        '--no-osd': '' // Do not display status information on screen
    });

    self.omx.on('error', function(err){
        console.log('omx error', err);
    });

    self.omx.on('closed', function(){
        // player has closed, and the video has stopped.
        console.log('closed event');
    });

    self.omx.play();
};


Video.prototype.quit = function(){
    var self = this.
    console.log(' quit omx ');
    if (self.omx) self.omx.quit();
};

module.exports = Video;
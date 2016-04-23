var exec = require('child_process').exec;


module.exports = function(){
    exec('killall -9 omxplayer');// or  exec('killall -9 omxplayer.bin');
};
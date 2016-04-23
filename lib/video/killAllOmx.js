var exec = require('child_process').exec;


module.exports = function(){

    //not permited?
    exec('killall -9 omxplayer.bin');
};

function kill(id){
    var exec = require('child_process').exec;
    exec('killall '+id);
}
var EventEmitter = require('events').EventEmitter,
    util = require('util'),

    keypress = require('keypress');


util.inherits(Phone, EventEmitter);// add event emitter methods to Phone


function Phone(opts){
    EventEmitter.call(this);
    var self = this;
    self.isListening = false; // listening for events or not yet

    if ( opts && opts.isTestMode ){
        //key press events
        self.isOn = false; // only needed for key press events, so we keep track of button state
        self.isTestMode = true;

    } else {

        //GPIO pins
        var   rpio = require('rpio');
        self.pin = 11;// P11 / GPIO17.

        rpio.open(self.pin, rpio.INPUT);

        self.isOn = ! rpio.read(self.pin); // released means ON

    }
}



Phone.prototype.listen = function(){
    var self = this;
    if (self.isListening) return; // prevent registering events twice
    self.isListening = true;


    if (self.isTestMode){
        // instead of  phone button listen to key-press events

        keypress(process.stdin);
        process.stdin.on('keypress', function (ch, key) {
            // on any key pressed change phone state and emit an event

            if (key && key.ctrl && key.name == 'c') {
                //  exit on ctrl + c
                process.stdin.pause();
                process.exit()
            }


            self.isOn = !self.isOn;
            self.emit(self.isOn?'start_call':'end_call');


        });

        // do not know
        if (typeof process.stdin.setRawMode =='function') process.stdin.setRawMode(true);
        process.stdin.resume();
    } else {

        var rpio = require('rpio')
        var state = rpio.read(11);
        setInterval(function(){
            var newState = rpio.read(11);
            self.isOn = ! newState;
            if (state !=newState ){
                self.emit(self.isOn?'start_call':'end_call');
            }
            state=newState;
        },100);
    }

};


module.exports = Phone;
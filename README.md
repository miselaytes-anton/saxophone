## Server

    node server
    
## Client
    
    node client
    
The following options are available:
    --host          e.g.  192.168.1.68, defaults to localhost
    -t              start client in a test mode(listens to keyboard events instead of a phone button)
    




## OMX
kill all:

    sudo killall -9 omxplayer.bin


play directly:

    omxplayer saxophone/videos/noise.mov --loop --layer 1   --no-osd --no-keys
    omxplayer test.mkv --loop --layer 2  --no-osd --no-keys



some packages:

https://www.npmjs.com/package/omxdirector  // only one instance
https://www.npmjs.com/package/node-omxplayer // new source, new node
https://www.npmjs.com/package/omx-controller // many instances


## RPIO

pins 11 and 17


rpio example:
https://github.com/jperkin/node-rpio/blob/master/examples/button.js


## Server

    node server
    
    -v              play video
    
## Client
    
    node client --host 192.168.1.68
    
The following options are available:

    --host          e.g.  192.168.1.68, defaults to localhost
    -t              start client in a test mode(listens to keyboard events instead of a phone button)
    




## OMX
kill all:

    sudo killall -9 omxplayer.bin


play directly:

    omxplayer saxophone/videos/noise.mov --loop --layer 1   --no-osd
    omxplayer wombat.h264 --loop --layer 2  --no-osd



some packages:

https://www.npmjs.com/package/omxdirector  // only one instance
https://www.npmjs.com/package/node-omxplayer // new source, new node
https://www.npmjs.com/package/omx-controller // many instances


## RPIO

pins 11 and 17


rpio example:
https://github.com/jperkin/node-rpio/blob/master/examples/button.js



## Start client/server on boot
    
    sudo su
    echo "sudo -u pi /usr/bin/pm2 start /home/pi/saxophone/pm2/client.json" >> /etc/rc.local
    
    echo "sudo -u pi /usr/bin/pm2 start /home/pi/saxophone/pm2/server.json" >> /etc/rc.local

## Video

   ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4
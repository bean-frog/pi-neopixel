# pi-neopixel
control neopixel leds over http from a raspberry pi   
pretty much just starts an ExpressJS server that recieves a pixel id and rgb data through the body of a POST request to /led

## how to use
- get a Raspberry Pi and install Raspbian. [OFFICAL RPi INSTRUCTIONS](https://www.raspberrypi.com/documentation/computers/getting-started.html).
- do all the setup/installer stuff, and reboot when prompted.
- make sure to connect to a wifi network or plug in an ethernet cable.
- boot up the pi and open a terminal. The default working directory works fine, but you can use `mkdir foldername` and `cd foldername` to make a custom separate one. This is useful if you will be using the Pi for other things too.
- run `sudo apt-get update` and `sudo apt-get upgrade` to update the Pi.
- install nodejs and github dependencies: `sudo apt-get install npm gh`.
- clone repo: `gh repo clone bean-frog/pi-neopixel`.
- go to directory: `cd pi-neopixel`.
- install nodejs deps: `npm install`.
- start the program using `sudo node index.js`.
    - it is necessary to run this program as a root user (using `sudo`), because the program needs access to the Pi's GPIO pins which is only possible as root.
- the program will give you an address containing the local IP of the Pi on your network. On any other device with a web browser **that is on the same network**, you can enter this address to access the web GUI. On the Pi's browser itself, you can just use `localhost`. for both of these options, the port (:3000 unless you changed the code) is important and must be included at the end of the address.

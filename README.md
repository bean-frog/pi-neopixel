# pi-neopixel
control neopixel leds over http from a raspberry pi   
pretty much just starts an ExpressJS server that recieves a pixel id and rgb data through the body of a POST request to /led

`node index.js` to start   
serves public/index.html and opens /led endpoint    
script.js is heavily commented for your viewing pleasure (i was bored)
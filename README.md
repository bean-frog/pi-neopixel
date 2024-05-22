# pi-neopixel
control neopixel leds over http from a raspberry pi   
pretty much just starts an ExpressJS server that recieves a pixel id and rgb data through the body of a POST request to /led

`node index.js` to start   
serves public/index.html and opens /led endpoint    

let port 3000 thru firewall (if ip doest work):
`sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent`
`sudo firewall-cmd --reload`
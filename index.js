const { StripType, ws281x } = require('piixel');
const express = require('express');
const path = require('path');
const os = require("os");

const leds = 35;

function rgbToAnsi(r, g, b) {
  const colorIndex = 16 + (36 * Math.round(r / 255 * 5)) + (6 * Math.round(g / 255 * 5)) + Math.round(b / 255 * 5);
  return `\x1b[38;5;${colorIndex}m`;
}

ws281x.configure(
	{
		gpio: 18,
		leds: leds,
		type: StripType.WS2811_STRIP_GRB,
		resetOnExit: true
	}
);
const pixels = new Uint32Array(leds);

function setColor({ lednum, color }) {

  const { r, g, b } = color;

  if (lednum >= 0 && lednum < leds) {

    pixels[lednum] = (r << 8) | (g << 16) | b;

    ws281x.render(pixels);

  } else {

    console.error('LED number out of range');

  }

}
const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const port = 3000;

app.use(express.json());


app.post('/led', (req, res) => {
  setColor(req.body)
  // BEHOLD! the long ahh log statement of DOOOOOM
  console.log(rgbToAnsi(255, 255, 255) + 'LED ' + "\x1b[1m" + req.body.lednum + "\x1b[22m" + " set to " + rgbToAnsi(req.body.color.r, req.body.color.g, req.body.color.b) + "(" + req.body.color.r + ", " + req.body.color.g + ", " + req.body.color.b + ")")
});

app.get("/getPixelCount", (req, res) => {
  res.send(leds.toString());
});

app.listen(port, () => {
  const networkInterfaces = os.networkInterfaces();
  let localIpAddress;
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName].forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIpAddress = iface.address;
      }
    });
  });
console.log(`Server started on port ${port}`);
console.log(`Access locally: http://localhost:${port}`);
console.log(`Access on network: http://${localIpAddress}:${port}`);
});


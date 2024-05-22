const { StripType, ws281x } = require('piixel');
const express = require('express');
const path = require('path');
const os = require("os");

const leds = 36;
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
  console.log('LED ' + req.body.lednum + "set to " + req.body.colors);
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


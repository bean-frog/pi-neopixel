const { StripType, ws281x } = require('piixel');
const leds = 36
ws281x.configure(
	{
		gpio: 18,
		leds: leds,
		type: StripType.WS2811_STRIP_GRB,
		resetOnExit: true
	}
)
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

const express = require('express');
const path = require('path');

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
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

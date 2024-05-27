////////////////////////
// Initializing stuff //
////////////////////////

let colorState = hexToRgbObj("#000000");
let lednumState = 1; //the number to target
let pixelNum; //the total number of leds
getLeds().then((result) => {
    pixelNum = result;
    console.log("Total number of LEDs:", pixelNum);
}).catch((error) => {
    console.error('Error fetching LED data:', error);
});

//////////////////////
// Helper Functions //
//////////////////////

async function getLeds() {
    try {
        const response = await fetch('/getPixelCount');
        if (!response.ok) {
            throw new Error('Failed to fetch LED data');
        }
        const data = await response.json();
        document.getElementById("ledNumDisplay").innerHTML = data + " (numbers: 0 - " + (data - 1) + ")";
        return data;
    } catch (error) {
        console.error('Error fetching LED data:', error);
        return null;
    }
    
}

function hexToRgbObj(hex) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return {
        r: r,
        g: g,
        b: b
    };
}

function setAll(color) {
	for (let i = 0; i <= pixelNum; i++) {
		sendColor(i, color)
	}
}

////////////////////
// Main Functions //
////////////////////

function sendColor(ledNum, color) {
    fetch('/led', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "lednum": ledNum, "color": color })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send data to server. server responded with: ' + response);
        }
        console.log('Data sent successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


/////////////////////
// Event Listeners //
/////////////////////

document.querySelector('input[name="color"]').addEventListener('input', function(event) {
    colorState = hexToRgbObj(event.target.value);
});

document.querySelector('input[name="led"]').addEventListener('input', function(event) {
    lednumState = parseInt(event.target.value);
    if (lednumState > pixelNum) {
        alert("you're trying to target a led number that is higher than the amount that you have. Check your input.");
        return;
    } 
});



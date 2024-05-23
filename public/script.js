
let colorState = hexToRgbObj("#000000");
let lednumState = 1; //the number to target
let pixelNum; //the total number of leds
getLeds().then((result) => {
    pixelNum = result;
    console.log("Total number of LEDs:", pixelNum);
}).catch((error) => {
    console.error('Error fetching LED data:', error);
});

//helper functions
async function getLeds() {
    try {
        const response = await fetch('/getPixelCount');
        if (!response.ok) {
            throw new Error('Failed to fetch LED data');
        }
        const data = await response.json();
        document.getElementById("ledNumDisplay").innerHTML = data;
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

function clearColors() {
    for (let i = 1; i <= pixelNum; i++) {
        setTimeout(() => sendColor(i, hexToRgbObj("#000000")), i * 10); //timeout is for slight stagger to avoid flooding server    
    }
}

function setAll(color) {
    for (let i = 1; i <= pixelNum; i++) {
        setTimeout(() => sendColor(i, color), i * 10); //timeout is for slight stagger to avoid flooding server
    }
}

//main functions
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

//Event listeners to update states
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



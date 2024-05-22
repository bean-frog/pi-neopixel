
// ghetto ahh vanilla js version of states because im so addicted to React
let colorState = hexToRgbObj("#000000");
let lednumState = 1; //the number to target
let numLedsState = 0; //the total number of leds

//helper functions
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
    for (let i = 1; i <= numLedsState; i++) {
        sendColor(i, hexToRgbObj("#000000"))    
    }
}

function setAll(color) {
    for (let i = 0; i <= numLedsState; i++) {
        sendColor(i, color)  
    }
}

//main functions
function sendColor(ledNum, color) {
    if (lednumState > numLedsState) {
        alert("you're trying to target a led number that is higher than the amount that you have. Check your inputs.");
        return;
    } else {
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
}


//Event listeners to update states
document.querySelector('input[name="color"]').addEventListener('input', function(event) {
    colorState = hexToRgbObj(event.target.value);
});

document.querySelector('input[name="led"]').addEventListener('input', function(event) {
    lednumState = parseInt(event.target.value);
});

document.querySelector('input[name="numPixels"]').addEventListener('input', function(event) {
    numLedsState = parseInt(event.target.value);
});




# Pi-NeoPixel



Control NeoPixel LEDs over HTTP from a Raspberry Pi.



## How to Use



Follow these steps to set up your Raspberry Pi and control NeoPixel LEDs:



### 1. Preparing Your Raspberry Pi

- **Get a Raspberry Pi** and install Raspbian. For detailed instructions, refer to the [Official RPi Instructions](https://www.raspberrypi.com/documentation/computers/getting-started.html).

- Complete all the setup/installation steps and reboot when prompted.



### 2. Network Connection

- **Connect to a Wi-Fi network** or plug in an Ethernet cable.



### 3. Terminal Setup

- Boot up the Pi and open a terminal. You can use the default working directory or create a custom one for better organization:

  ```sh

  mkdir foldername

  cd foldername

  ```



### 4. System Update

- **Update your Pi**:

  ```sh

  sudo apt-get update

  sudo apt-get upgrade

  ```



### 5. Install Dependencies

- **Install Node.js and GitHub CLI**:

  ```sh

  sudo apt-get install npm gh

  ```



### 6. Clone the Repository

- **Clone the repo**:

  ```sh

  gh repo clone bean-frog/pi-neopixel

  ```



### 7. Navigate to the Project Directory

- **Go to the directory**:

  ```sh

  cd pi-neopixel

  ```



### 8. Install Node.js Dependencies

- **Install the necessary packages**:

  ```sh

  npm install

  ```



### 9. Start the Program

- **Begin the program**:

  ```sh

  sudo node index.js

  ```

  Note: This program requires `sudo` privileges to access the Pi's GPIO pins.



### 10. Access the Web GUI

- The program will provide an address containing the local IP of the Pi on your network. You can:

  - **On other devices on the same network**: Enter this address in the browser.

  - **On the Pi’s browser**: Use `localhost`.

  - Remember to include the port number (this will be `:3000` unless you modified the code).


## Credits
- Thanks to [bjoerge](https://github.com/bjoerge) for creating [piixel](https://github.com/bjoerge/piixel), a ws281x NodeJS wrapper.

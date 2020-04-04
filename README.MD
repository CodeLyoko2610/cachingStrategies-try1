# Different caching strategies - PWA complete guide

This source code is part of Maximilian Schwarzmüller's "Progressive Web Apps - Complete Guide" course on udemy.com.

It has been modified by Dang Chuong Pham, presenting different cache strategies learnt from studying the above course.

# How to Use

You need [Node.js](https://nodejs.org) installed on your machine. Simply download the installer from [nodejs.org](https://nodejs.org) and go through the installation steps.

Once Node.js is installed, open your command prompt or terminal and **navigate into this project folder**. There, run `npm install` to install all required dependencies.

Finally, run `npm start` to start the development server and visit [localhost:8080](http://localhost:8080) to see the running application.

Different strategies have been commentted out. Switching to different stratergies can be done at `/public/sw.js` and `pulic/js/main.js`.

# Note

Please clear the Cache Storage prior to switching among strategies to ensure the application working correctly.

This project covers:

- Cache, then network strategy

- Cache with network fallback strategy

- Network with cache fallback strategy

- Cache-only strategy

- Network-only strategy

More detailed instructions and expetected outputs are in the mentioned files.

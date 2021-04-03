# Travel Planner App Project<br>
## Project Instructions

This repo is the project in Udaciy Nanodegree.

The goal of this project is to give a proctice with:
- Setting up Webpack
- Webpack Loaders and Plugins
- Using APIs and creating requests to external urls
- Creating layouts and page design
- Service workers


This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. Given that this is the Capstone project, it's highly encouraged for you to go above and beyond, adding additional functionality and customization to truly stand out with a project you are proud to have at the top of your portfolio!

## Getting started

Remember that once you clone, you will still need to install everything:

`cd` into your new folder and run:
- `npm install`

## Webpack Loaders and Plugins
Installed express, corse, bodyparser, and webpack with all necessary loaders and plugins.
```
{
  "name": "travelapp",
  "version": "1.0.0",
  "main": "index.js",
  "description": "",
  "scripts": {
    "test": "jest",
    "start": "node src/server/server.js",
    "build-prod": "webpack --config webpack.prod.js",
    "build-dev": "webpack-dev-server --config webpack.dev.js --open"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/runtime": "^7.13.7",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "moment": "^2.29.1",
    "superagent": "^6.1.0",
    "supertest": "^6.1.3",
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12"
  },
  "devDependencies": {
    "@babel/core": "^7.13.10",
    "@babel/plugin-transform-runtime": "^7.13.7",
    "@babel/preset-env": "^7.13.12",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.6.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^3.2.0",
    "jest": "^26.6.3",
    "mini-css-extract-plugin": "^0.9.0",
    "node-sass": "^4.14.1",
    "optimize-css-assets-webpack-plugin": "^5.0.4",
    "sass-loader": "^7.3.1",
    "style-loader": "^0.23.1",
    "terser-webpack-plugin": "^3.1.0",
    "webpack-dev-server": "^3.7.2",
    "workbox-webpack-plugin": "^6.1.2"
  }
}

```
## Setting up the API

### Signup for an API key

1. Create an account with <a href= "http://www.geonames.org/export/web-services.html" target="_blank" >Geonames</a>.<br>
2. Replace the openweather api with geonames api. You already have one working api. What information needs to get adjusted so that instead of entering a zip code, you enter a city? We want to get the latitude, longitude, country, instead of getting the temperature, feeling, and date.<br>
The weather data array was named differently, what do we need to change the name to?<br>
The weather data only had 1 object in the array, the geoname api outputs multiple objects. How do we call the first object?<br>
3. Introduce a countdown. You’ll need to add a text field to your project to get the date.<br>
    ・What type of input should it be? What about cross browser rendering?<br>
    ・We’re looking to see how soon the trip is, how can you get the information from the DOM and see how soon that date is?<br>
    ・Where should you be storing that data once you have it?<br>

4. Create an account with <a href= "https://www.weatherbit.io/account/create" target="_blank" >Weatherbit</a>.<br>
5. Integrate the Weatherbit API similarly to how you integrated the geoname api. What information needs to get adjusted for you to pull in the future weather? Getting a CORS error? Check out <a href= "https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9" target="_blank" >this article</a> for some options. NOTE: If you see that your app is working, but it takes several clicks to get all of the data, think of why this could be. This is possibly the most challenging part of the project. There is a major hint located in the Before you Begin section. If you’re unable to figure it out, and your app still works with a few clicks, continue working on it, it may come to you later, or you’ll get guidance from your reviewer when you submit the app.<br>
    ・How does the Weatherbit API distinguish from the current forecast and future forecasts? Does the API change in any way? <br>Hint: please refer to Weatherbit <a href= "https://www.weatherbit.io/api" target="_blank" >API documentation</a> - Current Weather API and Forecast API<br>
    ・How will we include the date? What format does it need to be in? How can we change it to the appropriate form   at?<br>
<br>
6. Create an account with <a href= "https://pixabay.com/api/docs/" target="_blank" >Pixabay</a>.<br>
7. Integrate the Pixabay API similarly to how you integrated the Geoname/Weatherbit APIs. What information are you going to submit to the API to achieve an appropriate image? What if there are no results?<br>
    ・What Parameters will you want to set to pull in images?<br>
    ・How will you submit your data from the location field to a Pixabay URL parameter without having spaces in the url?<br>
<br>
## Creating layouts and page design<br>
I made a webpage which is displayed the evaluatting result of a URL.<br>
It is designed with SCSS language.<br>

https://sass-lang.com/documentation<br>
https://developer.mozilla.org/en-US/docs/Learn/CSS<br>
<br>
## Service workers<br>
```
Three steps:
1. In webpack.prod.js config file,
・Require the plugin, by appending the new plugin statement
  const WorkboxPlugin = require('workbox-webpack-plugin');

・Instantiate the new plugin in the plugin list:
  new WorkboxPlugin.GenerateSW()

2. On the terminal, install the plugin using npm install workbox-webpack-plugin --save-dev

3. If you follow along with the Workbox Service Worker documentation, there’s one more step. We need to register a Service Worker with our app. To do this, we will add a script to our /src/client/views/index.html file and call the register service worker function if the browser supports service workers.

Add this code to the bottom of your html file, just above the closing body tag.

<script>
 // Check that service workers are supported
 if ('serviceWorker' in navigator) {
     // Use the window load event to keep the page load performant
     window.addEventListener('load', () => {
         navigator.serviceWorker.register('/service-worker.js');
     });
 }
</script>
```

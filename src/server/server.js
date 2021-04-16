projectData = {};
var path = require('path')
const http = require('http');

// Start up an instance of app
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Setting API key's
const GEONAMES = process.env.GEONAMES;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

/* Middleware*/
//configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
app.listen(8081, listening);
function listening(){
    // console.log(server);
    console.log(`'Example app listening on port: ${8081}`);
};

// GET: respond with index.html when a GET request is made
app.get('/', function (request, response) {
  response.sendFile('dist/index.html');
});

// GET: test input data
app.get('/test', function (request, response) {
  response.send(mockAPIResponse)
});

// GET: respond with "projectData" when a GET request is made
app.get('/return', function (request, response){
  response.send(projectData);
});

// GET: respond with each keys when a GET request is made
app.get('/get_infomation', function(request, response){
  response.send({
      GEONAMES: GEONAMES,
      WEATHERBIT_API_KEY: WEATHERBIT_API_KEY,
      PIXABAY_API_KEY: PIXABAY_API_KEY,
  });
});

// POST: post with "save trip" data when a POST request is made
app.post('/add', postData)

function postData(request, response)  {
    projectData = request.body;
    response.send({ message: "Post recieved"})
    console.log(request);
};
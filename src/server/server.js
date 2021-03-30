// Setup empty JS object to act as endpoint for all routes
projectData = {};
var path = require('path')
const http = require('http');

// Require Express to run server and routes
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const GEONAMES = process.env.GEONAMES;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

const port = 8081;

// Setup Server
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// GET route that returns the projectData object
app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.get('/return', getdata);
//sending last saved trip data
function getdata(req, res) {
  res.send(projectData);
}

app.get('/get_infomation', (req, res) => {
  res.send({
      GEONAMES: GEONAMES,
      WEATHERBIT_API_KEY: WEATHERBIT_API_KEY,
      PIXABAY_API_KEY: PIXABAY_API_KEY,
  });
});

// POST route that adds incoming data to projectData.
app.post('/add', postdata)

function postdata(req, resp)  {
    projectData = req.body;
    console.log(req);
}


//-----------------------------------------------------
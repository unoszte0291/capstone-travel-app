export{getplan, updateUI}
/* Global Variables */
// getting each ids information on web page
let moment = require('moment');
const travel_date = document.getElementById('travel_date');
const weather_img = document.getElementById('weather');
const weather_temp = document.getElementById('temperature');
const weather_exp = document.getElementById('explanation');
const photo = document.getElementById('picture');
const noinput = document.getElementById('noinput');
const baseURL = 'http://localhost:8081/get_infomation';
   // test input data
//---------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------//

//min and max date set to input date
    let firstdate = moment().format('YYYY-MM-DD'); 
    let seconddate = moment().add(15, 'days').format('YYYY-MM-DD'); 
        console.log(firstdate);
        console.log(seconddate);

//calendar data
        travel_date.setAttribute('min', firstdate);
        travel_date.setAttribute('max', seconddate);
//---------------------------------------------------------------------------------------------//

//diference travel date and current date
function current(depdate) {
    let thirddate = moment(depdate).format('YYYY-MM-DD');
    let weather = moment(thirddate).diff(moment(firstdate), 'days');
        console.log(weather + ' days');
        return weather;
};
//---------------------------------------------------------------------------------------------//
//getting the travel plan
function getplan(event) {
//preventing default
event.preventDefault();
const place = document.getElementById('travel_place').value;
let date = document.getElementById('travel_date').value;
    //checking the form
    if (place === '' || date === '') {
        console.log('No place or No date');
        return 'empty';
    }
    //fetching keys from server side
    async function getKeysInfo(baseURL) {
        try {
          const response = await fetch(baseURL);
          console.log(await response.json());
        }
        catch (err) {
          console.log('fetch failed', err);
        }

        const GEONAMES = response.GEONAMES;
        const PIXABAY_API_KEY = response .PIXABAY_API_KEY;
        const WEATHERBIT_API_KEY = response .WEATHERBIT_API_KEY;
        // Weather info posted to the server
        console.log('--- Response ---')
        console.log(GEONAMES)
        console.log(PIXABAY_API_KEY)
        console.log(WEATHERBIT_API_KEY)
        geonames(GEONAMES, PIXABAY_API_KEY,WEATHERBIT_API_KEY)
        getKeysInfo(baseURL);
    };
    //fetching information from geonames api
    async function geonames(GEONAMES, PIXABAY_API_KEY,WEATHERBIT_API_KEY) {
        try {
            const geodata = await fetch(`http://api.geonames.org/searchJSON?q=${place}&maxRows=1&username=${GEONAMES}`);
            console.log(await geodata.json());
          }
          catch (err) {
            console.log('fetch failed', err);
          }
    
        // country information
        const country = geodata.countryName;
        const countryCode = geodata.countryCode;
        const lat = geodata.lat;
        const lng = geodata.lng;
        
        console.log('--- Response ---')
        console.log(country, lat, lng);
    //calling the getphoto function
        getphoto(country, countryCode, lat, lng, date, PIXABAY_API_KEY, WEATHERBIT_API_KEY)
         .catch(error => {
            console.log('error');
            })
        };
//----------------------------------------------------------------------------------------------//

//getting photos from pixabay api
async function getphoto(country, countryCode, lat, lng, date, PIXABAY_API_KEY, WEATHERBIT_API_KEY) {
    try {
        const photodata = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${country}&orientation=horizontal&category=travel&per_page=3`);
        console.log(await photodata.json());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    
        const image = photodata.hits[0].webformatURL;
    //getting date count
        const weather= current(depdate);
        
        console.log('--- Response ---')        
        console.log(photodata);
        console.log(image);
        console.log('get weather forecast');
        weatherforecast(lat, lng, country, countryCode, image, weather, WEATHERBIT_API_KEY)           
    .catch(error => {
        console.log('error');
    });
}
//----------------------------------------------------------------------------------------------//
async function weatherforecast(clat, lng, country, countryCode, image, weather, WEATHERBIT_API_KEY) {
    try {
        const weatherdata = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`);
        console.log(await weatherdata.json());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
        //getting informnation
             const city = weatherdata.city_name;
             const temperature = weatherdata[weather].temp;
             const icon = weatherdata[weather].weather.icon;
             const explanation = weatherdata[weather].weather.description;
             const windspeed = weatherdata[weather].wind_spd;
             const daytime = weather + ' days';
        
        console.log('--- Response ---') 
        console.log(daytime);
        console.log(weatherdata);
        console.log(city, temperature, icon, explanation, windspeed);
    //sending to the server update UI data 
    updateUI(icon, explanation, temperature, city, country, countryCode, daytime, image, windspeed)
    .catch(error => {
        console.log('error');
        });
    }
};
//-------------------------------------------------------------//

//updates the UI with information
function updateUI(icon, explanation, temperature, city, country, countryCode, daytime, image, windspeed) {
    photo.src = image;
    noinput.innerHTML = daytime;
    weather_img.src = `./src/client/media/${icon}.png`;
    weather_exp.innerHTML = `${explanation}`;
    weather_temp.innerHTML = `Temperature: ${Math.round(temperature)}°C`;
    wind_speed.innerHTML = `Wind Speed: ${Math.round(windspeed*10)/10} m/s`;
}
//-------------------------------------------------------------//  

/* POST data */
async function postData(url, data) {
        await fetch(url, {
        method: 'POST',
        cache: "no-cache",
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

//sending the data to the server
let savetrip = document.getElementById('saveplan');
savetrip.addEventListener('click', function (event) {
postData('/add', {icon, explanation, temperature, city, country, countryCode, daytime, image, windspeed});

console.log('sending data to server');
    });
//-------------------------------------------------------------//
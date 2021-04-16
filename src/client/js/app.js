/* Global Variables */
// getting each ids information on web page
let moment = require('moment');
const weather_img = document.getElementById('weather');
const weather_temp = document.getElementById('temperature');
const weather_exp = document.getElementById('explanation');
const photo = document.getElementById('picture');
const noinput = document.getElementById('noinput');
const travel_date = document.getElementById('travel_date');
const wind_speed = document.getElementById('wind');
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
}
//---------------------------------------------------------------------------------------------//
// Event listener for the click
document.getElementById('submit').addEventListener('click', getplan);
//getting the travel plan
function getplan(event) {
//preventing default
event.preventDefault();
    // test input data
    const place = document.getElementById('travel_place').value;
    let date = document.getElementById('travel_date').value;
    //checking the form
    if (place === '' || date === '') {
        console.log('No place or No date');
        return 'empty';
    }
    //fetching keys from server side
    fetch('http://localhost:8081/get_infomation')
    .then(response => {
        console.log('--- Response ---')
        console.log(response.url);
        console.log(response.status);
        console.log(response.ok);
        console.log(response.statusText);
        return response.json()
    })
    
    .then(keys => {
    // getting each keys
            const GEONAMES = keys.GEONAMES;
            const PIXABAY_API_KEY = keys.PIXABAY_API_KEY;
            const WEATHERBIT_API_KEY = keys.WEATHERBIT_API_KEY;
        
        console.log('--- Response ---')
        console.log(GEONAMES)
        console.log(PIXABAY_API_KEY)
        console.log(WEATHERBIT_API_KEY)
        geonames(GEONAMES, PIXABAY_API_KEY,WEATHERBIT_API_KEY);
        }) 
        .catch(error => {
            console.log('--- Error ---')
            console.log('error')
    }) 
    //fetching information from geonames api
    function geonames(GEONAMES, PIXABAY_API_KEY,WEATHERBIT_API_KEY){
    fetch(`http://api.geonames.org/searchJSON?q=${place}&maxRows=1&username=${GEONAMES}`)
    .then(response => {
        console.log('--- Response ---')
        console.log(response.url);
        console.log(response.status)
        console.log(response.ok)
        console.log(response.statusText)
        return response.json()

        .then(data => {
        // country information
            const country = data.geonames[0].countryName;
            const countryCode = data.geonames[0].countryCode;
            const lat = data.geonames[0].lat;
            const lng = data.geonames[0].lng;
        
        console.log(place);
        console.log(date);
        console.log(data);
        console.log(country, lat, lng);

    //calling the getphoto function
        getphoto(country, countryCode, lat, lng, date, PIXABAY_API_KEY, WEATHERBIT_API_KEY);
         })
         .catch(error => {
            console.log('error');
            });
        });
    }
}
//----------------------------------------------------------------------------------------------//

//getting photos from pixabay api
function getphoto(country, countryCode, lat, lng, depdate, PIXABAY_API_KEY, WEATHERBIT_API_KEY) {

    //fetching pixabay image
    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${country}&orientation=horizontal&category=travel&per_page=3`)
    .then(response => {
        console.log('--- Response ---')
        console.log(response.url);
        console.log(response.status)
        console.log(response.ok)
        console.log(response.statusText)
        return response.json()

        .then(data => {
            const image = data.hits[0].webformatURL;
    //getting date count
            const weather= current(depdate);
                
    weatherforecast(lat, lng, country, countryCode, image, weather, WEATHERBIT_API_KEY);
        console.log(data);
        console.log(image);
        console.log('get weather forecast');            
    })
    .catch(error => {
        console.log('error');
        })
    });
}
//----------------------------------------------------------------------------------------------//

function weatherforecast(lat, lng, country, countryCode, image, weather, WEATHERBIT_API_KEY){
    //fetching weatherbit forecast weather
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`)
    .then(response => {
        console.log('--- Response ---')
        console.log(response.url);
        console.log(response.status)
        console.log(response.ok)
        console.log(response.statusText)
        return response.json()

        .then(data => {
        //getting informnation
             let city = data.city_name;
             let temperature = data.data[weather].temp;
             let icon = data.data[weather].weather.icon;
             let explanation = data.data[weather].weather.description;
             let windspeed = data.data[weather].wind_spd;
             const daytime = weather + ' days';
        
        console.log(daytime);
        console.log(data);
        console.log(city, temperature, icon, explanation, windspeed);
    //updating ui
    updateUI(icon, explanation, temperature, city, country, countryCode, daytime, image, windspeed);
    })
    .catch(error => {
        console.log('error');
        })
    });
}
//-------------------------------------------------------------//

//updates the UI with information
function updateUI(icon, explanation, temperature, city, country, countryCode, daytime, image, windspeed) {
            photo.src = image;
            noinput.innerHTML = daytime;
            weather_img.src = `./src/client/media/${icon}.png`;
            weather_exp.innerHTML = `${explanation}`;
            weather_temp.innerHTML = `Temperature: ${Math.round(temperature)}°C`;
            wind_speed.innerHTML = `Wind Speed: ${Math.round(windspeed*10)/10} m/s`;
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
};

//sending the data to the server
let savetrip = document.getElementById('saveplan');
savetrip.addEventListener('click', function (event) {
postData('/add', {icon, explanation, temperature, city, country, countryCode, daytime, image, windspeed});

console.log('sending data to server');
});
}
//-------------------------------------------------------------//

//-------------------------------------------------------------//

export {current, updateUI, weatherforecast, getphoto, getplan};

//-------------------------------------------------------------//
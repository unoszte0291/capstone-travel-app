// Creating a navigation bar.
/**
 * Start section navigation bar.
 * 
*/
const sections = document.querySelectorAll('section');
let ul_element = document.createElement("ul");

for (let i = 1; i<=sections.length; i++) {
    let li_element = document.createElement("li");
    li_element.textContent = "Section" + i;
    ul_element.appendChild(li_element);
    li_element.setAttribute("id", "nav" + i);
}

let navarea = document.getElementById("nav");
navarea.appendChild(ul_element);
/**
 * End navigation bar.
 * 
*/

// Scroll the page and each article of section will appear.
/**
 * start section effect-1
 * 
*/
let scrollAnimationElm = document.querySelectorAll('.sa');
let scrollAnimationFunc = function() {
  for(let i = 0; i < scrollAnimationElm.length; i++) {
    let triggerMargin = 580;
    if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
      scrollAnimationElm[i].classList.add('show');
    }
  }
}
window.addEventListener('load', scrollAnimationFunc);
window.addEventListener('scroll', scrollAnimationFunc);
/**
 * End section effect-1
 * Begin Events
 * 
*/

// Scrolling the cursor over the article makes the article easier to read.
/**
 * Start section effect-2
 * 
*/
const sections_2 = document.querySelectorAll("section");
// Add class 'active' to section when it is near top of viewport
function makeActive() {
    for (const section of sections_2) {
        const box = section.getBoundingClientRect();
        // You can play with the values in the "if" condition to further make it more accurate.
        if (box.top <= 150 && box.bottom >= 150) {
            // Apply active state on the current section and the corresponding Nav link.
            section.style.backgroundColor = "orange";
            section.style.fontSize = "large";
        } else {
            // Remove active state from other section and corresponding Nav link.
            section.style.backgroundColor = "";
            section.style.fontSize = "";
        }
    }
}
/**
 * End section effect-2
 * 
*/

// Make sections active
document.addEventListener("scroll", function () {
    makeActive();
});

// Creating a navigation helper.
/**
 * Start section navigation helper
 * 
*/
window.addEventListener("load", (event) => {
  const sections = document.querySelectorAll("section");
    for (let i = 1; i <= sections.length; i++) {
        let navelem = document.getElementById("nav" + i);
        let sec_elem = document.getElementById("section" + i);
        navelem.addEventListener("click", (e) => {
            e.preventDefault();
            let sec_elem_position = sec_elem.getBoundingClientRect();

            // window.scrollTo( 0, sec_elem_position.top);
            window.scrollTo({
                top: sec_elem_position.top,
                left: 0,
                behavior: "smooth",
            });
        });
    }
});
/**
 * End navigation helper
 * 
*/

//-------------------------------------------------------------//
//library for dates
var moment = require('moment');
const loading = document.getElementById('loading');
const country_loading = document.getElementById('country_loading');
const weather_img = document.getElementById('weather');
const weather_temp = document.getElementById('temperature');
const weather_exp = document.getElementById('explanation');
const weather_title = document.getElementById('nowhere_titile');
const picture = document.getElementById('picture');
const noinput = document.getElementById('noinput');
const travel_date = document.getElementById('travel_date');

//-------------------------------------------------------------//
//start by getting the travel plan
function getplan(event) {
    //preventing default
    event.preventDefault();
    //getting keys from server side
    fetch('http://localhost:8080/get_infomation')
        .then((res) => res.json())
        .then((keys) => {
            const GEONAMES = keys.GEONAMES;
            const PIXABAY_API_KEY = keys.PIXABAY_API_KEY;
            const WEATHERBIT_API_KEY = keys.WEATHERBIT_API_KEY;

            //getting input data
            const place = document.getElementById('travel_place').value;
            let date = document.getElementById('travel_date').value;

            //checking if the form was empty
            if (place === '' || date === '') {
                console.log('No input');
                return 'empty';
            }

            //console logging for debug
            console.log(place);
            console.log(date);

            //fetching lat and lng from geonames api
            fetch(
                `http://api.geonames.org/searchJSON?q=${place}&maxRows=1&username=${GEONAMES}`
            )
                //handeling response as json
                .then((response) => response.json())
                .then((data) => {
                    //reciving country lat and lng
                    console.log(data);

                    const country = data.geonames[0].countryName;
                    const countryCode = data.geonames[0].countryCode;
                    const lat = data.geonames[0].lat;
                    const lng = data.geonames[0].lng;
                    console.log(country, lat, lng);

                    //calling the get photo function
                    getphoto(
                        country,
                        countryCode,
                        lat,
                        lng,
                        date,
                        PIXABAY_API_KEY,
                        WEATHERBIT_API_KEY
                    );
                });
        });
}

//-------------------------------------------------------------//

//getting photos from pixabay api
function getphoto(
    country,
    countryCode,
    lat,
    lng,
    depdate,
    PIXABAY_API_KEY,
    WEATHERBIT_API_KEY
) {
    console.log('Fetching pixabay');

    //fetching pixabay image
    fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${country}&orientation=horizontal&category=travel&per_page=3`
    )
        //handling response
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const image = data.hits[0].webformatURL;
            console.log(image);

            //getting current or predicted weather
            const weather= current(depdate);

            if (weather <= 7) {
                console.log('get current weather');
                currentweather(
                    lat,
                    lng,
                    country,
                    countryCode,
                    image,
                    weather,
                    WEATHERBIT_API_KEY
                );
            } else {
                console.log('get predicted weather');
                predictedweather(
                    lat,
                    lng,
                    country,
                    countryCode,
                    image,
                    weather,
                    WEATHERBIT_API_KEY
                );
            }
        });
}

//-------------------------------------------------------------//
//function that fetches the current weather from weatherbit
function currentweather (
    lat,
    lng,
    country,
    countryCode,
    image,
    weather,
    WEATHERBIT_API_KEY
) {
    console.log('fetching current weather');
    //fetching weatherbit current weather
    fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`
    )
        //handling response
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            //getting temperature icon explanation and city
            let city = data.data[0].city_name;
            let temperature = data.data[0].temp;
            let icon = data.data[0].weather.icon;
            let explanation = data.data[0].weather.description;
            console.log(city, temperature, icon, explanation);

            //hide loading icon
            showLoading(false);

            const daytime = weather + ' days';
            //updating ui
            updateUI(
                icon,
                explanation,
                temperature,
                city,
                country,
                countryCode,
                daytime,
                image
            );
        });
}
//-------------------------------------------------------------//

//function that gets the future weather from weatherbit
function predictedweather(
    lat,
    lng,
    country,
    countryCode,
    image,
    weather,
    WEATHERBIT_API_KEY
) {
    console.log('fetching forecast weather');

    //fetching weatherbit forecast
    fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`
    )
        //handling response
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            //of the day of travel_date
            let city = data.city_name;
            let temperature = data.data[weather].temp;
            let icon = data.data[weather].weather.icon;
            let explanation = data.data[weather].weather.explanation;
            console.log(city, temperature, icon, explanation);

            //hide loading icon
            showLoading(false);

            const daytime = weather + ' days';
            //updating ui
            updateUI(
                icon,
                explanation,
                temperature,
                city,
                country,
                countryCode,
                daytime,
                image
            );
        });
}
//-------------------------------------------------------------//

//function that updates the UI with icon explanation temperature and location
function updateUI(
    icon,
    explanation,
    temperature,
    city,
    country,
    countryCode,
    daytime,
    image
) {
    picture.src = image;
    noinput.innerHTML = daytime;
    weather_img.src = `./src/client/media/${icon}.png`;
    weather_exp.innerHTML = `${explanation}`;
    //rounding temperature for better presentation
    weather_temp.innerHTML = `${Math.round(temperature)}°C`;
    //if the country + city are more than 18 charecters
    //it will show the country code
    if (country.length + city.length > 19) {
        weather_title.innerHTML = `${city} ${countryCode}`;
    } else {
        weather_title.innerHTML = `${city} ${country}`;
    }

    //if the user clicks save trip
    //it will send the data to the server
    let savetrip = document.getElementById('saveTrip');
    savetrip.addEventListener('click', function () {
        console.log('sending data to server');
        postData('/add', {
            icon,
            explanation,
            temperature,
            city,
            country,
            countryCode,
            daytime,
            image,
        });
    });
}

//-------------------------------------------------------------//

//function that returns the travel_date diference with the current date
function current(depdate) {
    var now = moment().format('YYYY-MM-DD');
    var travel_date = moment(depdate).format('YYYY-MM-DD');

    now = now.split('-');
    travel_date = travel_date.split('-');

    var c = moment([Number(now[0]), Number(now[1]) - 1, Number(now[2])]);
    var f = moment([Number(travel_date[0]), Number(travel_date[1]) - 1, Number(travel_date[2]),]);

    const weather = f.weather(c, 'days');
    console.log(weather);
    return weather;
}

//-------------------------------------------------------------//

//function that shows loading icon
function showload(userInput) {
    if (userInput) {
        country_loading.style.display = 'block';
        loading.style.display = 'block';
    } else {
        country_loading.style.display = 'none';
        loading.style.display = 'none';
    }
}

//-------------------------------------------------------------//

export {
    showload,
    current,
    updateUI,
    currentweather ,
    predictedweather,
    getphoto,
    getplan,
};

//------------------------------------------------------------//
//adds min max date to travel_date input type date
minmaxdate();
//function that adds min and max attributes to input date
function minmaxdate() {
    let mindate = moment().format('YYYY-MM-DD');
    console.log(mindate);
    travel_date.setAttribute('min', mindate);
    //

    let maxdate = moment().add(15, 'days').format('YYYY-MM-DD');
    console.log(maxdate);
    travel_date.setAttribute('max', maxdate);
}

// get project data and update the UI
//cheking if the user saved a trip, if that is the case
//it will update the ui with the saved trip info
getserverdata();
async function getserverdata() {
    const response = await fetch('/return');
    const newentry = await response.json();
    // checking if there is a icon attribute
    if (newentry && newentry.icon) {
        updateUI(
            newentry.icon,
            newentry.explanation,
            newentry.temperature,
            newentry.city,
            newentry.country,
            newentry.countryCode,
            newentry.daytime,
            newentry.image
        );
    }
}

/* Function to POST data */
async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
}
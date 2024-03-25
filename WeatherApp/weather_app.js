const apiKey = "aa91b6b7029b621c1fa3898499f6890c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const geoApiKey = "8f06bc44123dfc02d60cba52416ad78a";
const geoApiURL = "http://api.openweathermap.org/geo/1.0/reverse?";

// with html
const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const background = document.querySelector(".html");

// location access permission
const sucessCallback = (position) => {
    // if successful, then print data
    console.log(position);

    // calculate current hour, minute from timestamp
    var date = new Date(position.timestamp * 1000);
    var hour = date.getHours();
    var minute = "0" + date.getMinutes();

    getLocation(position.coords.latitude, position.coords.longitude);
}
const errorCallback = (error) => {
    console.error(error);
} // Callback

// call getCurrentPosition (coordinates only) through JS API
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sucessCallback, errorCallback);
} else {
    console.log("Geolocation is not supported by this browser.");
} // if

// fetch location details (name) through 3rd API
async function getLocation(lat, lon) {
    var geoResponse = await fetch(`${geoApiURL}lat=${lat}&lon=${lon}&limit=1&appid=${geoApiKey}`);
    var geoData = await geoResponse.json();

    console.log(geoData);

    // call checkWeather on city of current location
    checkWeather(geoData[0].name);
    
} // getLocation()


async function checkWeather(city) {
    // string interpolation; fetch the url when city and apikey is included
    const response = await fetch(`${apiURL}&q=${city}&appid=${apiKey}`);
    // await ensures that JSON data is parsed and assigned to data before moving on 
    var data = await response.json();

    console.log(data);

    // with html
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°";
    document.querySelector(".feelslike").innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°";

    // different weathers (UNFINISHED)
    switch (data.weather[0].main) {
        case "Clear":
            // setIcon("sun")
            break;
        case"Clouds":
            console.log("Clouds");
            document.body.style.background = "linear-gradient(to right, #ff0000, #0000ff)"
            // setIcon("cloud")
            break;
        case "Mist":
            // setIcon("mist")
            break;
    }

} // checkWeather(city)
  
SearchBtn.addEventListener("click", ()=>{
    // SearchBox.value is passed into the checkWeather function
    checkWeather(SearchBox.value);
})

// UNFINISHED;; function is called in checkWeather(city)
function setIcon(icon) {
    // get all icons
    let icons = document.querySelectorAll(".icon");

    icons.forEach( icon => {
        if (icon.classList.contains(iconClassName)) {
            icon.style.visibility = "visible";
        } else {
            icon.style.visibility = "hidden";
        }
    })
}


function compareTime(hours) {
    var date = new Date(position.timestamp * 1000);
    console.log(date);
}

// function changeBackground(hour, minute) {
//     if (hour > 17 || hour < 5) {
//         document.body.style.background = "darkblue";
//     }
// }

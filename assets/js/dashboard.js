// let searchInputEl = document.querySelector("#cityname");
let prevSearchListEl = document.querySelector("#search-history");

let getCityWeather = function(city) {
    // format the OpenWeather api url
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ce39e7239416ad754359ca762d28521a&units=imperial";

    // make a request to the url
    fetch(apiUrl)
        
        .then(function(response) {
        // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayWeather(data);
                    console.log(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })  

        // alert user if there is no responce from OpenWeather
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        })
};

let searchSubmitHandler = function(event) {
    // stop page from refreshing
    event.preventDefault();

    // get value from input element
    let cityName = $("#cityname").val().trim();

    // check if the search field has a value
    if(cityName) {
        // pass the value to getCityWeather function
        getCityWeather(cityName);
        // clear the search input
        $("#cityname").val("");
    } else {
        // if nothing was entered alert the user
        alert("Please enter a city name");
    }
};

let citySearchHistory = function (city) {

};

let displayWeather = function(weatherData) {
    $("#main-city-name").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ").append(` <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
    $("#main-city-temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
    $("#main-city-humid").text("Humidity: " + weatherData.main.humidity + "%");
    $("#main-city-wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + " mph");

    // uv api call
    // fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + weatherData.coord.lat + "&lon="+ weatherData.coord.lon + "&appid=ce39e7239416ad754359ca762d28521a")

    $("#main-city-uv").text("UV Index: ");
};

// event handlers
$("#search-form").submit(searchSubmitHandler)
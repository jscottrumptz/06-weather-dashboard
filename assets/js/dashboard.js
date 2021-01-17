let searchformEl = document.querySelector("#search-form");
let searchInputEl = document.querySelector("#cityname");
let prevSearchListEl = document.querySelector("#search-history");

let getCityWeather = function(city) {
    // format the OpenWeather api url
    let apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ce39e7239416ad754359ca762d28521a";

    // make a request to the url
    fetch(apiUrl)
        
        .then(function(response) {
        // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    // displayWeather(data, city);
                    console.log(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })  

        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        .catch(function(error) {
            alert("Unable to connect to OpenWeather");
        })
};

let searchSubmitHandler = function(event) {
    // stop page from refreshing
    event.preventDefault();

    // get value from input element
    let cityName = searchInputEl.value.trim();

    // insert cityname into the api url bay calling the getCityWeather function
    if(cityName) {
        getCityWeather(cityName);
        searchInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

let displayWeather = function(weatherData, citySearch) {

}


searchformEl.addEventListener("submit", searchSubmitHandler);
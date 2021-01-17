let searchHistory = []

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
    
    $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + city + "'>" + city + "</a>")
};

let displayWeather = function(weatherData) {

    // format and display the values
    $("#main-city-name").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ").append(`<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
    $("#main-city-temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
    $("#main-city-humid").text("Humidity: " + weatherData.main.humidity + "%");
    $("#main-city-wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + " mph");

    // uv api call
    fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + weatherData.coord.lat + "&lon="+ weatherData.coord.lon + "&appid=ce39e7239416ad754359ca762d28521a")
        .then(function(response) {
            response.json().then(function(data) {

                // display the uv index value
                $("#uv-box").text(data.value);

                // highlight the value using the EPA's UV Index Scale colors
                if(data.value >= 11) {
                    $("#uv-box").css("background-color", "#6c49cb")
                } else if (data.value < 11 && data.value >= 8) {
                    $("#uv-box").css("background-color", "#d90011")
                } else if (data.value < 8 && data.value >= 6) {
                    $("#uv-box").css("background-color", "#f95901")
                } else if (data.value < 6 && data.value >= 3) {
                    $("#uv-box").css("background-color", "#f7e401")
                } else {
                    $("#uv-box").css("background-color", "#299501")
                }
                
            })
        })

    // 5-day api call
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + weatherData.name + "&appid=ce39e7239416ad754359ca762d28521a&units=imperial")
        .then(function(response) {
            response.json().then(function(data) {
                console.log(data);

                for(i = 7; i <= data.list.length; i += 8){
                    console.log(dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY"));
                    console.log(data.list[i].weather[0].icon)
                    console.log(data.list[i].main.temp);
                    console.log(data.list[i].main.humidity);

                    $("#five-day").append('<div class="col-md-2 m-2 card text-white bg-primary" style="max-width: 18rem;"><div class="card-body p-1"><h5 class="card-title">d/a/te</h5><img src="http://openweathermap.org/img/wn/10d.png" alt="rain"><p class="card-text">Temp: </p><p class="card-text">Humidity: </p></div></div>')
                }
        })
    });

    citySearchHistory(weatherData.name);
};

// event handlers
$("#search-form").submit(searchSubmitHandler);
$("#search-history").on("click", function(event){
    let prevCity = $(event.target).closest("a").attr("id");
    getCityWeather(prevCity);
});
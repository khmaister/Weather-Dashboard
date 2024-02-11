var APIKEY = 'a977f958e1769a4b9e075f3d22db2866'
var cityName = document.querySelector('.search-form');
var submitButton = document.querySelector(".search-btn");

submitButton.addEventListener("click", function(event) {
    var city = cityName.value;
    console.log(city);
    cityGeo(city);
  });

function cityGeo (city){
    var geoUrl= "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKEY;
    fetch(geoUrl)
        .then(response =>response.json())
        .then(data =>{
            var lat = data[0].lat
            var lon = data[0].lat
            var currentCity = data[0].name
            console.log(lat, lon, currentCity)
            getWeather(lat, lon, currentCity)
            getForecast(lat, lon, currentCity)
        });
};

function getWeather(lat,lon, currentCity){
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKEY}`
    fetch(weatherUrl)
        .then(response =>response.json())
        .then(data =>{
            console.log(data); 
            $(".current").empty();
            var card = $("<div>").addClass("card")
            var cardBody = $("<div>").addClass("card-body")
            var cardTitle = $("<h4>").addClass("card-title").text(currentCity + ": ")
            var currentTemp = data.main.temp
            var currentTmpEle = $("<h6>").addClass("card-body").text("Current Temperature: " + currentTemp + "°");
            var currentHumidity = data.main.humidity
            var currentHumidEle = $("<h6>").addClass("card-body").text("Current Humidity: " + currentHumidity + "%")  
            var currentWindData = data.wind.speed
            var currentWindEle = $("<h6 >").addClass("card-body").text("Wind Speed: " + currentWindData + 'mph')  
            var weatherIconClass = "wi wi-owm-" + data.weather[0].id
            var weatherIconEle = $("<i>").addClass(weatherIconClass);
            $(".current").append(card.append(cardBody.append(cardTitle)))
            $(".current").append(card.append(cardBody.append(currentTmpEle)))  
            $(".current").append(card.append(cardBody.append(currentHumidEle)))
            $(".current").append(card.append(cardBody.append(currentWindEle)))
            $(".current").append(card.append(cardBody.append(weatherIconEle)))
        });
};

function getForecast(lat, lon, currentCity) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKEY}`;  
    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        $(".forecast").empty(); 
        var uniqueDates = [];
        for (var i = 2; i < data.list.length; i++) {
          var forecastDate = new Date(data.list[i].dt * 1000).toLocaleDateString();
          if (!uniqueDates.includes(forecastDate)) {
            uniqueDates.push(forecastDate);  
            var forecastCard = $("<div>").addClass("card col-md-2");
            var forecastCardBody = $("<div>").addClass("card-body");  
            var forecastCardTitle = $("<h4>").addClass("card-title").text(currentCity + ": ");
            var forecastTemp = data.list[i].main.temp;
            var forecastTmpEle = $("<h6>").addClass("card-body").text("Temperature: " + forecastTemp + "°");
            var forecastHumidity = data.list[i].main.humidity;
            var forecastHumidEle = $("<h6>").addClass("card-body").text("Humidity: " + forecastHumidity + "%");
            var forecastWindData = data.list[i].wind.speed;
            var forecastWindEle = $("<h6>").addClass("card-body").text("Wind Speed: " + forecastWindData + 'mph');
            var forecastDateEle = $("<h6>").addClass("date").text("Date: " + forecastDate);
            var weatherIconClass = "wi wi-owm-" + data.list[i].weather[0].id;
            var forecastIconEle = $("<i>").addClass(weatherIconClass);
  
            forecastCard.append(forecastCardBody.append(forecastCardTitle, forecastDateEle, forecastTmpEle, forecastHumidEle, forecastWindEle, forecastIconEle));
            $(".forecast").append(forecastCard);
          }
        }
      });
  };
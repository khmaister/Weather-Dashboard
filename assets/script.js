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
        })


}
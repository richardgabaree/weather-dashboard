var APIKey = "c5a41d8e4db290980daec1d7900f882c";
$(document).ready(function () {
  //Find our button, and create an event listener.
  $("#search-btn").on("click", function () {
    generateWeather();
  });

  function generateWeather() {
    var citySearch = $(".form-control").val();
    // var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units-imperial&appid=${APIKey}`;
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearch +
      "&appid=" +
      APIKey;

    // console.log(queryURL)
    // console.log(citySearch)
    $.ajax({
      url: queryURL,
      method: "GET",
      // We store all of the retrieved data inside of an object called "response"
    }).then(function (response) {
      
        // Log the resulting object
        var current = response.main.temp;
        var city = response.main.name;
        var wind = response.wind.speed;
        var humidity = response.main.humidity;
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
        var cityLog = []
       
        cityLog.push(response.name);
        localStorage.setItem("city", cityLog);
        console.log(cityLog);

        $("#sideBar").append(
          '<button id =" ' +
            response.name +
            ' "class = "cityHistory")></button><br>'
        );

        
        $("#" + response.name).text(response.name);
        $(".city").text("City: " + response.name);
        //change temperature to Imperial
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".wind-speed").text("Wind Speed: " + response.wind.speed);

       
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
        
        
        // var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}?q==${citySearch}&appid=${APIKey}';
        var forecastURL =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=" +
          APIKey;

        $.ajax({
          url: forecastURL,
          method: "GET",
        }).then(function (response) {

          console.log(response)
          var daily = response.daily;
          var fiveDay = daily.slice(0, 5); //taking the first 5 days from the daily array
          // console.log(fiveDay);

          fiveDay.map(function (day) {
            var date = $("<h6>").text(date.format("dddd"));
            var icon = $("<img>").attr(("<img src='http://openweathermap.org/img/w/" + weatherDataIn.weather[i].icon + ".png'>") +
            fiveDay[i].weather);
            var high = $("<p>").text("High: " + day.temp.max);
            var low = $("<p>").text("Low: " + day.temp.min);
            var uv = $("<p>").text("UV Index: " + day.uvi);
            if  (fiveDay[i].uvi > 7) {
              $(".uvIndex").css("background-color", red);
            } else {
              $(".uvIndex").css("background-color", cyan);
            }
            for (var i = 0; i < fiveDay.length; i++) {
              console.log(fiveDay[i])
              var date = moment.unix(fiveDay[i].dt);
              console.log(date);
            
            
            }
          });
          });
          });
          
        }
        
  
  $(".cityHistory").on("click", function () {
    $(".form-control").text(JSON.stringify(this));
    // console.log(this);
    generateWeather();

    document.addEventListener('DOMContentLoaded', function () {
      var input = document.getElementById('cityHistory');
      if (localStorage['cityHistory']) { 
          input.value = localStorage['job']; // set the value
      }
      input.onchange = function () {
           localStorage['job'] = this.value; // change localStorage on change
       }
     
      })
  
  });

});

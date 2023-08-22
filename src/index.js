function formatDate(currentDate) {
    let date = new Date(currentDate);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let dayIndex = date.getDay();
    let day = days[dayIndex];
    return `${day} ${hours}:${minutes}`;
  }

  function formatDay(currentDate) {
    let date = new Date(currentDate * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    return days[day];
  }

  function displayForecast(response) {
    console.log(response);
    let forecast = response.data.daily;
    console.log(forecast);
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<ul>`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 5) {
      console.log(forecastDay);
    forecastHTML = forecastHTML + `
          <li class="ahead">
            <p class="weather-forecast-date">${formatDay(forecastDay.time)}</p>
            <img class="weather-forecast-icon" 
            src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
            alt="forecastDay.condition.description"
            >
            <p><span class="weather-forecast-temp-max">${Math.round(forecastDay.temperature.maximum)}°</span>
              <br/>
              <span class="weather-forecast-temp-min">${Math.round(forecastDay.temperature.minimum)}°</span>
            </p>
          </li>
    `;
      }
    });
    forecastHTML = forecastHTML + `</ul>`;
    forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "4ff3d6d4bfb7b087ccb1f4d3f7ota12e";
    let long = coordinates.longitude;
    let latit = coordinates.latitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${long}&lat=${latit}&key=${apiKey}&units=metric`
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
  }
  
  function displayWeatherCondition(response) {
    let countryElement = document.querySelector("#country");
    let cityElement = document.querySelector("#city-name");
    let descriptionElement = document.querySelector("#description");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconUrl = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
    
    let celciusTemp = response.data.temperature.current;
  
    countryElement.innerHTML = response.data.country;
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", iconUrl);
    iconElement.setAttribute("alt", response.data.condition.description);
    temperatureElement.innerHTML = Math.round(celciusTemp);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed*3.6);

    getForecast(response.data.coordinates);
  }
  
  function searchCity(city) {
    let apiKey = "4ff3d6d4bfb7b087ccb1f4d3f7ota12e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function submitButton(event) {
    event.preventDefault();
    let cityInputted = document.querySelector("#city-input");
    searchCity(cityInputted.value);
  }

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", submitButton);

  searchCity("Paris");
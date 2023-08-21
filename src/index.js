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
    celciusTemp = response.data.temperature.current;
  
    countryElement.innerHTML = response.data.country;
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", iconUrl);
    iconElement.setAttribute("alt", response.data.condition.description);
    temperatureElement.innerHTML = Math.round(celciusTemp);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed*3.6);
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

  function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove active class on the celcius link
    celciuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
    let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  }

  function displayCelciusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove the active class the fahrenheit link
    celciuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celciusTemp);
  } 

  let celciusTemp = null;
 
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", submitButton);

  let fahrenheitlink = document.querySelector("#fahrenheitlink")
  fahrenheitlink.addEventListener("click", displayFahrenheitTemp);
  
  let celciuslink = document.querySelector("#celciuslink")
  celciuslink.addEventListener("click", displayCelciusTemp);
  
  searchCity("Paris");
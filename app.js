let temp = document.getElementById("temp");
let unit = document.getElementById("unit");
let city = document.getElementById("city");
let desc = document.getElementById("desc");
let icon = document.getElementById("icon");

let deg = String.fromCharCode(176);
let tempUnit = 'C';
let tempCelsius = '';

let urlFW = "https://fcc-weather-api.glitch.me//api/current?";

window.addEventListener('load', showForecast);

function showForecast() {
  
  navigator.geolocation.getCurrentPosition(success);

  unit.addEventListener('click', changeTemp);

  function success(position) {
    let crd = position.coords;
    let url = `${urlFW}lat=${crd.latitude}&lon=${crd.longitude}`;

    fetch(url)
      .then(checkStatus)
        .then(parseJSON)
          .then(renderData)
            .catch(error => alert(error));

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
    
    function parseJSON(response) {
      return response.json();
    }

    function renderData(json) {
      tempCelsius = roundTemp(json.main.temp);

      city.textContent = json.name;
      temp.textContent = `${tempCelsius} ${deg}`;
      unit.textContent = tempUnit;
      desc.textContent = json.weather[0].main;
      icon.setAttribute("src", json.weather[0].icon);
    }
  }

  function roundTemp(t) {
    return Math.round(t * 10) / 10;
  }

  function changeTemp() {
    let tempFahrenheit = Math.round(parseInt(tempCelsius) * (9 / 5) + 32);

    if (unit.textContent === "C") {
      unit.textContent = "F";
      temp.textContent = `${tempFahrenheit} ${deg}`;
    } else {
      unit.textContent = tempUnit;
      temp.textContent = `${tempCelsius} ${deg}`;
    }
  }
}




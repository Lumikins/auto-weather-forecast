// sélection d'éléments
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp-val p");
const descElement = document.querySelector(".temp-desc p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// app data
const weather = {};

// API KEY
const key = "50640bf15a324eb3339a90625244b050";

// Lang support

const lang = "fr";

// vérifier si le navigateur prend en charge la géolocalisation

if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

// localisation de l'utilisateur

function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

// afficher une erreur lors de problème du service de géolocalisation

function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// obtenir les détails météorologiques de l'API

function getWeather(latitude, longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=${lang}`;
  
  fetch(api)
      .then(function(response){
          let data = response.json();
          return data;
      })
      .then(function(data){
          weather.temp = Math.floor(data.main.temp);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
      })
      .then(function(){
          displayWeather();
      });
}

// afficher les données météorologiques sur l'interface utilisateur

function displayWeather(){
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.svg"/>`;
  tempElement.innerHTML = `${weather.temp}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// créer un intervalle pour la récupération des coordonnées aléatoires

setInterval(randomLocation, 1000 * 5);

// générer des coordonnées aléatoires et obtenir les données de l'API

function randomLocation(){
  const latMax = 90;
  const latMin = -90;
  const lonMax = 180;
  const lonMin = -180;
  const fixed = 3;

  let lat = (Math.random() * (latMax - latMin) + latMin).toFixed(fixed) * 1;
  let lon = (Math.random() * (lonMax - lonMin) + lonMin).toFixed(fixed) * 1;
  
  getWeather(lat, lon);
}
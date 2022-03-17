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

// appel initial à la fonction pour afficher la météo dans un emplacement aléatoire

randomLocation();

// créer un intervalle pour la récupération des coordonnées aléatoires toutes les 30 secondes

setInterval(randomLocation, 5000 * 6);

// générer des coordonnées aléatoires à partir du fichier JSON des villes du monde, récupérer les données de l'API correspondant à la longitude et la latitude de cette ville aléatoire et les afficher sur l'interface utilisateur

function randomLocation(){

  const cities = './city.list.min.json';

  fetch(cities)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data){
      let dataString = JSON.parse(JSON.stringify(data))
      for(let i=0; i<dataString.length; i++){
        dataString[i].id = i
      }
      let id = Math.floor(Math.random() * 209579)
        if (dataString.map(a => a.id == id)){
          let latitude = dataString[id].coord.lat
          let longitude = dataString[id].coord.lon
          getWeather(latitude, longitude)
        }
    });
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
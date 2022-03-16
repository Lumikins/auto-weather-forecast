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
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const axios = require('axios');

// app data

const weather = {};

// API KEY

const key = "50640bf15a324eb3339a90625244b050";

// Lang support

const lang = "fr";

const units = "metric";

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  getDefaultLocation();

  function getDefaultLocation(){
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Paris&units=${units}&appid=${key}`)
    .then(function(response){
      weather.temp = Math.floor(response.data.main.temp);
      weather.description = response.data.weather[0].description;
      weather.iconId = response.data.weather[0].icon;
      weather.city = response.data.name;
      weather.country = response.data.sys.country;
      console.log(weather);
      socket.emit('weather', weather);
    })
  }
  socket.on('coords', (data) => {
    console.log(data);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=${units}&lang=${lang}&appid=${key}`)
    .then(function(response){
      weather.temp = Math.floor(response.data.main.temp);
      weather.description = response.data.weather[0].description;
      weather.iconId = response.data.weather[0].icon;
      weather.city = response.data.name;
      weather.country = response.data.sys.country;
      console.log(weather);
      socket.emit('weather', weather);
    })
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
 TriBranch
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
// mapboxgl.accessToken = 'pk.eyJ1IjoidHJpaWloYXVzIiwiYSI6ImNrcm9ja2s5aTZmM3AydnBkaXVwank3cHAifQ.7lG7dllcNDPKoe99U3hBDg';

// var onpageMap = document.getElementById('map')
// var map = new mapboxgl.Map({
//   container: 'map', // container id
//   style: 'mapbox://styles/mapbox/streets-v11', // style URL
//   center: [-74.5, 40], // starting position [lng, lat]
//   zoom: 9 // starting zoom
// // });
// 

var mapKey = 'pk.eyJ1IjoiZmxvdzNyIiwiYSI6ImNrcnJlZzY3azEyY2wybm8xdjM4ZzZ1ZHQifQ.a3bwXqM3S8c6JRvLcXvm2w'

var submitButton = document.getElementById('submitBtn')
// var location = document.getElementsByClassName('weather');
var postalInput = document.getElementById('zipCode')
var citySearchInput = document.getElementById('city')

function getApi(postal) {
 var requestUrl = 'https://api.openbrewerydb.org/breweries/search?by_postal='+ postal;   
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      
      return response.json();
  }) .then( function (data){
    console.log(data);
}) .catch(function (error){
    console.log(error)
})
}

// function showMap (location) {
//   var ladLongCall = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName+"&appid=" + key;  
//   fetch(ladLongCall)
//   .then(function (response) {
//       console.log(response);

//       return response.json();
//   }) .then( function (data){
//       console.log(data);
//       getApi (data.coord.lat, data.coord.lon)
//   })
// }
// searchCity("San Francisco")

function handleButton (event) {
    event.preventDefault()
    getApi(postalInput.value, citySearchInput.value)

}

submitButton.addEventListener('click', handleButton)
 main


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

//Variables
var mapKey = 'pk.eyJ1IjoiZmxvdzNyIiwiYSI6ImNrcnJlZzY3azEyY2wybm8xdjM4ZzZ1ZHQifQ.a3bwXqM3S8c6JRvLcXvm2w'

var submitButton = document.getElementById('submitBtn')
// var location = document.getElementsByClassName('weather');
var postalInput = document.getElementById('zipCode')
var citySearchInput = document.getElementById('city')
var breweryType = document.getElementById('type');

//Function Generate Map with condition "center" 
function generateMap(center){
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJpaWloYXVzIiwiYSI6ImNrcm9ja2s5aTZmM3AydnBkaXVwank3cHAifQ.7lG7dllcNDPKoe99U3hBDg';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: center, // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
}
// this calls generate map function at the start so the map isnt blank when the webpage is loaded
generateMap([-118, 33.8])

function getApi(citySearch, type) {
    console.log(type);
 var requestUrl = 'https://api.openbrewerydb.org/breweries?by_city=' + citySearch+'&by_type=' +type;   
  fetch(requestUrl)
    .then(function (response) {
    //   console.log(response);
    //   console.log(response.json())
      return response.json();
  }) .then( function (data){
    console.log(data);

// created valid bars array that will store all the bars with info: street,website,latitude & longitude
    var validBars = []
// this forloop goes through the data and pushes the validbars based on the conditions to the array validBars
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        // console.log(element.street);
        if(element.street !== null && element.website_url !== null && element.longitude !== null && element.latitude !== null){
            validBars.push(element);
        }
        
    }
    console.log(validBars);
    // this variable center takes the longitude and latitude form the first bar in the array valid bars and sets it as the
    // center on the map so that the map is in the correct area 
    var center = [validBars[0].longitude, validBars[0].latitude];
    //calls function generate map and feeds in the argument center 
    generateMap(center);


}) .catch(function (error){
    console.log(error)
})
}

// function showMap (location) {
//   var mapURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName+"&appid=" + key;  
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
    getApi(citySearchInput.value, breweryType.value)

}

submitButton.addEventListener('click', handleButton)
//Retrieve Lon and Lat from API and display it on the map as Markers

//

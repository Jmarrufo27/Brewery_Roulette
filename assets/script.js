
var submitButton = document.getElementById('submitBtn')
// var location = document.getElementsByClassName('weather');
var postalInput = document.getElementById('zipCode')
var citySearchInput = document.getElementById('city')

function getApi(postal, citySearch) {
 var requestUrl = 'https://api.openbrewerydb.org/breweries/search?by_postal='+ postal+'&by_city='+ citySearch;   
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

// function searchCity (cityName) {
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
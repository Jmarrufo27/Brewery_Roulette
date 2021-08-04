//Variables
var mapKey = 'pk.eyJ1IjoiZmxvdzNyIiwiYSI6ImNrcnJlZzY3azEyY2wybm8xdjM4ZzZ1ZHQifQ.a3bwXqM3S8c6JRvLcXvm2w'
var submitButton = document.getElementById('submitBtn');
var citySearchInput = document.getElementById('city');
var stateSearchInput = document.getElementById('state');
var breweryType = document.getElementById('type');
var rouletteBtn = document.getElementById('rouletteBtn');
var barsList = document.getElementById('bars-list');
var barCount = document.getElementById('bars-count');
var burgers = document.getElementById('saveBtn')
// created valid bars array that will store all the bars with info: street,website,latitude & longitude
var validBars = []
//where we will locate the saved bars 
var savedBars = []

//Function Generate Map with variable "center" that will be the longitude and latitiude coordinates, [lng, lat]
function generateMap(center){
    //console.log("center", center);
  mapboxgl.accessToken = 'pk.eyJ1IjoidHJpaWloYXVzIiwiYSI6ImNrcm9ja2s5aTZmM3AydnBkaXVwank3cHAifQ.7lG7dllcNDPKoe99U3hBDg';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/triiihaus/ckru777gm29sx18ka0u03lt1z', // style URL
    center: center, // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
}
// this calls generate map function at the start so the map isnt blank when the webpage is loaded
generateMap([-118, 33.8])

function getApi(citySearch, stateSearch, type) {
    console.log(type);
 var requestUrl = 'https://api.openbrewerydb.org/breweries?by_city=' + citySearch+'&by_type=' +type+'&by_state=' +stateSearch;  
  fetch(requestUrl)
    .then(function (response) {

      return response.json();
  }) .then( function (data){
    console.log(data);

// this forloop goes through the data and pushes the validbars based on the conditions to the array validBars
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        
        if(element.state !== null && element.city !== null && element.street !== null && element.website_url !== null && element.longitude !== null && element.latitude !== null){
            validBars.push(element);
        }
    }
    console.log(validBars);
    console.log(validBars[Math.floor(Math.random() * validBars.length)]);
    // this variable center takes the longitude and latitude form the first bar in the array valid bars and sets it as the
    // center on the map so that the map is in the correct area 
    var center = [validBars[0].longitude, validBars[0].latitude];
    //calls function generate map and feeds in the parameter center to center over the first bar in 'validBars' array
    generateMap(center);

    //close the modalpopup 
      document.querySelector(".reveal-overlay").style.display = "none";
      //console.log("trying to close ....");

}) .catch(function (error){
    console.log(error)
})
}


function handleButton (event) {
    event.preventDefault()
    validBars = [];
    getApi(citySearchInput.value, stateSearchInput.value, breweryType.value)
    

}

function randomValidBarPickAndDisplay() {

    var container = document.getElementById('barInfoDisplay')
    var randomBar = validBars[Math.floor(Math.random() * validBars.length)]
    var title = document.createElement('h2')
    var barName = document.createElement('h5');
    var barStreet = document.createElement('h5');
    var barWebsite = document.createElement('a');
    var savedBarButton = document.createElement('button')
    var breakLine = document.createElement('br')
    
    //clear container before appending new information
    container.innerHTML = "";
    
    title.textContent = ('TADAA!')
    barWebsite.setAttribute('href', randomBar.website_url)
    savedBarButton.setAttribute('type', savedBarButton)
    savedBarButton.classList.add('button')
    savedBarButton.classList.add('.submit')
    barName.textContent = ("Name: " + randomBar.name)
    barStreet.textContent = ("Street: " + randomBar.street)
    barWebsite.textContent = ('WebSite')

    savedBarButton.textContent = ('Save It!')

    container.appendChild(title)
    container.appendChild(barName)
    container.appendChild(barStreet)
    container.appendChild(barWebsite)
    container.appendChild(breakLine)
    container.appendChild(savedBarButton)
    

    function savedBar() {
        // console.log('click')
        
        savedBars.push(barName.innerHTML)

        console.log(savedBars)
        
        localStorage.setItem("savedBars" , JSON.stringify(savedBars))

        var savedModal = document.getElementById('exampleModal2')
        var savedBarList = document.createElement('ul')
        //var savedBarList.classList.add('bars-list')
        var savedBarName = document.createElement('h5')
        var savedWebsite = document.createElement('a')

        savedWebsite.setAttribute('href', randomBar.website_url)
        savedBarName.textContent = ("Name: " + randomBar.name)
        savedWebsite.textContent = ('WebSite')
        

        savedBarList.appendChild(savedBarName)
        savedBarList.appendChild(savedWebsite)
        savedModal.appendChild(savedBarList)
        console.log(savedBarList)
        // localStorage.getItem(savedBarName)
        savedModal.appendChild(savedBarName)
        savedModal.appendChild(savedWebsite)


    }
    
    savedBarButton.addEventListener('click', savedBar)
    
}


submitButton.addEventListener('click', handleButton, 'hide')
rouletteBtn.addEventListener('click', randomValidBarPickAndDisplay)







// STILL LEFT TODO!!


// function renderBars() {

//     var dataToPull = localStorage.getItem('savedBars')
//     console.log("data" + dataToPull);

//     for (let i = 0; i < localStorage.length; i++) {
//         const element = localStorage[i];

//         element.appendChild(savedBarList);

        
//     }
// }

// burgers.addEventListener('click', renderBars)


// localStorage.setItem("favBar", JSON.stringify(barInfo))
//Retrieve Lon and Lat from API and display it on the map as Markers
//create markers using filtered results with Longtitude and Latitude


//reduce to one marker
//a button in 'display bar' box to save the option in local storage
//delete button in the saved box

//remove old markers and generate new marker when the roulette button is clicked








// Define variables to display results:

const ipAddress = document.getElementById('ip-result');
const locationResult = document.getElementById('location-result');
const timezone = document.getElementById('timezone-result');
const isp = document.getElementById('isp-result');
const button = document.getElementsByTagName('button')[0];

// Create map:

const myMap = L.map('map', {zoomControl: false}).setView([53, -5], 9);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHIwZ2VvIiwiYSI6ImNrZ3NpdzlrdTBvMDcyeW1mM3JhdWg0YTYifQ.fxz89-sBEjM2DNbzS2wZCg'
}).addTo(myMap);

// Fetch information:

const getIpResults = () => {
  const inputValue = document.getElementsByTagName('input')[0].value;
  let url;
    
  if (inputValue === '') {
    url = 'https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=at_twq88aaXycBh9fu7OKwKSXqt3Cq6R';

  } else {
    url = `https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=at_twq88aaXycBh9fu7OKwKSXqt3Cq6R&ipAddress=${inputValue}`;
  }

  fetch(url)
    .then(firstResponse => firstResponse.json())
    .then(response => {
      // Relative to written results:
      ipAddress.innerHTML = response.ip;
      locationResult.innerHTML = `${response.location.city}, ${response.location.region}, ${response.location.postalCode}`;
      timezone.innerHTML = `UTC ${response.location.timezone}`;
      isp.innerHTML = response.isp;
      // Relative to map:
      const coordinates = [response.location.lat, response.location.lng];
      myMap.flyTo(coordinates);
      L.marker(coordinates).addTo(myMap);
    });
}

// Event listeners and calls:

button.addEventListener('click', getIpResults);
window.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getIpResults();
  }
});

getIpResults();
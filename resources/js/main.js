// Define variables to display results:

const ipAddress = document.getElementById('ip-result');
const locationResult = document.getElementById('location-result');
const timezone = document.getElementById('timezone-result');
const isp = document.getElementById('isp-result');

const button = document.getElementsByTagName('button')[0];

// Create GET request to retrieve information:

const getIpResults = () => {
  inputValue = document.getElementsByTagName('input')[0].value;
  return setTimeout(() => {
    const xhr = new XMLHttpRequest();

    if (inputValue === '') {
      xhr.open('GET', 'https://geo.ipify.org/api/v1?apiKey=at_twq88aaXycBh9fu7OKwKSXqt3Cq6R');
    } else {
      xhr.open('GET', `https://geo.ipify.org/api/v1?apiKey=at_twq88aaXycBh9fu7OKwKSXqt3Cq6R&ipAddress=${inputValue}`);
    }
    
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Relative to written results:
        const response = JSON.parse(this.responseText);
        ipAddress.innerHTML = response.ip;
        locationResult.innerHTML = `${response.location.city}, ${response.location.region}, ${response.location.postalCode}`;
        timezone.innerHTML = `UTC ${response.location.timezone}`;
        isp.innerHTML = response.isp;
        // Relative to map:
        const coordinates = [response.location.lat, response.location.lng];
        mymap.panTo(coordinates);
        L.marker(coordinates).addTo(mymap);
      }
    }

  xhr.send();
  }, 0);
}

button.addEventListener('click', getIpResults);

getIpResults();

// Create map:

const mymap = L.map('map').setView([0, 0], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHIwZ2VvIiwiYSI6ImNrZ2t5aTBsYzBiemsyeXBjcmtnZTdraTQifQ.qPcewc-4oa5i2PcuVYBk1g'
}).addTo(mymap);
// Define variables to display results:

const ipAddress = document.getElementById('ip-result');
const locationResult = document.getElementById('location-result');
const timezone = document.getElementById('timezone-result');
const isp = document.getElementById('isp-result');

let inputValue = '';

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
        const response = JSON.parse(this.responseText);
        ipAddress.innerHTML = response.ip;
        locationResult.innerHTML = `${response.location.city}, ${response.location.region}, ${response.location.postalCode}`;
        timezone.innerHTML = `UTC ${response.location.timezone}`;
        isp.innerHTML = response.isp;
      }
    }

  xhr.send();
  }, 0);
}

// Define variable to get value of input:

const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', getIpResults);
getIpResults();
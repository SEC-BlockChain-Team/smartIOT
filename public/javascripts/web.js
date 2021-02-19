let content = document.querySelector('#data');

fetch('/sendData').then(respone => {
    respone.json().then(data => {
        content.textContent = data.sensorData;
    });
});
// Handle Wi-Fi Scan Button click
document.getElementById('scanButton').addEventListener('click', function() {
    fetch('/scan_wifi')
        .then(response => response.json())
        .then(data => {
            const networkList = document.getElementById('networkList');
            networkList.innerHTML = '';  // Clear the list
            data.networks.forEach(network => {
                const li = document.createElement('li');
                li.textContent = `SSID: ${network.ssid}, Signal: ${network.signal}`;
                networkList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
});

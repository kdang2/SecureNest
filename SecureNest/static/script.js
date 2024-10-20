document.getElementById('scanButton').addEventListener('click', function () {
    fetch('/scan_wifi', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        const networkList = document.getElementById('networkList');
        networkList.innerHTML = '';

        if (data.networks) {
            data.networks.forEach(network => {
                const li = document.createElement('li');
                li.textContent = network;
                li.onclick = () => checkBreach(network); // Add click event for breach check
                networkList.appendChild(li);
            });
        } else if (data.error) {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while scanning for Wi-Fi networks.');
    });
});

function checkBreach(network) {
    const breachChance = Math.random() < 0.5; // 50% chance of a breach
    if (breachChance) {
        alert(`Warning: Potential breach detected on ${network}!`);
    } else {
        alert(`Safe: No breach detected on ${network}.`);
    }
}

document.getElementById('otherButton').addEventListener('click', function () {
    fetch('/perform_action', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        const resultList = document.getElementById('otherActionResult');
        resultList.innerHTML = '';

        if (data.result) {
            const li = document.createElement('li');
            li.textContent = data.result;
            resultList.appendChild(li);
        } else if (data.error) {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
});
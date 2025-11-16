// Static values for temperature and wind speed (matching the static sample in place.html
const temperature = 10;   // in Celsius
const windSpeed = 5;     // in km/h

//calculate wind chill
function calculateWindChill(temp, wind) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(wind, 0.16) +
        0.3965 * temp * Math.pow(wind, 0.16)
    );
}

// Check conditions and display wind chill
function displayWindChill() {
    const labelValues = document.querySelectorAll('.label-value');

    labelValues.forEach((element) => {
        const label = element.querySelector('.label');
        const value = element.querySelector('.value');

        if (label && label.textContent.trim() === 'Wind Chill:') {
            if (temperature <= 10 && windSpeed > 4.8) {
                const windChill = calculateWindChill(temperature, windSpeed);
                value.innerHTML = `${windChill.toFixed(1)} &#8451;`;
            } else {
                value.textContent = 'N/A';
            }
        }
    });
}

// Call the function when the page loads
displayWindChill();

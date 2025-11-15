// Static values for temperature and wind speed (matching the HTML)
const temperature = 10; // in Celsius
const windSpeed = 5; // in km/h

// Function to calculate wind chill
function calculateWindChill(temp, wind) {
    // Wind chill formula for Celsius and km/h
    // Formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
    // Where T = temperature in °C, V = wind speed in km/h
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

// Check conditions and display wind chill
function displayWindChill() {
    const windChillElements = document.querySelectorAll('.label-value');
    let windChillElement = null;

    // Find the wind chill element
    windChillElements.forEach(element => {
        if (element.innerHTML.includes('Wind Chill:')) {
            windChillElement = element;
        }
    });

    if (windChillElement) {
        // Check if conditions are met for wind chill calculation
        // Metric: Temperature <= 10°C and Wind speed > 4.8 km/h
        if (temperature <= 10 && windSpeed > 4.8) {
            const windChill = calculateWindChill(temperature, windSpeed);
            windChillElement.innerHTML = `<strong>Wind Chill:</strong> ${windChill.toFixed(1)} &#8451;`;
        } else {
            windChillElement.innerHTML = `<strong>Wind Chill:</strong> N/A`;
        }
    }
}

// Call the function when the page loads
displayWindChill();
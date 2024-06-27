document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('weather-form');
    const weatherResult = document.getElementById('weather-result');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const response = await fetch('/weather', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.weather) {
            const weatherHtml = renderWeather(data.weather);
            weatherResult.innerHTML = weatherHtml;
        } else {
            weatherResult.innerHTML = '<p class="animate__animated animate__fadeInUp">City not found. Please try again.</p>';
        }
    });
});

function renderWeather(weather) {
    const airQualityHtml = `
        <div class="air-quality">
            <h3>Air Quality Index</h3>
            <table>
                <tr><th>CO</th><td>${weather.air_quality.co}</td></tr>
                <tr><th>NO2</th><td>${weather.air_quality.no2}</td></tr>
                <tr><th>O3</th><td>${weather.air_quality.o3}</td></tr>
                <tr><th>SO2</th><td>${weather.air_quality.so2}</td></tr>
                <tr><th>PM2.5</th><td>${weather.air_quality.pm2_5}</td></tr>
                <tr><th>PM10</th><td>${weather.air_quality.pm10}</td></tr>
                <tr><th>US EPA Index</th><td>${weather.air_quality['us-epa-index']}</td></tr>
                <tr><th>GB DEFRA Index</th><td>${weather.air_quality['gb-defra-index']}</td></tr>
            </table>
        </div>
    `;

    const forecastHtml = weather.forecast.map(day => `
        <div class="forecast-card">
            <p>${day.date}</p>
            <img src="${day.day.condition.icon}" alt="Weather icon">
            <p>${day.day.avgtemp_c}°C</p>
            <p>${day.day.condition.text}</p>
        </div>
    `).join('');

    return `
        <div class="weather-card animate__animated animate__fadeInUp">
            <div class="weather-info">
                <img src="${weather.icon}" alt="Weather icon">
                <h2>Weather in ${weather.city}</h2>
            </div>
            <p>Temperature: ${weather.temperature}°C</p>
            <p>Humidity: ${weather.humidity}%</p>
            <p>Wind Speed: ${weather.wind_speed} kph</p>
            <p>Description: ${weather.description}</p>
            <p>UV Index: ${weather.uv_index}</p>
            ${airQualityHtml}
            <p>Sunrise: ${weather.sunrise}</p>
            <p>Sunset: ${weather.sunset}</p>
        </div>
        <div id="forecast">
            <h2>7-Day Forecast</h2>
            <div class="forecast-grid">
                ${forecastHtml}
            </div>
        </div>
    `;
}

function toggleMode() {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');

    const elements = document.querySelectorAll('.header, .title, input, button, #weather-result, .weather-card, .forecast-card');
    elements.forEach(el => {
        el.classList.toggle('light-mode');
        el.classList.toggle('dark-mode');
    });
}

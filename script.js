document.addEventListener('DOMContentLoaded', () => {
    // 1. Logika untuk Tombol Simulasi Utama
    const simButtons = document.querySelectorAll('.sim-button');
    simButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const originalText = button.getAttribute('data-text-original');
            const isVisible = targetElement.style.display === 'block';

            if (isVisible) {
                targetElement.style.display = 'none';
                button.textContent = originalText;
            } else {
                targetElement.style.display = 'block';
                button.textContent = 'Sembunyikan Hasil';
                // If this is the weather panel, fetch live data
                if (targetId === 'weather-result') {
                    fetchWeather();
                }
            }
        });
    });

    // 2. Logika untuk Toggle Tampilan Teknis (JSON)
    const techToggles = document.querySelectorAll('.technical-toggle');
    techToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link pindah halaman
            const targetId = toggle.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const isVisible = targetElement.style.display === 'block';

            if (isVisible) {
                targetElement.style.display = 'none';
                toggle.textContent = 'Lihat Data Teknis (JSON)';
            } else {
                targetElement.style.display = 'block';
                toggle.textContent = 'Sembunyikan Data Teknis';
            }
        });
    });
});

// Fetch OpenWeather data and update the weather UI
async function fetchWeather() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-6.9175&lon=107.6191&appid=717b64c259b63d6656a8032709d0a797&units=metric';
    const tempEl = document.getElementById('weather-temp');
    const cityEl = document.getElementById('weather-city');
    const condEl = document.getElementById('weather-condition');
    const descEl = document.getElementById('weather-desc');
    const techResponseCode = document.querySelector('#weather-tech-view pre:not(.request-http) code');

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        const data = await res.json();

        // Update UI: city, temp, weather
        if (tempEl && data.main && typeof data.main.temp !== 'undefined') {
            tempEl.textContent = Number(data.main.temp).toFixed(1);
        }
        if (cityEl && data.name) {
            cityEl.textContent = data.name;
        }
        if (condEl && data.weather && data.weather[0]) {
            condEl.textContent = data.weather[0].main || data.weather[0].description || '-';
        }
        if (descEl && data.weather && data.weather[0]) {
            descEl.textContent = '(' + (data.weather[0].description || '-') + ')';
        }

        // Replace technical response JSON so user can inspect the real payload
        if (techResponseCode) {
            techResponseCode.textContent = JSON.stringify(data, null, 2);
        }
    } catch (err) {
        console.error('Fetch weather failed:', err);
        if (condEl) condEl.textContent = 'Error';
        if (descEl) descEl.textContent = '';
        if (techResponseCode) techResponseCode.textContent = String(err);
    }
}

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

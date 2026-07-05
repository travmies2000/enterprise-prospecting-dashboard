const WEBHOOK_URL = 'YOUR_GOOGLE_SHEET_WEBHOOK_URL';

async function initDashboard() {
    const response = await fetch(WEBHOOK_URL);
    const data = await response.json(); // Assumes data format: { labels: [], values: [] }

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels, // e.g., ["Week 1", "Week 2"]
            datasets: [{
                label: 'Inquiries per Week',
                data: data.values, // e.g., [5, 12]
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            },
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}

initDashboard();

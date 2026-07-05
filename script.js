// Replace with your actual Google Sheet Webhook URL
const WEBHOOK_URL = 'YOUR_GOOGLE_SHEET_WEBHOOK_URL';

async function fetchGuestData() {
    try {
        const response = await fetch(WEBHOOK_URL);
        const data = await response.json();
        document.getElementById('data-display').innerText = 
            `Active Inquiries: ${data.length}`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchGuestData();

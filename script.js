// Replace with your actual Google Sheet Webhook URL
const WEBHOOK_URL = 'YOUR_GOOGLE_SHEET_WEBHOOK_URL';
const CONFIRMATION_WEBHOOK = 'YOUR_ZAPIER_OR_MAKE_WEBHOOK_URL';

async function fetchGuestData() {
    try {
        const response = await fetch(WEBHOOK_URL);
        const data = await response.json();
        const display = document.getElementById('data-display');
        
        display.innerHTML = `<p>Active Inquiries: ${data.length}</p>`;
        
        // Example: Adding an action button for each inquiry
        data.forEach(guest => {
            display.innerHTML += `
                <div class="guest-card">
                    <p>Guest: ${guest.name}</p>
                    <button class="action-btn" onclick="sendGuestConfirmation('${guest.email}')">
                        Send Confirmation
                    </button>
                </div>
            `;
        });
    } catch (error) {
        document.getElementById('data-display').innerText = 'Unable to load data.';
    }
}

async function sendGuestConfirmation(guestEmail) {
    try {
        const response = await fetch(CONFIRMATION_WEBHOOK, {
            method: 'POST',
            body: JSON.stringify({ email: guestEmail, action: 'send_confirmation' }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) alert('Confirmation sent successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchGuestData();

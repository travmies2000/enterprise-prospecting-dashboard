const WEBHOOK_URL = 'YOUR_GOOGLE_SHEET_WEBHOOK_URL';
let allInquiries = [];

async function initDashboard() {
    try {
        const response = await fetch(WEBHOOK_URL);
        allInquiries = await response.json();
        
        // Calculate Total Pipeline Value
        const total = allInquiries.reduce((acc, guest) => acc + (guest.value || 0), 0);
        document.getElementById('summary-display').innerHTML = `
            <div class="stat-card">
                <p style="margin:0; font-size:0.8rem">Pipeline Value</p>
                <h2 style="margin:0">$${total.toLocaleString()}</h2>
            </div>
        `;
        renderList(allInquiries);
        fetchAutomationLogs();
    } catch (e) { console.error(e); }
}

async function fetchAutomationLogs() {
    const logsDisplay = document.getElementById('logs-display');
    const mockLogs = [{status: true, message: 'Sync Successful'}, {status: false, message: 'Email Retried'}];
    logsDisplay.innerHTML = mockLogs.map(log => `
        <div class="log-item">
            ${log.status ? '🟢' : '⚠️'} ${log.message}
        </div>
    `).join('');
}

function renderList(data) {
    document.getElementById('data-display').innerHTML = data.map(g => `
        <div style="padding:16px; border-bottom:1px solid #333;">${g.name} - ${g.status}</div>
    `).join('');
}

function filterData() { /* ... as defined in previous steps ... */ }

initDashboard();

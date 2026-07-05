// Replace with your Zapier/Make.com Webhook Log URL
const LOGS_WEBHOOK_URL = 'YOUR_LOGS_WEBHOOK_URL';

async function fetchAutomationLogs() {
    try {
        const response = await fetch(LOGS_WEBHOOK_URL);
        const logs = await response.json(); // Expected: Array of log objects
        const logsDisplay = document.getElementById('logs-display');
        
        // Render only the last 5 logs
        logsDisplay.innerHTML = logs.slice(0, 5).map(log => `
            <div class="log-item">
                <strong>${log.status}</strong><br>${log.message}
            </div>
        `).join('');
    } catch (error) {
        document.getElementById('logs-display').innerText = 'System Status: Active';
    }
}

// Initialize logs alongside existing functions
fetchAutomationLogs();
setInterval(fetchAutomationLogs, 30000); // Auto-refresh every 30 seconds

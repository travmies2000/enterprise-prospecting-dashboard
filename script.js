let allInquiries = []; // Global store

async function initDashboard() {
    const response = await fetch('YOUR_GOOGLE_SHEET_WEBHOOK_URL');
    allInquiries = await response.json(); 
    renderList(allInquiries);
}

function renderList(data) {
    const display = document.getElementById('data-display');
    display.innerHTML = data.map(guest => `
        <div class="guest-card">
            <p>${guest.name} - <strong>${guest.status}</strong></p>
        </div>
    `).join('');
}

function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusTerm = document.getElementById('statusFilter').value;

    const filtered = allInquiries.filter(guest => {
        const matchesSearch = guest.name.toLowerCase().includes(searchTerm);
        const matchesStatus = statusTerm === 'All' || guest.status === statusTerm;
        return matchesSearch && matchesStatus;
    });

    renderList(filtered);
}

initDashboard();

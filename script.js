let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === demoCredentials.admin.username && password === demoCredentials.admin.password) {
        currentUser = { type: 'admin', name: demoCredentials.admin.name };
        showAdminDashboard();
    } else if (username === demoCredentials.user.username && password === demoCredentials.user.password) {
        currentUser = { type: 'user', id: demoCredentials.user.id, name: demoCredentials.user.name };
        showUserDashboard();
    } else {
        alert('Invalid credentials. Try the demo ones below the form.');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('userDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function showUserDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('userDashboard').classList.remove('hidden');
    document.getElementById('userDisplayName').textContent = currentUser.name;
    loadUserComplaints();
}

function showAdminDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    loadAdminComplaints();
    loadUsers();
}

function loadUserComplaints() {
    const list = demoComplaints.filter(function(item) {
        return item.userId === currentUser.id;
    });
    renderComplaints(list, 'userComplaintsList');
}

function loadAdminComplaints() {
    renderComplaints(demoComplaints, 'adminComplaintsList');
}

function renderComplaints(list, targetId) {
    const container = document.getElementById(targetId);
    if (list.length === 0) {
        container.innerHTML = '<div class="card"><p>No complaints to show yet.</p></div>';
        return;
    }

    let html = '';
    for (let i = 0; i < list.length; i++) {
        const complaint = list[i];
        html += `
            <div class="card">
                <div class="card-header">
                    <div class="complaint-id">${complaint.id}</div>
                    <span class="status-badge status-${complaint.status}">${complaint.status.toUpperCase()}</span>
                </div>
                <div class="complaint-details">
                    <div class="detail-row">
                        <span class="detail-label">Title:</span>
                        <span>${complaint.title}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Category:</span>
                        <span>${complaint.category}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date:</span>
                        <span>${complaint.date}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Description:</span>
                        <span>${complaint.description}</span>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    let rows = '';
    for (let i = 0; i < demoUsers.length; i++) {
        const user = demoUsers[i];
        rows += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.complaints}</td>
                <td>${user.joined}</td>
            </tr>
        `;
    }
    tbody.innerHTML = rows;
}
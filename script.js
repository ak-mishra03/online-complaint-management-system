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
        alert('Invalid credentials. Please use the demo ones shown on the screen.');
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

    switchUserTab('myComplaints');
    loadUserComplaints();
}

function switchUserTab(tab) {
    const tabs = document.querySelectorAll('#userDashboard .tab');
    tabs.forEach(function(btn) {
        btn.classList.remove('active');
    });

    if (tab === 'myComplaints') {
        tabs[0].classList.add('active');
        document.getElementById('myComplaints').classList.remove('hidden');
        document.getElementById('newComplaint').classList.add('hidden');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('myComplaints').classList.add('hidden');
        document.getElementById('newComplaint').classList.remove('hidden');
    }
}

function loadUserComplaints() {
    const list = demoComplaints.filter(function(item) {
        return item.userId === currentUser.id;
    });

    const container = document.getElementById('userComplaintsList');
    if (list.length === 0) {
        container.innerHTML = '<div class="card"><p>No complaints submitted yet.</p></div>';
        return;
    }

    let html = '';
    for (let i = 0; i < list.length; i++) {
        const c = list[i];
        html += `
            <div class="card">
                <div class="card-header">
                    <div class="complaint-id">${c.id}</div>
                    <span class="status-badge status-${c.status}">${c.status.toUpperCase()}</span>
                </div>
                <div class="complaint-details">
                    <div class="detail-row"><span class="detail-label">Title:</span><span>${c.title}</span></div>
                    <div class="detail-row"><span class="detail-label">Category:</span><span>${c.category}</span></div>
                    <div class="detail-row"><span class="detail-label">Date:</span><span>${c.date}</span></div>
                    <div class="detail-row"><span class="detail-label">Description:</span><span>${c.description}</span></div>
                    ${c.response ? `<div class="detail-row"><span class="detail-label">Response:</span><span>${c.response}</span></div>` : ''}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function submitComplaint() {
    const title = document.getElementById('complaintTitle').value.trim();
    const category = document.getElementById('complaintCategory').value;
    const description = document.getElementById('complaintDescription').value.trim();

    if (!title || !description) {
        alert('Please fill in the title and description.');
        return;
    }

    const newComplaint = {
        id: 'CMP' + (demoComplaints.length + 1).toString().padStart(3, '0'),
        userId: currentUser.id,
        title: title,
        category: category,
        description: description,
        status: 'accepted',
        date: new Date().toISOString().split('T')[0],
        images: [],
        response: ''
    };

    demoComplaints.push(newComplaint);

    const user = demoUsers.find(function(u) { return u.id === currentUser.id; });
    if (user) {
        user.complaints += 1;
    }

    alert('Complaint submitted! Your ID is ' + newComplaint.id);

    document.getElementById('complaintTitle').value = '';
    document.getElementById('complaintDescription').value = '';
    document.getElementById('complaintCategory').value = 'Infrastructure';

    loadUserComplaints();
    switchUserTab('myComplaints');
}

function showAdminDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');

    loadAdminStats();
    loadAdminComplaints();
    loadUsers();
}

function switchAdminTab(tab) {
    const tabs = document.querySelectorAll('#adminDashboard .tab');
    tabs.forEach(function(btn) {
        btn.classList.remove('active');
    });

    if (tab === 'complaints') {
        tabs[0].classList.add('active');
        document.getElementById('complaintsTab').classList.remove('hidden');
        document.getElementById('usersTab').classList.add('hidden');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('complaintsTab').classList.add('hidden');
        document.getElementById('usersTab').classList.remove('hidden');
    }
}

function loadAdminStats() {
    document.getElementById('totalComplaints').textContent = demoComplaints.length;
    document.getElementById('acceptedCount').textContent = demoComplaints.filter(function(c) { return c.status === 'accepted'; }).length;
    document.getElementById('processingCount').textContent = demoComplaints.filter(function(c) { return c.status === 'processing'; }).length;
    document.getElementById('completedCount').textContent = demoComplaints.filter(function(c) { return c.status === 'completed'; }).length;
}

function loadAdminComplaints() {
    const container = document.getElementById('adminComplaintsList');
    if (demoComplaints.length === 0) {
        container.innerHTML = '<div class="card"><p>No complaints have been filed yet.</p></div>';
        return;
    }

    let html = '';
    for (let i = 0; i < demoComplaints.length; i++) {
        const c = demoComplaints[i];
        const user = demoUsers.find(function(u) { return u.id === c.userId; });

        html += `
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="complaint-id">${c.id}</div>
                        <small style="color: #666;">User: ${user ? user.name : 'Unknown'}</small>
                    </div>
                    <span class="status-badge status-${c.status}">${c.status.toUpperCase()}</span>
                </div>
                <div class="complaint-details">
                    <div class="detail-row"><span class="detail-label">Title:</span><span>${c.title}</span></div>
                    <div class="detail-row"><span class="detail-label">Category:</span><span>${c.category}</span></div>
                    <div class="detail-row"><span class="detail-label">Date:</span><span>${c.date}</span></div>
                    <div class="detail-row"><span class="detail-label">Description:</span><span>${c.description}</span></div>
                    ${c.response ? `<div class="detail-row"><span class="detail-label">Response:</span><span>${c.response}</span></div>` : ''}
                </div>
                <div class="actions">
                    <button class="btn btn-small" onclick="showUpdateAlert('${c.id}')">Update Status</button>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function showUpdateAlert(id) {
    alert('Status updates will be edited directly for complaint ' + id + ' in the next step.');
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
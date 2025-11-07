// Application State
let currentUser = null;
// no modal or complex state needed

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === demoCredentials.admin.username && password === demoCredentials.admin.password) {
        currentUser = { 
            type: demoCredentials.admin.type, 
            name: demoCredentials.admin.name 
        };
        showAdminDashboard();
    } else if (username === demoCredentials.user.username && password === demoCredentials.user.password) {
        currentUser = { 
            type: demoCredentials.user.type, 
            id: demoCredentials.user.id, 
            name: demoCredentials.user.name 
        };
        showUserDashboard();
    } else {
        alert('Invalid credentials. Please use demo credentials.');
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

// User Dashboard Functions
function showUserDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('userDashboard').classList.remove('hidden');
    document.getElementById('userDisplayName').textContent = currentUser.name;
    loadUserComplaints();
}

function switchUserTab(tab) {
    const tabs = document.querySelectorAll('#userDashboard .tab');
    tabs.forEach(t => t.classList.remove('active'));
    
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
    const userComplaints = demoComplaints.filter(function(c) { return c.userId === currentUser.id; });
    const container = document.getElementById('userComplaintsList');
    if (userComplaints.length === 0) {
        container.innerHTML = '<div class="card"><p>No complaints submitted yet.</p></div>';
        return;
    }
    var html = '';
    for (var i = 0; i < userComplaints.length; i++) {
        var c = userComplaints[i];
        html += '<div class="card">' +
            '<div class="card-header">' +
                '<div class="complaint-id">' + c.id + '</div>' +
                '<span class="status-badge status-' + c.status + '">' + c.status.toUpperCase() + '</span>' +
            '</div>' +
            '<div class="complaint-details">' +
                '<div class="detail-row"><span class="detail-label">Title:</span><span>' + c.title + '</span></div>' +
                '<div class="detail-row"><span class="detail-label">Category:</span><span>' + c.category + '</span></div>' +
                '<div class="detail-row"><span class="detail-label">Date:</span><span>' + c.date + '</span></div>' +
                '<div class="detail-row"><span class="detail-label">Description:</span><span>' + c.description + '</span></div>' +
                (c.response ? '<div class="detail-row"><span class="detail-label">Response:</span><span>' + c.response + '</span></div>' : '') +
            '</div>' +
        '</div>';
    }
    container.innerHTML = html;
}

function submitComplaint() {
    const title = document.getElementById('complaintTitle').value;
    const category = document.getElementById('complaintCategory').value;
    const description = document.getElementById('complaintDescription').value;

    if (!title || !description) {
        alert('Please fill in all required fields');
        return;
    }

    // Create new complaint
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

    // Add to complaints array
    demoComplaints.push(newComplaint);

    // Update user's complaint count
    const user = demoUsers.find(u => u.id === currentUser.id);
    if (user) {
        user.complaints++;
    }

    alert('Complaint submitted successfully! Your complaint ID is ' + newComplaint.id);
    
    // Reset form
    document.getElementById('complaintTitle').value = '';
    document.getElementById('complaintDescription').value = '';
    document.getElementById('complaintCategory').value = 'Infrastructure';
    
    // Reload complaints list
    loadUserComplaints();
    
    // Switch to My Complaints tab
    document.getElementById('myComplaints').classList.remove('hidden');
    document.getElementById('newComplaint').classList.add('hidden');
    document.querySelectorAll('#userDashboard .tab')[0].classList.add('active');
    document.querySelectorAll('#userDashboard .tab')[1].classList.remove('active');
}

// Admin Dashboard Functions
function showAdminDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    loadAdminStats();
    loadAdminComplaints();
    loadUsers();
}

function switchAdminTab(tab) {
    const tabs = document.querySelectorAll('#adminDashboard .tab');
    tabs.forEach(t => t.classList.remove('active'));

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
    document.getElementById('acceptedCount').textContent = demoComplaints.filter(c => c.status === 'accepted').length;
    document.getElementById('processingCount').textContent = demoComplaints.filter(c => c.status === 'processing').length;
    document.getElementById('completedCount').textContent = demoComplaints.filter(c => c.status === 'completed').length;
}

function loadAdminComplaints() {
    const container = document.getElementById('adminComplaintsList');
    var html = '';
    for (var i = 0; i < demoComplaints.length; i++) {
        var c = demoComplaints[i];
        var user = null;
        for (var j = 0; j < demoUsers.length; j++) { if (demoUsers[j].id === c.userId) { user = demoUsers[j]; break; } }
        html += '<div class="card">' +
            '<div class="card-header">' +
                '<div>' +
                    '<div class="complaint-id">' + c.id + '</div>' +
                    '<small style="color: #666;">User: ' + (user ? user.name : 'Unknown') + '</small>' +
                '</div>' +
                '<span class="status-badge status-' + c.status + '">' + c.status.toUpperCase() + '</span>' +
            '</div>' +
            '<div class="complaint-details">' +
                '<div class="detail-row"><span class="detail-label">Title:</span><span>' + c.title + '</span></div>' +
                '<div class="detail-row"><span class="detail-label">Category:</span><span>' + c.category + '</span></div>' +
                '<div class="detail-row"><span class="detail-label">Date:</span><span>' + c.date + '</span></div>' +
                '<div class="detail-row"><span class="detail-label">Description:</span><span>' + c.description + '</span></div>' +
                (c.response ? '<div class="detail-row"><span class="detail-label">Response:</span><span>' + c.response + '</span></div>' : '') +
            '</div>' +
            '<div class="actions">' +
                '<select id="status-' + c.id + '">' +
                    '<option value="accepted"' + (c.status === 'accepted' ? ' selected' : '') + '>Accepted</option>' +
                    '<option value="processing"' + (c.status === 'processing' ? ' selected' : '') + '>Processing</option>' +
                    '<option value="completed"' + (c.status === 'completed' ? ' selected' : '') + '>Completed</option>' +
                '</select>' +
                '<input type="text" id="resp-' + c.id + '" placeholder="Response/Notes" value="' + (c.response || '') + '" />' +
                '<button class="btn btn-small" onclick="updateStatus(\'' + c.id + '\')">Save</button>' +
            '</div>' +
        '</div>';
    }
    container.innerHTML = html;
}

function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = demoUsers.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.complaints}</td>
            <td>${user.joined}</td>
        </tr>
    `).join('');
}

function updateStatus(complaintId) {
    var statusEl = document.getElementById('status-' + complaintId);
    var respEl = document.getElementById('resp-' + complaintId);
    var newStatus = statusEl ? statusEl.value : 'accepted';
    var response = respEl ? respEl.value : '';
    for (var i = 0; i < demoComplaints.length; i++) {
        if (demoComplaints[i].id === complaintId) {
            demoComplaints[i].status = newStatus;
            demoComplaints[i].response = response;
            break;
        }
    }
    alert('Status updated successfully!');
    loadAdminStats();
    loadAdminComplaints();
}
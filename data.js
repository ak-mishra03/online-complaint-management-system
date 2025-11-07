// Sample data kept in JavaScript for the frontend demo.
// Matches the seed data defined in `database.sql` so the UI and MySQL stay in sync.

// Demo Complaints Data
const demoComplaints = [
    {
        id: 'CMP001',
        userId: 'user123',
        title: 'Broken Street Light',
        category: 'Infrastructure',
        description: 'The street light on Main Street has been non-functional for the past week, causing safety concerns during night time.',
        status: 'processing',
        date: '2024-11-01',
        images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'],
        response: 'Maintenance team has been assigned. Expected resolution: 3 days.'
    },
    {
        id: 'CMP002',
        userId: 'user123',
        title: 'Water Supply Issue',
        category: 'Service',
        description: 'No water supply in Block A for the past 2 days. Residents are facing severe inconvenience.',
        status: 'accepted',
        date: '2024-11-03',
        images: [],
        response: ''
    },
    {
        id: 'CMP003',
        userId: 'user456',
        title: 'Garbage Collection Delay',
        category: 'Service',
        description: 'Garbage has not been collected for 4 days in Sector 5. The area is becoming unhygienic.',
        status: 'completed',
        date: '2024-10-28',
        images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=200'],
        response: 'Resolved. Additional collection scheduled and completed on Nov 2.'
    },
    {
        id: 'CMP004',
        userId: 'user789',
        title: 'Parking Space Misuse',
        category: 'Facilities',
        description: 'Designated parking spaces are being occupied by unauthorized vehicles.',
        status: 'processing',
        date: '2024-11-02',
        images: [],
        response: 'Security has been notified. Monitoring in progress.'
    },
    {
        id: 'CMP005',
        userId: 'user456',
        title: 'Damaged Road Surface',
        category: 'Infrastructure',
        description: 'Large potholes on Oak Avenue near the intersection. Risk of vehicle damage.',
        status: 'accepted',
        date: '2024-11-04',
        images: [],
        response: ''
    },
    {
        id: 'CMP006',
        userId: 'user101',
        title: 'Noise Complaint',
        category: 'Other',
        description: 'Excessive noise from construction site during late hours (after 10 PM).',
        status: 'processing',
        date: '2024-11-05',
        images: [],
        response: 'Investigating the matter with construction management.'
    }
];

// Demo Users Data
const demoUsers = [
    { id: 'user123', name: 'John Doe', email: 'john@example.com', complaints: 2, joined: '2024-01-15' },
    { id: 'user456', name: 'Jane Smith', email: 'jane@example.com', complaints: 2, joined: '2024-02-20' },
    { id: 'user789', name: 'Mike Johnson', email: 'mike@example.com', complaints: 1, joined: '2024-03-10' },
    { id: 'user101', name: 'Sarah Williams', email: 'sarah@example.com', complaints: 1, joined: '2024-04-05' },
    { id: 'user202', name: 'Robert Brown', email: 'robert@example.com', complaints: 0, joined: '2024-05-12' },
    { id: 'user303', name: 'Emily Davis', email: 'emily@example.com', complaints: 0, joined: '2024-06-18' }
];

// Demo Login Credentials
const demoCredentials = {
    admin: { username: 'admin', password: 'admin123', type: 'admin', name: 'Admin' },
    user: { username: 'user123', password: 'pass123', type: 'user', id: 'user123', name: 'John Doe' }
};
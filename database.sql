-- Run these statements in a MySQL database of your choice.
-- Example: create a database named `cms_demo` and execute this script.

-- DROP DATABASE IF EXISTS cms_demo;
-- CREATE DATABASE cms_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE cms_demo;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    joined DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    title VARCHAR(150) NOT NULL,
    category ENUM('Infrastructure', 'Service', 'Facilities', 'Staff Behavior', 'Other') NOT NULL,
    description TEXT NOT NULL,
    status ENUM('accepted', 'processing', 'completed') NOT NULL DEFAULT 'accepted',
    admin_response TEXT,
    created_at DATE NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (id, name, email, password, role, joined) VALUES
    ('admin', 'System Admin', 'admin@example.com', 'admin123', 'admin', '2023-12-01'),
    ('user123', 'John Doe', 'john@example.com', 'pass123', 'user', '2024-01-15'),
    ('user456', 'Jane Smith', 'jane@example.com', 'pass456', 'user', '2024-02-20'),
    ('user789', 'Mike Johnson', 'mike@example.com', 'pass789', 'user', '2024-03-10'),
    ('user101', 'Sarah Williams', 'sarah@example.com', 'pass101', 'user', '2024-04-05'),
    ('user202', 'Robert Brown', 'robert@example.com', 'pass202', 'user', '2024-05-12'),
    ('user303', 'Emily Davis', 'emily@example.com', 'pass303', 'user', '2024-06-18');

INSERT INTO complaints (id, user_id, title, category, description, status, admin_response, created_at) VALUES
    ('CMP001', 'user123', 'Broken Street Light', 'Infrastructure', 'Street light on Main Street has been off for a week.', 'processing', 'Maintenance team assigned. ETA 3 days.', '2024-11-01'),
    ('CMP002', 'user123', 'Water Supply Issue', 'Service', 'No water in Block A for 2 days.', 'accepted', NULL, '2024-11-03'),
    ('CMP003', 'user456', 'Garbage Collection Delay', 'Service', 'Garbage not collected for 4 days in Sector 5.', 'completed', 'Resolved on Nov 2 with extra pickup.', '2024-10-28'),
    ('CMP004', 'user789', 'Parking Space Misuse', 'Facilities', 'Unauthorized cars in designated slots.', 'processing', 'Security notified and monitoring.', '2024-11-02'),
    ('CMP005', 'user456', 'Damaged Road Surface', 'Infrastructure', 'Large potholes on Oak Avenue near the intersection.', 'accepted', NULL, '2024-11-04'),
    ('CMP006', 'user101', 'Noise Complaint', 'Other', 'Construction noise after 10 PM.', 'processing', 'Investigating with contractor.', '2024-11-05');

-- To verify:
-- SELECT * FROM users;
-- SELECT * FROM complaints;
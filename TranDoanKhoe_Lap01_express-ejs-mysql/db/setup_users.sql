-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users (password is 'admin123' for admin, '123' for user)
-- Note: In production, use proper password hashing!
INSERT INTO users (username, password, email) VALUES 
('admin', 'admin123', 'admin@example.com'),
('user', '123', 'user@example.com');

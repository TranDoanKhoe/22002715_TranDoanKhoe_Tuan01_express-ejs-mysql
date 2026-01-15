const express = require('express');
const router = express.Router();
const db = require('../db/mysql');

// Show login page
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Handle login
router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.query(
            'SELECT * FROM users WHERE username = ? AND password = ?', [username, password]
        );

        if (users.length > 0) {
            // Login successful
            req.session.user = {
                id: users[0].id,
                username: users[0].username,
                email: users[0].email
            };
            res.redirect('/');
        } else {
            // Login failed
            res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
        }
    } catch (error) {
        console.error(error);
        res.render('login', { error: 'Đã xảy ra lỗi. Vui lòng thử lại!' });
    }
});

// Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

// Show register page
router.get('/register', (req, res) => {
    res.render('register', { error: null, success: null });
});

// Handle register
router.post('/register', async(req, res) => {
    const { username, password, email } = req.body;

    try {
        await db.query(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email]
        );
        res.render('register', {
            error: null,
            success: 'Đăng ký thành công! Bạn có thể đăng nhập ngay.'
        });
    } catch (error) {
        console.error(error);
        let errorMsg = 'Đã xảy ra lỗi. Vui lòng thử lại!';
        if (error.code === 'ER_DUP_ENTRY') {
            errorMsg = 'Tên đăng nhập đã tồn tại!';
        }
        res.render('register', { error: errorMsg, success: null });
    }
});

module.exports = router;
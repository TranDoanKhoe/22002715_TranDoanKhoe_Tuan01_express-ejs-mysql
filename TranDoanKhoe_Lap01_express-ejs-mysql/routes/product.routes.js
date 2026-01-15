const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const { isAuthenticated } = require('../middleware/auth');

// Home - Protected route
router.get('/', isAuthenticated, async(req, res) => {
    const [rows] = await db.query('SELECT * FROM products');
    res.render('products', {
        products: rows,
        editProduct: undefined,
        keyword: undefined,
        user: req.session.user
    });
});

// Search products - Protected route
router.get('/search', isAuthenticated, async(req, res) => {
    const { keyword } = req.query;
    const [rows] = await db.query(
        'SELECT * FROM products WHERE name LIKE ?', [`%${keyword}%`]
    );
    res.render('products', {
        products: rows,
        editProduct: undefined,
        keyword: keyword,
        user: req.session.user
    });
});

// Add product - Protected route
router.post('/add', isAuthenticated, async(req, res) => {
    const { name, price, quantity } = req.body;
    await db.query(
        'INSERT INTO products(name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity]
    );
    res.redirect('/');
});

// Delete product - Protected route
router.post('/delete/:id', isAuthenticated, async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.redirect('/');
});

// Edit product (show edit form) - Protected route
router.get('/edit/:id', isAuthenticated, async(req, res) => {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    const [allProducts] = await db.query('SELECT * FROM products');
    res.render('products', {
        products: allProducts,
        editProduct: rows[0],
        keyword: undefined,
        user: req.session.user
    });
});

// Update product - Protected route
router.post('/update/:id', isAuthenticated, async(req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    await db.query(
        'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?', [name, price, quantity, id]
    );
    res.redirect('/');
});

module.exports = router;
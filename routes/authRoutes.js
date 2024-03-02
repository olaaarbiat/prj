const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// تحديد مسارات المصادقة
router.post('/login', authController.login);
router.post('/register', authController.register); // إضافة مسار لتسجيل المستخدمين

module.exports = router;

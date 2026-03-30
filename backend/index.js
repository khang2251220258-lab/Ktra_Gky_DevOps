const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Trỏ ra file .env

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const DB_PORT = Number(process.env.DB_PORT || 3306);

// === 1. KẾT NỐI DATABASE MYSQL ===
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
        logging: false // Tắt log câu lệnh SQL cho đỡ rối terminal
    }
);

// === 2. ĐỊNH NGHĨA BẢNG DỮ LIỆU ===
// Sequelize sẽ tự động tạo bảng 'Users' trong MySQL Workbench
const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    studentId: { type: DataTypes.STRING, allowNull: false }
});

// Đồng bộ database
sequelize.sync()
    .then(() => console.log('MySQL Database connected and Tables synced!'))
    .catch(err => console.error('Database connection error:', err));

// === 3. CÁC ROUTES API ===

// Yêu cầu 3.2: Health Check
app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

// Yêu cầu 1: API GET - Lấy danh sách user
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Yêu cầu 1: API POST - Thêm user mới
app.post('/api/users', async (req, res) => {
    try {
        const name = String(req.body?.name || '').trim();
        const studentId = String(req.body?.studentId || '').trim();

        if (!name || !studentId) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ họ tên và mã số sinh viên.' });
        }

        const newUser = await User.create({ name, studentId });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Không thể thêm sinh viên vào cơ sở dữ liệu.' });
    }
});

// === 4. KHỞI ĐỘNG SERVER ===
app.listen(PORT, () => {
    console.log(`[${process.env.APP_NAME}] is running on port ${PORT}`);
});
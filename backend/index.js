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
    studentId: { type: DataTypes.STRING, allowNull: false },
    className: { type: DataTypes.STRING, allowNull: false }
});

// Đồng bộ database
sequelize.sync({ alter: true })
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

// API GET - Lấy thông tin chi tiết 1 sinh viên
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API DELETE - Xóa sinh viên theo id
app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên để xóa.' });
        }

        await user.destroy();
        res.json({ message: 'Xóa sinh viên thành công.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Không thể xóa sinh viên.' });
    }
});

// Yêu cầu 1: API POST - Thêm user mới
app.post('/api/users', async (req, res) => {
    try {
        const name = String(req.body?.name || '').trim();
        const studentId = String(req.body?.studentId || '').trim();
        const className = String(req.body?.className || '').trim();

        if (!name || !studentId || !className) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ họ tên, mã số sinh viên và lớp.' });
        }

        const newUser = await User.create({
            name,
            studentId,
            className
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Không thể thêm sinh viên vào cơ sở dữ liệu.' });
    }
});

// === 4. KHỞI ĐỘNG SERVER ===
app.listen(PORT, () => {
    console.log(`[${process.env.APP_NAME}] is running on port ${PORT}`);
});
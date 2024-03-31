const Admin = require('../Models/Admin');
const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');
const User = require('../Models/User');
const ServiceSender = require('../Models/serviceSender');
const mysql = require('mysql2');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: admin._id });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sm@838500',
    database: 'pro'
});

exports.loginUser = async (req, res) => {
    const { username, password, role } = req.body;
    
    try {
        connection.connect();
        
        let query;
        if (role === 'user') {
            query = `SELECT * FROM users WHERE email = '${username}'`;
        } else if (role === 'service_center') {
            query = `SELECT * FROM servicesenders WHERE email = '${username}'`;
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        connection.query(query, async (error, results, fields) => {
            if (error) {
                throw error;
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const user = results[0];

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            if (role === 'service_center' && !user.approved) {
                return res.status(401).json({ message: 'Service center not approved' });
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
            
            res.status(200).json({ token, role: user.role, user: user.id, details: user });

            connection.end();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const Admin = require('../Models/Admin');
const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');
const User = require('../Models/User');
const ServiceSender = require('../Models/serviceSender');

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


exports.loginUser = async (req, res) => {
    const { username, password, role } = req.body;
    console.log(username)

    try {
        let user;
        if (role === 'user') {
            user = await User.findOne( { raw: true, where:  {email: username } });
        } else if (role === 'service_center') {
            user = await ServiceSender.findOne({ raw: true, where:  {email : username } });
            console.log(user)
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (role === 'service_center' && !user.approved) {
            return res.status(401).json({ message: 'Service center not approved' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role });
        console.log(user.id)
        
        res.status(200).json({ token, role: user.role, user: user.id, details: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

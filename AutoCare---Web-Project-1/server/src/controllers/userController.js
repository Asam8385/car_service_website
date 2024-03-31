const User = require('../Models/User');
const bcrypt = require('../utils/bcrypt');

exports.signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;


        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password);

        const newUser = await User.create({ username, email, password: hashedPassword, role });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

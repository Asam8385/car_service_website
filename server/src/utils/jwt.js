const jwt = require('jsonwebtoken');


exports.sign = (payload) => {
   
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};


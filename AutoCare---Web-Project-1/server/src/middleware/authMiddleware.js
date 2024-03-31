const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const  authMiddleware = (req, res, next) => {

    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
     
        req.adminId = decoded.adminId;
       // console.log(req.adminId)
        next();
    });
};

module.exports = authMiddleware;

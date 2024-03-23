const bcrypt = require('bcrypt');

exports.hash = async (password) => {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
};

exports.compare = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

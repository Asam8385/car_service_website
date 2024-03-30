const bcrypt = require('bcrypt');


bcrypt.hash("admin1234", 12).then(function(hash) {
    console.log(hash)
});
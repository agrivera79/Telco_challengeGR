const helpers = {};
const bcrypt = require('bcryptjs');

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedpassword) => {
    try {
        return await bcrypt.compare(password, savedpassword);
    }catch(e){
        console.log(e);
    }
};

module.exports = helpers;
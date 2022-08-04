require("dotenv").config();

const config = {
    port : process.env.PORT,
    salt : process.env.SALT,
    secretKey : process.env.SECRET_KEY
};

module.exports = config;
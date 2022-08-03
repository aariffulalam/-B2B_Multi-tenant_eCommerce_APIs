require("dotenv").config();

const config = {
    port : process.env.PORT,
    salt : process.env.SALT
};

module.exports = config;
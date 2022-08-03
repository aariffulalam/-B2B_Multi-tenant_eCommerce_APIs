const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require('bcrypt')
const config = require('../config/config')



const CreateUser = async (req, res)=>{
    const salt = Number(config.salt)
    console.log("created user.")
    const {name, mobileNumber, email, password, role} = req.body;
    const hasedPassword = await bcrypt.hash(password, salt);
    try {
        const user = await prisma.user.create({
            data:{
                name,
                mobileNumber,
                email,
                password : hasedPassword,
                profilePhoto : "",
                role: role === "ADMIN" ? "ADMIN" : "USER",
            }
        })
        res.status(200).json({title:"success", message:"user created successfully", data:user})
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error occure", error})
    }
}

module.exports = {CreateUser}
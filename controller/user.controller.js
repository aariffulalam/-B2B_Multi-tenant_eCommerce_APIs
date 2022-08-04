const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require('bcrypt')
const config = require('../config/config');

const {generateToken} = require('../middleware/auth');

const SignUp = async (req, res)=>{
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

const Login = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        // console.log(user)
        if (!user){
            return res.status(400).json({title:"Error", message:"user not exist"})
        }
        const match = await bcrypt.compare(password, user.password);
        console.log(match)
        if (!match){
            return res.status(400).json({title:"Error", message:"wrong password"})
        }
        const token =  await generateToken(user.id, user.name, user.email);
        res.status(200).json({title:"success", message:"User logedin successfully", token})
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error});
    }
}

const ViewProfile = async (req, res)=>{
    const {id} = req.body;
    try {
        if (req.userValues.id != id){
            return res.status(400).json({title:"Error", message:"user is not logedIn"})
        }
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        res.status(200).json({title : "success", data:{
            id : user.id,
            name : user.name,
            mobileNumber :  user.mobileNumber,
            email : user.email,
            profilePhoto : user.profilePhoto,
            role : user.role

        }})
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})        
    }
}

const UpdateUser  = async (req, res)=>{
    const data = req.body;
    console.log(data)
    try {
        if (req.userValues.id != data.id){
            return res.status(400).json({title:"Error", message:"user is not logedIn"})
        }
        console.log("i am working.")
        const user = await prisma.user.findUnique({
            where : {
                id : data.id
            }
        })
        console.log(user)
        const updateUser = await prisma.user.update({
            where: {
                id : data.id
            },
            data:{
                name : data.name ? data.name : user.name,
                profilePhoto : data.profilePhoto ? data.profilePhoto : user.profilePhoto,
            }
        }) 
        res.status(200).json({title:"success", message: "user updated successfully", data: UpdateUser})
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    }
}

const DeleteUser = async (req, res)=>{
    const data = req.body;
    try {
        if (req.userValues.id != data.id){
            return res.status(400).json({title:"Error", message:"user is not logedIn"})
        }
        const user = await prisma.user.delete({
            where: {
                id : data.id
            }
        })
        res.status(200).json({title:"success", message:"user deleted successfully", data: user})
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    }
}

module.exports = {SignUp, Login, ViewProfile, UpdateUser, DeleteUser}
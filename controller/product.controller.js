const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const CreateProduct = async(req, res)=>{
    const {name, color, size, type, userId} = req.body;
    try {
        // checking Admin or normal user
        const user = await prisma.user.findUnique({
            where : {
                id : userId
            }
        })
        if (user.role != "ADMIN"){
            return res.status(400).json({title:"Error", message:"Creater is not ADMIN", data:user})
        }
        const product = await prisma.product.create({
            data: {
                name,
                color,
                size,
                type
            }
        })
        res.status(200).json({title:"success",message:"product created successfully", data:product});
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error occured", error})        
    }
}

const GetProducts = async(req, res)=>{
    const products = await prisma.product.findMany();
    res.status(200).json({title:"success", message:"products", data:products})
};

module.exports = {CreateProduct, GetProducts}
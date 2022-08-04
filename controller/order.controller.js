const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const CreateOrder = async (req, res) =>{
    const {quantity, productId, userId} = req.body;
    try {
        if (req.userValues.id != userId){
            return res.status(400).json({title:"Error", message:"user is not logedIn", })
        }
        // console.log(req.body)
          
        const product = await prisma.product.findUnique({
            where : {
                id : productId
            }
        })
        if (!product){
            return res.status(400).json({title:"Error",message:"product is not exist", data:product});
        }
        else if(Number(product.inventory) - quantity  <= 0 ){
            return res.status(400).json({title:"Error", message:"not enough product are exist", data:product});
        }
        const order = await prisma.order.create({
            data:{
                quantity : String(quantity),
                price : String(quantity* Number(product.price)),
                productId,
                userId
            }
        })
        res.status(200).json({title:"success", message:"order completed", data: order});
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})        
    }
}

const GetOrders = async (req, res)=>{
    const {orderId, userId, date} = req.body;
    console.log(req.body)
    try {
        const adminId = req.userValues.id;
        console.log(adminId)
        const admin = await prisma.user.findUnique({
            where : {
                id : adminId
                
            }
        })
        console.log(admin)
        if( admin.role != "ADMIN"){
            return res.status(400).json({title:"Error", message: "user don't have permission"})
        }
        const order = await prisma.order.findFirst({
            where : {
                id : orderId,
                userId,
                createdAt : date
            }
        })
        res.status(200).json({title:"success", message:"order Details", data : order})
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    }
}

module.exports = {CreateOrder, GetOrders}
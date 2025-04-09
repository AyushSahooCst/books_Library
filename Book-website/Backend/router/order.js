 const router =require("express").Router();
 const {authenticationToken}= require("./userAuth");
 const Book = require("../models/book")
 const User=require("../models/user")
 const Order =require("../models/order")
 
 //place order
 router.post("/place-order", authenticationToken, async (req, res) => {
     try {
         const {id} = req.headers;
         const { order} = req.body;
         
 
         for (const orderData of order) {
            
             
             const newOrder = new Order ( {user: id, book:orderData._id });
             const orderDataFromDb = await newOrder.save()
            
             
             await User.findByIdAndUpdate(id, {
                $push: {orders: orderDataFromDb._id}
             })
 
             await User.findByIdAndUpdate(id,{
                 $pull:{cart: orderData._id},
             })
             
         }
         return res.json({
             status:"Success",
             message:"order placed successfully"
         })
         
     } catch (error) {
         console.log(error);
         
         return res.status(500).json({message: "An error occurred"})
         
     }
     
    
     
 });
 
 //get order history of particular user
 
 router.get("/get-order-history",authenticationToken,async (req,res)=>{
     try {
         const {id}= req.headers;
         const userData= await User.findById(id).populate({
             path:"orders",
             populate:{path:"book"},
         });
 
         const ordersData = userData.orders.reverse();
         return res.json({
             status:"success",
             data:ordersData
         });
         
     } catch (error) {
        return res.status(500).json({message:"An error occurred"})
     }
 })
 
 //get-all-orders ---admin
 
 router.get("/get-all-orders",authenticationToken ,async(req,res)=>{
     try {
         const userData = await Order.find()
         .populate({
             path:"book",
         })
         .populate({
             path:"user"
         })
         .sort({createdAt: -1});
         return res.json({
             status:"success",
 
             data:userData,
         })
         
     } catch (error) {
         res.status(500).json({message:"An error occurred"})
 
     }
 })
 
 
 router.put("/update-status/:id", authenticationToken,async(req,res)=>{
     
 
     try {
         const {id}=req.params;
         await Order.findByIdAndUpdate(id,{status:req.body.status});
         return res.json({
             status:"Success",
             message:"status updated successfully"
         })
         
     } catch (error) {
         res.status(500).json({message:"An error occurred"})
 
     }
 }
 )
 
 
 
 
 
 
 
 
 module.exports=router;
 
 
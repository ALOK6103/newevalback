const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../models/user.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
userRouter.post("/register",(req,res)=>{

    const {name,email,gender,password,age,city,is_married}=req.body
    try {
        bcrypt.hash(password,5,async function(err,hash){
            await UserModel.create({name,email,gender,password:hash,age,city,is_married})
            res.status(200).send({"msg":"User Created"})
        })
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    
    const {email,password}=req.body

    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                    var token=jwt.sign({userID:user._id},"secret")
                    res.status(200).send({token})
                }else{
                    res.status(400).send({"msg":"Unauthorised"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})


module.exports={
    userRouter
}
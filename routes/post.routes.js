const express=require("express")
const postRouter=express.Router()

const {PostModel}=require("../models/post.model")


postRouter.get("/",async(req,res)=>{

    try {
        const posts= await PostModel.find({userID:req.body.userID})
        res.status(200).send({posts})
    } catch (error) {
        res.status(400).send({"msg":error})
    }

})

postRouter.post("/add",async(req,res)=>{
    
    try {
        await PostModel.create(req.body)
        res.status(200).send({"msg":"Post created"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    
    const {id}=req.params

    try {
        await PostModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"post updated"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params

    try {
        await PostModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"post deleted"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

postRouter.get("/device",async(req,res)=>{
    const {device}=req.query

    const posts= await PostModel.find({userID:req.body.userID})

  let filtered=  posts.filter((el)=>{
      
    return el.device==device
  })

  res.status(200).send({filtered})

})

postRouter.get("/devices",async(req,res)=>{
    const {device1,device2}=req.query

    const posts= await PostModel.find({userID:req.body.userID})

  let filtered=  posts.filter((el)=>{
      
    return el.device==device1||device2
  })

  res.status(200).send({filtered})

})

module.exports={
    postRouter
}

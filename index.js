require("dotenv").config()
const express=require("express")

const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
const {isAuth}=require("./middleware/auth.middleware")

const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(isAuth)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
       await connection
       console.log("connected") 
    } catch (error) {
        console.log(error)
    }
})

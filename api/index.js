import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import booksRoute from "./routes/books.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app=express()
dotenv.config()

//mongodb connection
const connect = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('disconnected', err => {
    console.log(err);
  });

  app.get("/users",(req,res)=>{
    res.send("hi")
})

//middlewres
app.use(cors())  // used for connect backend and react
app.use(cookieParser())
app.use(express.json()) // used to send json data

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/books",booksRoute)

//error hndling
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "something went wrong"

   return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
   })
}
)

app.listen(8800, ()=>{
    connect()  //call mongodb when conneced to bckend
    console.log("connected to backend")
})

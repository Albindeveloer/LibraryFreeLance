import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";

export const register = async(req,res,next)=>{
    try{
        //to hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password:hash
        })

        //error conditions
        if(!req.body.username || !req.body.email || !req.body.password) return next(createError(404,"enter all required fields"))
        
        const user=await User.findOne({ $or: [ {username: req.body.username}, { email: req.body.email } ] });
        if(user) return next(createError(404,"user already exists"))

        await newUser.save();
        res.status(200).json("user has been created")

    }catch(err){
        next(err)
    }
}

export const login=async(req,res,next)=>{
    console.log(req.body.username,req.body.password)
    try{

        //if no name nd pwd
        if(!req.body.username || !req.body.password) return next(createError(404,"enter UserName and password"))

        const user= await User.findOne({username: req.body.username});
        console.log(user)
        if(!user) return next(createError(404,"user not found"))

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password );
        if(!isPasswordCorrect) return next(createError(400,"wrong password or username"))

        //generate to jwt token using id and isAdmin and store the token in cookie
        const token = jwt.sign({ id:user._id , role:user.role }, process.env.JWT);

        const {password,role,...otherDetails}=user._doc

        res.cookie("access_token",token,{
            httpOnly:true

        }).status(200).json({details:{...otherDetails},role})
    }catch(err){
        next(err)
    }

}

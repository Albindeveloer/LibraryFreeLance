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

        await newUser.save();
        res.status(200).json("user has been creted")

    }catch(err){
        next(err)
    }
}

export const login=async(req,res,next)=>{
    console.log(req.body.username,req.body.password)
    try{

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

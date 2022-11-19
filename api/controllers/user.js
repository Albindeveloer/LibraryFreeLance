import User from "../models/User.js"

export const getUsers=async(req,res,next)=>{
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 100
    page = parseInt(page)
    limit = parseInt(limit)
    try{
        const users=await User.find();
        res.status(200).json({data: users.slice((page - 1) * limit, page * limit),
            total: users.length
    });
    }catch(err){
        next(err)
    }
}

export const deleteUser=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted")
    }catch(err){

    }
}

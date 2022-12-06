import User from "../models/User.js"
import mongoose from "mongoose";
import Book from "../models/Book.js";

export const getUsers=async(req,res,next)=>{
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 100
    page = parseInt(page)
    limit = parseInt(limit)
    try{

        //limited data properties bcz of owedbooks have other API
        const users=await User.aggregate([
            {
                $match: { _id : {$ne: ""} },
                
            },
            {
                $project: {
                  username: 1,
                  email: 1,
                  role:1,
                },
              },
        ])
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

export const getOwedBooks= async(req,res,next)=>{
    var userid = mongoose.Types.ObjectId(req.params.userid);
    console.log(userid)
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    page = parseInt(page)
    limit = parseInt(limit)
    try{
        const owedBooks= await Book.aggregate([
            
            {
                $match:{"bookNumber.issue" : userid}
            },
           {
            $project:{
                author:0,
                genre:0,
                description:0,
                bookNumber:0
            }
           }
        ])
        
        

        res.status(200).json({data: owedBooks.slice((page - 1) * limit, page * limit),
            total: owedBooks.length                                                               // to get limited data
    })
    }
    
    catch(err){
        next(err)
    }
} 

export const getOwedSubBooks= async(req,res,next)=>{
    var userid = mongoose.Types.ObjectId(req.params.userid);
    var bookid = mongoose.Types.ObjectId(req.params.bookid);
    console.log(userid)
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    page = parseInt(page)
    limit = parseInt(limit)
    try{
        const owedBooks= await Book.aggregate([
            
            {
                $match:{
                    "_id":bookid,
                    "bookNumber.issue" : userid}
            },
           {                                                                          //filter booknumber to return only userid === issueid object
            '$set':{
                data:{
                    '$filter':{
                        input:'$bookNumber',
                        as:'item',
                        cond:{ '$eq': [ '$$item.issue',userid]}
                    }
                }
            }
           },
           {
            $project:{
                title:1,
                data:1
            }
           }
        ])
        
        

        res.status(200).json({data: owedBooks.slice((page - 1) * limit, page * limit),
            total: owedBooks.length                                                               // to get limited data
    })
    }
    
    catch(err){
        next(err)
    }
} 


//seaarch user by name
export const getSearchUser=async(req,res,next)=>{
    try{

        //limited data properties bcz of owedbooks have other API
        const users=await User.aggregate([
            {
                $match:{"username" : {$regex : req.body.name}}
                
            },
            {
                $project: {
                  username: 1,
                  email: 1,
                  role:1,
                },
              },
        ])
        res.status(200).json(users);
    }catch(err){
        next(err)
    }
}

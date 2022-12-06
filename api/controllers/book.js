import Auther from "../models/Auther.js"
import Book from "../models/Book.js"
import Genre from "../models/Genre.js"
import mongoose from "mongoose";
import User from "../models/User.js";
import { createError } from "../utils/error.js";


export const createBook = async(req,res,next)=>{
    const newBook = new Book(req.body)

    try{
        //error conditions
        if(!req.body.title || !req.body.language || !req.body.bookNumber[0].ISBN) return next(createError(404,"enter all required fields"))

        const savedBook = await newBook.save()
        res.status(200).json(savedBook)

    }catch(err){
        next(err)
    }
}

//create auther for enter that in book details, am ot create seprte route for auther and genre
export const createAuther =async(req,res,next)=>{
    const newAuther = new Auther(req.body);

    try{
        //error 
        if(!req.body.name) return next(createError(404,"enter required fields"));

        const savedAuther =await newAuther.save()
        res.status(200).json(savedAuther);

    }catch(err){
        next(err)
    }
}

export const getAuthers=async(req,res,next)=>{
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 100
    page = parseInt(page)
    limit = parseInt(limit)
    try{
        const authers= await Auther.find();
        res.status(200).json({data: authers.slice((page - 1) * limit, page * limit),
            total: authers.length
    })

    }catch(err){
        next(err)
    }
}

export const deleteAuther =async(req,res,next)=>{
    try{
        await Auther.findByIdAndDelete(req.params.id)
        res.status(200).json("auther deleted")
    }catch(err){
        next(err)
    }
}

export const createGenre =async(req,res,next)=>{
    const newGenre = new Genre(req.body);

    try{
        //error
        if(!req.body.name) return next(createError(404,"enter required fields"));

        const savedGenre =await newGenre.save()
        res.status(200).json(savedGenre);

    }catch(err){
        next(err)
    }
}

export const getGenres = async(req,res,next)=>{
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 100
    page = parseInt(page)
    limit = parseInt(limit)
    try{
        const genres = await Genre.find();
        res.status(200).json({data: genres.slice((page - 1) * limit, page * limit),
            total: genres.length
    })

    }catch(err){
        next(err)
    }
}

export const deleteGener =async(req,res,next)=>{
    try{
        await Genre.findByIdAndDelete(req.params.id)
        res.status(200).json("genre deleted")
    }catch(err){
        next(err)
    }
}

export const deleteBook = async(req,res,next)=>{
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("book deleted")
    }catch(err){
        next(err)
    }
}

export const updateBook= async(req,res,next)=>{
    try{
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true});

        res.status(200).json(updatedBook)
    }catch(err){
        next(err)
    }
}

export const addBook=async(req,res,next)=>{
    try{
        const subbook=await Book.updateOne({_id : req.params.id},{
            $push:{"bookNumber" : req.body}
        })
        res.status(200).json("subbook is added")
    }catch(err){
        next(err)
    }
}

export const deleteSubbook= async(req,res,next)=>{
    console.log("bookId is",req.params.bookid)
    console.log("subbookId is",req.params.subbookid)
    try{
       await Book.updateOne({_id:req.params.bookid},{
        $pull:{"bookNumber":{_id:req.params.subbookid}}
       })
       res.status(200).json("subbook deleted")
    }catch(err){
        next(err)
    }
}

export const getBooks = async(req,res,next)=>{
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    page = parseInt(page)
    limit = parseInt(limit)
    try{
        const books = await Book.aggregate([
            {
                $match:{}
            },
            {
                $lookup: {
                  from: "genres",
                  localField: "genre",
                  foreignField: "_id",
                  as: "genres",
                },
            },
            {
                $lookup: {
                  from: "authers",
                  localField: "author",
                  foreignField: "_id",
                  as: "authors",
                },
            },
            {
                $project: {
                  title: 1,
                  language: 1,
                  description:1,
                  featured:1,
                  genres:"$genres",
                  authors: "$authors",
                  bookNumber:1,
                },
              },

        ])
        res.status(200).json({data: books.slice((page - 1) * limit, page * limit),
            total: books.length                                                               // to get limited data
    })

    }catch(err){
        next(err)
    }
}

export const getBook= async(req,res,next)=>{
    try{
        const book= await Book.findById(req.params.id)
        res.status(200).json(book)
    }catch(err){
        next(err)
    }
}

export const getBookByField= async(req,res,next)=>{
    var id = mongoose.Types.ObjectId(req.params.id);   //string to objectId
    console.log("id is",id)
    try{
        const books = await Book.aggregate([
            {
                $match:{$or: [{ genre: id }, { author: id }, {_id:id}]}
            },
            {
                $lookup: {
                  from: "genres",
                  localField: "genre",
                  foreignField: "_id",
                  as: "genres",
                },
            },
            {
                $lookup: {
                  from: "authers",
                  localField: "author",
                  foreignField: "_id",
                  as: "authors",
                },
            },
            {
                $project: {
                  title: 1,
                  language: 1,
                  description:1,
                  featured:1,
                  genres:"$genres",
                  authors: "$authors",
                  bookNumber:1,
                },
              },

        ])

        res.status(200).json(books)

    }
    catch(err){
        next(err)
    }
}

export const issueBook= async(req,res,next)=>{
    console.log("body is",req.body)
    const owedbook=[{"bookid":req.params.bookid,"subBookid":req.params.subbookid}]
    try{
       const issuedbook = await Book.updateOne({_id:req.params.bookid, "bookNumber._id":req.params.subbookid },{
            $set: {
                'bookNumber.$.issue': req.body.name,
                'bookNumber.$.dueDate': req.body.dueDate,
                'bookNumber.$.available':false
            }
           },
           {new:true})
           
           res.status(200).json(issuedbook)
    }catch(err){
        next(err)
    }
}

export const returnBook = async(req,res,next)=>{
    try{
        await Book.updateOne({_id:req.params.bookid, "bookNumber._id":req.params.subbookid },{
            $set: {
                'bookNumber.$.issue': null,
                'bookNumber.$.dueDate': null,
                'bookNumber.$.available':true
            }
           },
           {new:true})
           res.status(200).json("returned")
    }catch(err){
        next(err)
    }
}

//get SubBook (only one). now i wnt this for return details
export const getSubBook = async(req,res,next)=>{
    const subId= mongoose.Types.ObjectId(req.params.subbookid)
    const bookId= mongoose.Types.ObjectId(req.params.bookid)
    try{
        const subBook = await Book.aggregate([
            {
                $match:{"_id" : bookId, "bookNumber._id" :  {
                    $in: [subId]
                  }
                }
            },
            {
                $addFields: {
                  sbook: {
                    $filter: {                                     //to get only one subbook,means filter ele from arry with condition
                      input: "$bookNumber",
                         cond: {
                           $in: [
                          "$$this._id",
                              [subId]
                            ]
                          }
                        }
                      }
                    }
            },
            {
                $project: {
                    sbook: 1,
                  },
            },
            {
                $lookup: {
                  from: "users",
                  localField: "sbook.issue",
                  foreignField: "_id",
                  as: "user",
                },
            },
            { $project: { items: { $concatArrays: [ "$sbook.dueDate", "$user.username" ] } } }
        ])
        res.status(200).json(subBook)
    }
    catch(err){
        next(err)
    }
}


export const getSearchBook=async(req,res,next)=>{
    console.log(req.body)
    try{
        const books = await Book.aggregate([
            {
                $match:{"title" : {$regex : req.body.name}}
            },
            {
                $lookup: {
                  from: "genres",
                  localField: "genre",
                  foreignField: "_id",
                  as: "genres",
                },
            },
            {
                $lookup: {
                  from: "authers",
                  localField: "author",
                  foreignField: "_id",
                  as: "authors",
                },
            },
            {
                $project: {
                  title: 1,
                  language: 1,
                  description:1,
                  featured:1,
                  genres:"$genres",
                  authors: "$authors",
                  bookNumber:1,
                },
              },

        ])

        res.status(200).json(books)
   }

   catch(err){
    next(err)
   }
}

//get issued books not subbooks
export const getIssuedBooks= async(req,res,next)=>{

    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    page = parseInt(page)
    limit = parseInt(limit)
    try{
        const issuedBooks= await Book.aggregate([
            
            {
                $match:{"bookNumber.available" : {$eq: false}}
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
        
        

        res.status(200).json({data: issuedBooks.slice((page - 1) * limit, page * limit),
            total: issuedBooks.length                                                               // to get limited data
    })
    }
    catch(err){
        next(err)
    }

}

//get selected issued subbooks 
export const getIssuedSubBooks= async(req,res,next)=>{
    var bookid = mongoose.Types.ObjectId(req.params.bookid);
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    page = parseInt(page)
    limit = parseInt(limit)
    try{
        const issuedSubBooks= await Book.aggregate([
            
            {
                $match:{
                    "_id":bookid,
                    "bookNumber.available" : {$eq: false}}
            },
           {                                                                          //filter booknumber to return only userid === issueid object
            '$set':{
                data:{
                    '$filter':{
                        input:'$bookNumber',
                        as:'item',
                        cond:{ '$eq': [ '$$item.available',false]}
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
        
        

        res.status(200).json({data: issuedSubBooks.slice((page - 1) * limit, page * limit),
            total: issuedSubBooks.length                                                               // to get limited data
    })
    }
    
    catch(err){
        next(err)
    }
} 
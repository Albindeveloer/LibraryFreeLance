import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
        
    genre:{
        type:[mongoose.Schema.ObjectId],
    },
    description:{
        type:String,
    },
    photos:{
        type:[String],
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    author:{
        type:[mongoose.Schema.ObjectId]
    },
    featured:{
        type:Boolean,
        default:false
    },
    bookNumber:[{
        ISBN: {type: Number, required: true},
        price: Number,
        dueDate: Date,
        issue:{ type:mongoose.Schema.ObjectId},
        available:{type:Boolean, default:true}

    }],

    },
)

export default mongoose.model("Book",BookSchema)

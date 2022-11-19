import mongoose from 'mongoose';
const { Schema } = mongoose;

const AutherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type: Date
    }

    },
)

export default mongoose.model("Auther",AutherSchema)

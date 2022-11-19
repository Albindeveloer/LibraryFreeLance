import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum : ['user','admin','superAdmin'],
        default: 'user'
    }
},
{timestamps:true}
)

export default mongoose.model("User",UserSchema)

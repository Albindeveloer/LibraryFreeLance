import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoleSchema = new mongoose.Schema({

    rollId:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },

    },
)

export default mongoose.model("Role",RoleSchema)

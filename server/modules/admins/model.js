import mongoose, { Schema } from 'mongoose';

const AdminSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    branchs: [{
        type: Schema.Types.ObjectId,
        ref: "Branch"
    }],
    roles: [String]
})

export default mongoose.model('Admin', AdminSchema);
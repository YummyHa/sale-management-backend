import mongoose, { Schema } from 'mongoose';

const BranchSchema =  new mongoose.Schema({
    shop_type: {
        type: String,
        required: true,
        unique: true
    },
   
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        unique: true
    },

})

const Branch = mongoose.model('Branch', BranchSchema);
export default Branch;
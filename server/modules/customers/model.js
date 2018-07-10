import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
  },
  fb: {
    type: String,
  },
  zalo: {
    type: String
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Customer', customerSchema);

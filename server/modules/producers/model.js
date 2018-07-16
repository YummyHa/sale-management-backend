import mongoose, { Schema } from 'mongoose';

const producerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  address: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    minlength: 10
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Producer', producerSchema);

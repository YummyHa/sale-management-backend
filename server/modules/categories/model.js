import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    minlength: 1,
    trim: true
  },
  attributes: {
    type: Array,
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Category', categorySchema);

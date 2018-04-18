import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    minlength: 1,
    trim: true
  },
  attributes: {
    type: Array,
    required: true
  }
})

export default mongoose.model('Category', categorySchema);

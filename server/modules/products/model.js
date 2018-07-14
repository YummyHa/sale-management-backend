import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  serial: {
    type: String,
    trim: true,
    minlength: 1
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  image: {
    type: String
  },
  description: {
    type: String,
    trim: true,
  },
  cate_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  quantity: {
    type: Number,
    default: 0
  },
  origin_price: {
    type: Number,
    default: 0
  },
  sell_price: {
    type: Number,
    default: 0
  },
  attributes: [{
    name: {
      type: String
    },
    value: {
      type: String
    }
  }],
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

export default mongoose.model('Product', ProductSchema);

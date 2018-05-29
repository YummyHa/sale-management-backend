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
  description: {
    type: String,
    trim: true,
    minlength: 1
  },
  cate_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  quantity: {
    type: Number,
    default: null
  },
  origin_price: {
    type: Number,
    default: null
  },
  sell_price: [{
    value: {
      type: Number,
      default: null
    },
    updatedAt: {
      type: Number,
      default: null
    }
  }],
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

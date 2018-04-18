import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  serial: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true
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
    required: true,
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
  attributes: {
    type: Array,
    default: []
  }
});

export default mongoose.model('Product', ProductSchema);

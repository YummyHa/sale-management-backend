import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  _customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  time: {
    type: Date,
    default: Date.now
  },
  products: [{
    _product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    qty: {
      type: Number
    },
  }],
  saleOff: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true
  },
  paid: {
    type: Number,
    required: true
  },
  status: {
    type: String
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Order', orderSchema);

import mongoose, { Schema } from 'mongoose';

const receiptSchema = new Schema({
  _producer: {
    type: Schema.Types.ObjectId,
    ref: 'Producer',
    default: null
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
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  note: {
    type: String
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default mongoose.model('Receipt', receiptSchema);

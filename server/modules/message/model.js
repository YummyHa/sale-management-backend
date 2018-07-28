import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  room: {
    type: String
  },
  createdAt: {
    type: Date
  }
})

export default mongoose.model('Message', messageSchema);

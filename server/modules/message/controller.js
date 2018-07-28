import Message from './model';

// get all Receipts
export const getMessage = async (req, res) => {
  try {
    var msgs = await Message.find({ room: req.params.id });
    if (!msgs) {
      throw new Error('No messages')
    }

    return res.status(200).json(msgs);
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

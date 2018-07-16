import Receipt from './model';

// create a new Receipt
export const createReceipt = async (req, res) => {
  try {
    const { _producer, products, total, note } = req.body;
    const newReceipt = new Receipt({ _producer, products, total, note });

    newReceipt._creator = req.user._id;
    var receipt = await newReceipt.save();
    if (!receipt) res.status(400).send();
    return res.status(201).send({ receipt });
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

// get all Receipts
export const getReceipts = async (req, res) => {
  try {
    var receipts = await Receipt.find({ _creator: req.user._id }).populate('_producer', 'name').populate('products._product', ['serial', 'name']);
    if (!receipts) {
      throw new Error('No receipts was found with this user')
    }

    return res.status(200).json(receipts);
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

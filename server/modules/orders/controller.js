import Order from './model';

// create a new order
export const createOrder = async (req, res) => {
  try {
    const { _customer, products, total, paid, status, saleOff } = req.body;
    const newOrder = new Order({ _customer, products, total, paid, status, saleOff });

    newOrder._creator = req.user._id;

    return res.status(201).json({ order: await newOrder.save() });
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

// get all orders
export const getOrders = async (req, res) => {
  try {
    var orders = await Order.find({ _creator: req.user._id })
    if (!orders) {
      throw new Error('No orders was found with this user')
    }

    return res.status(200).json(orders);
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

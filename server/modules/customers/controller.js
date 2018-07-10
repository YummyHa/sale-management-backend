import Customer from './model';

// create a new customer
export const createCustomer = async (req, res) => {
  const { name, address, phone, fb, zalo } = req.body;
  const newCustomer = new Customer({ name, address, phone, fb, zalo });

  newCustomer._creator = req.user._id;

  try {
    return res.status(201).json({ customer: await newCustomer.save() });
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

// get all customers
export const getCustomers = async (req, res) => {
  try {
    var customers = await Customer.find({ _creator: req.user._id })
    if (!customers) {
      throw new Error('No customers was found with this user')
    }

    return res.status(200).json(customers);
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

import mongoose from 'mongoose';

import Product from './model';

// create a product
export const createProduct = async (req, res) => {
  const { serial, name, description, cate_id, quantity, origin_price, sell_price, attributes } = req.body;
  const newProduct = new Product({ serial, name, description, cate_id, quantity, origin_price, sell_price, attributes });

  // Check if cate_id is a valid ObjectId
  let cateId = mongoose.Types.ObjectId(cate_id);
  if (!mongoose.Types.ObjectId.isValid(cateId)) {
    // throw an err and return if it not valid
    return res.status(404).send();
  }

  // replace the product's cate_id with the ObjectID
  newProduct.cate_id = cateId;
  try {
    return res.status(201).json({ product: await newProduct.save() });
  } catch (e) {
    return res.status(e.status).json({ err: true, message: e.message});
  }
}

// get all products 
export const getAllProducts = async (req, res) => {
  try {
    return res.status(200).json({ product: await Product.find({}) });
  } catch (e) {
    return res.status(e.status).json({ err: true, message: 'Error getting Products'});
  }
}

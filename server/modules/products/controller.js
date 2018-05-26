import mongoose from 'mongoose';

import Product from './model';

// create a product
export const createProduct = async (req, res) => {
  try {
    const { serial, name, description, cate_id, quantity, origin_price, sell_price, attributes } = req.body;
    const newProduct = new Product({ serial, name, description, cate_id, quantity, origin_price, sell_price, attributes });
  
    newProduct._creator = req.user._id;
  
    // Check if cate_id is a valid ObjectId
    let cateId = mongoose.Types.ObjectId(cate_id);
    if (!mongoose.Types.ObjectId.isValid(cateId)) {
      // throw an err and return if it not valid
      return res.status(404).send();
    }
  
    // replace the product's cate_id with the ObjectID
    newProduct.cate_id = cateId;
    
    let product = await newProduct.save();
    let user = req.user;
    user._products.push(product);
    await user.save();
    return res.status(201).json({ product });
  } catch (e) {
    return res.status(404).json({ err: true, message: e.message });
  }
}

// get all products 
export const getAllProducts = async (req, res) => {
  try {
    return res.status(200).json({ products: await Product.find({ _creator: req.user._id }) });
  } catch (e) {
    return res.status(e.status).json({ err: true, message: 'Error getting Products'});
  }
}

import Category from './model';

// create a new category
export const createCategory = async (req, res) => {
  const { name, description, attributes } = req.body;
  const newCate = new Category({ name, description, attributes });

  newCate._creator = req.user._id;

  try {
    return res.status(201).json({ category: await newCate.save() });
  } catch (e) {
    return res.status(404).json({ err: true, message: e.message });
  }
}

// get all categories
export const getCategories = async (req, res) => {
  try {
    return res.status(200).json({ categories: await Category.find({ _creator: req.user._id }) });
  } catch (e) {
    return res.status(e.status).json({ err: true, message: 'Error getting categories' });
  }
}

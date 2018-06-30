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
    var categories = await Category.find({ _creator: req.user._id })
    if (!categories) {
      throw new Error('No categories was found with this user')
    }

    return res.status(200).json(categories);
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

// get all categories by user id
export const getCategoriesByUserId = async (req, res) => {
  try {
    var categories = await Category.find({ _creator: req.params.id })
    if (!categories) {
      throw new Error('No categories was found with this user')
    }

    return res.status(200).json(categories);
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

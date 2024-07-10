const { v4: uuidv4 } = require('uuid');
const CategoryModel = require('../models/category');

module.exports.GET_CATEGORIES = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json({ categories });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

module.exports.ADD_CATEGORY = async (req, res) => {
  try {
    const { serviceName, imageUrl, bgColor } = req.body;

    const updatedImageUrl = imageUrl.replace(/color=[0-9a-f]{6}/i, `color=${bgColor}`);
    const category = new CategoryModel({
      id: uuidv4(),
      serviceName,
      imageUrl: updatedImageUrl,
      bgColor,
      creationDate: new Date(),
    });

    const addedCategory = await category.save();
    return res.status(200).json({ response: 'Category added successfully', category: addedCategory });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

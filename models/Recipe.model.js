const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  level: {
    type: String,
    enum: ['EasyPeasy', 'Amateur Chef', 'UltraPro Chef']
  },

  ingredients: {
    type: [String]
  },

  cuisine: {
    type: String,
    required: true
  },

  dishType: {
    type: String,
    enum: [
      'breakfast',
      'main_course',
      'soup',
      'snack',
      'drink',
      'dessert',
      'other'
    ]
  },

  image: {
    type: String,
    value: ['EasyPeasy', 'Amateur Chef', 'UltraPro Chef'],
    default: function () {
      if (this.image) {
        return (location.href =
          'https://images.media-allrecipes.com/images/75131.jpg');
      }
      return null;
    }
  },

  duration: {
    type: Number,
    minduration: 0
  },

  creator: {
    type: String
  },

  created: {
    type: Date
    /*default: function () {
      if (this.released) {
        return Date.now();
      }
      return null;
    }*/
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

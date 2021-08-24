const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((recipe) => {
    return Recipe.create({
      title: 'Rigatoni alla Genovese',
      cuisine: 'Italian',
      duration: 200
    });
  })
  .then((recipe) => {
    console.log(`Recipe was successfully added!`);
  })
  .then((recipes) => {
    return Recipe.insertMany([
      {
        title: 'Tagliata alla fiorentina',
        cuisine: 'Italian',
        enum: 'main_course'
      },
      {
        title: 'Sushi',
        cuisine: 'Japanese',
        enum: 'main_course'
      },
      {
        title: 'Schnitzel',
        cuisine: 'Austrian',
        enum: 'main_course'
      },

      {
        title: 'Carrot Cake',
        cuisine: 'British',
        enum: 'dessert',
        duration: 40
      }
    ]);
  })

  .then((recipe) => {
    console.log(`All the recipes were successfully added!`);
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      'Rigatoni alla Genovese',
      {
        duration: 100
      },
      { new: true }
    );
  })

  .then(() => {
    console.log(`The recipes was successfully updated!`);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  .then(() => {
    console.log(`The recipes was successfully removed!`);
    return mongoose.disconnect();
  })

  .then(() => {
    console.log('Connection has been destroyed');
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const userSchema = new mongoose.Schema({
  user: String,
  password: String,
  firstlvl1: Number,
  firstlvl2: Number,
  firstlvl3: Number,
  firstlvl4: Number, // Change from repeated firstlvl5 to firstlvl4
  firstlvl5: Number,
  bestlvl1: Number,
  bestlvl2: Number,
  bestlvl3: Number,
  bestlvl4: Number,
  bestlvl5: Number,
  total: Number,
  puesto: Number,
  antPuesto: Number,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Usuario', userSchema);

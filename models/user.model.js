const mongoose = require('../data/db')();

const { Schema } = mongoose;

const userModel = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  boxId: { // this becomes the root folder Id
    type: mongoose.Schema.Types.ObjectId,
    required: false, // TODO: Instead we can go for Hooks and create Root folder
  },
});

// Indexing goes here
userModel.index({ email: 1 });

module.exports = mongoose.model('users', userModel);

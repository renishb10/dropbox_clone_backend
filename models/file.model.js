const mongoose = require('../data/db')();

const { Schema } = mongoose;

const fileModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  isFolder: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  isBox: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object,
    required: false,
    default: null,
    originalName: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: { // Probably in bytes
      type: Number,
      required: true,
    },
    blobUrl: { // Mostly we will push the content to cloud storage and CDN it.
      type: String,
      required: true,
    },
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    required: false,
    default: new Date().toISOString(),
  },
});

// Indexing goes here
fileModel.index({ name: 1 });

module.exports = mongoose.model('files', fileModel);

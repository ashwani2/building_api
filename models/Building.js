const mongoose= require("mongoose")
const uuid = require('uuid');

const BuildingSchema = new mongoose.Schema({
    building_id: {
        type: String,
        default: uuid.v4(),
        unique: true,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      floors: {
        type: Number,
        required: true,
        min: 1, // Minimum number of floors
      },
      location: {
        type: String,
        required: true,
        trim: true,
      },
  });

  module.exports = mongoose.model('Building',BuildingSchema,'buildings');
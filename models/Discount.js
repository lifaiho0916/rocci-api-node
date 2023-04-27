const mongoose = require("mongoose");

const { Schema } = mongoose;

const DiscountSchema = new Schema({
  user: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    ref: "user",
  },
  discount_code: {
    type: String,
    required: true,
  },
  valid_from: {
    type: Date,
    required: true,
  },
  valid_to: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  value: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("discount", DiscountSchema);

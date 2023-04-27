const mongoose = require("mongoose");

const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  payment_date: {
    type: Date,
    required: true,
  },
  payment_name: {
    type: String,
    required: true,
  },
  payment_surname: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  subscription_date: {
    type: Date,
    required: true,
  },
  cost: {
    currency: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "discount",
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  validTill: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("subscription", SubscriptionSchema);

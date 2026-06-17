const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerVerificationTokenSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Token expires after 1 hour
  },
});
module.exports = mongoose.model("CustomerVerificationToken", CustomerVerificationTokenSchema);

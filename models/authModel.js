const mongoose = require("mongoose");
const loginSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the salutation"],
    },
    password: {
      type: String,
      required: [true, "please add the firstName"],
    },
  },
  {
    timestamps: true,
  }
);

const collection = mongoose.model("authentication", loginSchema);
module.exports = collection;

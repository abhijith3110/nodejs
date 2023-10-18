const mongoose = require("mongoose");
const passport = require("passport");
const employeeSchema = mongoose.Schema(
  {
    salutation: {
      type: String,
      required: [true, "please add the salutation"],
    },
    firstName: {
      type: String,
      required: [true, "please add the firstName"],
    },
    lastName: {
      type: String,
      required: [true, "please add the lastName"],
    },
    email: {
      type: String,
      required: [true, "please add the email"],
    },
    qualifications: {
      type: String,
      required: [true, "please add the qualifications"],
    },

    address: {
      type: String,
      required: [true, "please add the address"],
    },
    phone: {
      type: Number,
      required: [true, "please add the phoneNumber"],
    },
    country: {
      type: String,
      required: [true, "please add the country"],
    },
    state: {
      type: String,
      required: [true, "please add the state"],
    },
    city: {
      type: String,
      required: [true, "please add the city"],
    },
    dob: {
      type: String,
      required: [true, "please add the dateOfBirth"],
    },
    gender: {
      type: String,
      required: [true, "please add the gender"],
    },
    pincode: {
      type: String,
      required: [true, "please add the pincode"],
    },
    username: {
      type: String,
      required: [true, "please add the username"],
    },
    password: {
      type: String,
      required: [true, "please add the password"],
    },
    image: {
      type: String,
      required: [true, "please add the image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employees", employeeSchema);

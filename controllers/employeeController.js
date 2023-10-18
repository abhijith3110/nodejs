const asyncHandler = require("express-async-handler");
const employees = require("../models/employeeModel");
const upload = require("../config/multerConfig");
const multer = require("multer");
const path = require("path");
//---------------------GET-employees-------------------
const getEmployee = asyncHandler(async (req, res) => {
  let { page, limit } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 4;
  const skip = (page - 1) * limit;
  const totalEmployee = await employees.find();
  const employee = await employees.find().skip(skip).limit(limit);
  res.status(200).json({
    message: "Success",
    length: totalEmployee.length,
    data: employee,
  });
});
//--------------------POST-employee----------------------
const createEmployee = asyncHandler(async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: "img upload error" });
    } else if (err) {
      res.status(500).json({ message: "server error" });
    } else {
      const {
        salutation,
        firstName,
        lastName,
        email,
        qualifications,
        address,
        phone,
        dob,
        gender,
        country,
        state,
        city,
        pincode,
        username,
        password,
      } = req.body;

      //get uploaded file get path from req.file

      const imagepath = req.file ? req.file.path : null;
      if (
        !salutation ||
        !firstName ||
        !lastName ||
        !email ||
        !qualifications ||
        !address ||
        !phone ||
        !dob ||
        !gender ||
        !country ||
        !state ||
        !city ||
        !pincode ||
        !username ||
        !password
      ) {
        res.status(400).json({ message: "all field are mantatory!!!!!!!!!!" });
      }
      const employeedata = await employees.create({
        salutation,
        firstName,
        lastName,
        email,
        qualifications,
        address,
        phone,
        dob,
        gender,
        country,
        state,
        city,
        pincode,
        username,
        password,
        image: imagepath,
      });

      res.status(201).json(employeedata);
    }
  });
});
//-------------------getOne-employee-------------------------
const getOneEmployee = asyncHandler(async (req, res) => {
  const employee = await employees.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("employee not found");
  }
  res.status(200).json(employee);
});
//-------------------PUT-employee------------------------------
const UpdateEmployee = asyncHandler(async (req, res) => {
  upload(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ error: "Image upload error: " + error.message });
    } else if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }

    let avatarPath;
    if (req.file) {
      avatarPath = path.join("uploads", req.file.filename);
    } else {
      // if no file is uploaded, keep the existing avatar path
      const emp = await employees.findById(req.params.id);
      if (!emp) {
        res.status(404).json({ error: "employee not found" });
        return;
      }
      avatarPath = emp.image; // Use the existing avatar path
    }
    // Update avatar only if a new file was uploaded
    const updateData = {
      //spread-operator
      ...req.body,
      ...(avatarPath ? { image: avatarPath } : {}), //condition to include image
    };
    console.log(avatarPath);
    const updatedData = await employees.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    console.log(updatedData);
    res.status(200).json(updatedData);
  });
});

//-------------------DELETE-employee----------------------------
const deleteEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const employee = await employees.findByIdAndDelete(id);
  if (!employee) {
    res.status(404);
    throw new Error("employee not found");
  }
  res.status(200).json({ message: "employee successfully deleted" });
});
//----------------------search---------------------------------
const searchEmployee = asyncHandler(async (req, res) => {
  const query = req.query.q.toString();
  try {
    const items = await employees.find({
      $or: [
        { firstName: { $regex: new RegExp(query, "i") } },
        { lastName: { $regex: new RegExp(query, "i") } },
        { email: { $regex: new RegExp(query, "i") } },
        { gender: { $regex: new RegExp(query, "i") } },
        { country: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getEmployee,
  createEmployee,
  getOneEmployee,
  UpdateEmployee,
  deleteEmployee,
  searchEmployee,
};

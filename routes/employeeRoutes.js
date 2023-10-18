const express = require("express");
const router = express.Router();
const {
  getEmployee,
  createEmployee,
  getOneEmployee,
  UpdateEmployee,
  deleteEmployee,
  searchEmployee,
} = require("../controllers/employeeController");

router.route("/").get(getEmployee).post(createEmployee);
router.route("/search").get(searchEmployee);
router.route("/:id").get(getOneEmployee).put(UpdateEmployee).delete(deleteEmployee);

module.exports = router;

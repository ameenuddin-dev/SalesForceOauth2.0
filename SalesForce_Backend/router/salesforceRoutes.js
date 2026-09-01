const express = require("express");

const router = express.Router();

const checkSalesforceAuth = require("../middleware/authMiddleware");

const {
  querySalesforce,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../controller/salesForceController");

//Get Api
router.get("/api/salesforce/query", checkSalesforceAuth, querySalesforce);

//Create Api
router.post("/api/salesforce/record", checkSalesforceAuth, createRecord);

//Update Api
router.patch("/api/salesforce/record/:id", checkSalesforceAuth, updateRecord);

//Delete Api
router.delete("/api/salesforce/record/:id", checkSalesforceAuth, deleteRecord);

module.exports = router;

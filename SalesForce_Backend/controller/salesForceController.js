const salesForceService = require("../services/salesForceServices");

const { objectFields } = require("../config/salesforceObjects");

//Get Controller for Salesforce API
async function querySalesforce(req, res) {
  try {
    console.log("SESSION SALESFORCE:", req.user);

    const { accessToken, instanceUrl } = req.user;

    console.log("ACCESS TOKEN EXISTS:", !!accessToken);
    console.log("INSTANCE URL:", instanceUrl);

    const object = req.query.object;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const fields = objectFields[object];

    if (!fields) {
      return res.status(400).json({
        message:
          "Invalid object type. Please provide a valid Salesforce object.",
      });
    }

    const offset = (page - 1) * limit;

    const query = `SELECT ${fields.join(",")} FROM ${object} LIMIT ${limit} OFFSET ${offset}`;
    console.log("QUERY:", query);

    const data = await salesForceService.querySalesforce(
      accessToken,
      instanceUrl,
      query,
    );

    res.json({
      page,
      limit,
      data,
    });
  } catch (error) {
    handleSalesforceError(res, error);
  }
}

//Post Controller for Salesforce API

async function createRecord(req, res) {
  try {
    const { accessToken, instanceUrl } = req.user;
    const object = req.query.object;

    if (!objectFields[object]) {
      return res.status(400).json({
        message:
          "Invalid object type. Please provide a valid Salesforce object.",
      });
    }

    const data = await salesForceService.createRecord(
      accessToken,
      instanceUrl,
      object,
      req.body,
    );

    res.status(201).json(data);
  } catch (error) {
    handleSalesforceError(res, error);
  }
}

//Update Controller for Salesforce API
async function updateRecord(req, res) {
  try {
    const { accessToken, instanceUrl } = req.user;
    const object = req.query.object;
    const id = req.params.id;

    if (!objectFields[object]) {
      return res.status(400).json({
        message:
          "Invalid object type. Please provide a valid Salesforce object.",
      });
    }

    const data = await salesForceService.updateRecord(
      accessToken,
      instanceUrl,
      object,
      id,
      req.body,
    );

    res.status(200).json(data);
  } catch (error) {
    handleSalesforceError(res, error);
  }
}

//Delete Controller for Salesforce API
async function deleteRecord(req, res) {
  try {
    const { accessToken, instanceUrl } = req.user;
    const object = req.query.object; // verify once object is required for delete if not remove this
    const id = req.params.id;

    if (!objectFields[object]) {
      return res.status(400).json({
        message:
          "Invalid object type. Please provide a valid Salesforce object.",
      });
    }

    const data = await salesForceService.deleteRecord(
      accessToken,
      instanceUrl,
      object,
      id,
    );

    res.status(200).json({
      message: `${objectFields} deleted successfully`,
    });
  } catch (error) {
    handleSalesforceError(res, error);
  }
}

// move this to util
function handleSalesforceError(res, error) {
  console.error("Salesforce API Error:", error.response?.data || error.message);

  res.status(error.response?.status || 500).json({
    message: "Salesforce API request failed",
    error: error.response?.data || error.message,
  });
}

module.exports = {
  querySalesforce,
  createRecord,
  updateRecord,
  deleteRecord,
};

const axios = require("axios");

const API_VERSION = "v65.0";

//Get Services from Salesforce
async function querySalesforce(accessToken, instanceUrl, query) {
  const url = `${instanceUrl}/services/data/${API_VERSION}/query`;

  console.log("Salesforce URL:", url);

  const response = await axios.get(url, {
    params: {
      q: query,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

//Post Services to Salesforce
async function createRecord(accessToken, instanceUrl, object, data) {
  const url = `${instanceUrl}/services/data/${API_VERSION}/sobjects/${object}`;

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

//Update Services in Salesforce

async function updateRecord(accessToken, instanceUrl, object, id, data) {
  const url = `${instanceUrl}/services/data/${API_VERSION}/sobjects/${object}/${id}`;

  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

//Delete Services from Salesforce
async function deleteRecord(accessToken, instanceUrl, object, id) {
  const url = `${instanceUrl}/services/data/${API_VERSION}/sobjects/${object}/${id}`;

  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}
module.exports = {
  querySalesforce,
  createRecord,
  updateRecord,
  deleteRecord,
};

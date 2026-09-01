export const SALESFORCE_OBJECTS = {
  Account: {
    label: "Accounts",
    singular: "Account",
    fields: [
      { name: "Name", label: "Account Name", type: "text", required: true },
      { name: "Phone", label: "Phone", type: "tel" },
      { name: "Website", label: "Website", type: "url" },
      { name: "Industry", label: "Industry", type: "text" },
      { name: "Type", label: "Type", type: "text" },
    ],
  },
  Opportunity: {
    label: "Opportunities",
    singular: "Opportunity",
    fields: [
      { name: "Name", label: "Opportunity Name", type: "text", required: true },
      { name: "Amount", label: "Amount", type: "number" },
      { name: "StageName", label: "Stage", type: "text", required: true },
      { name: "CloseDate", label: "Close Date", type: "date", required: true },
      { name: "Probability", label: "Probability", type: "number" },
    ],
  },
  Lead: {
    label: "Leads",
    singular: "Lead",
    fields: [
      { name: "FirstName", label: "First Name", type: "text" },
      { name: "LastName", label: "Last Name", type: "text", required: true },
      { name: "Company", label: "Company", type: "text", required: true },
      { name: "Email", label: "Email", type: "email" },
      { name: "Phone", label: "Phone", type: "tel" },
    ],
  },
  Contact: {
    label: "Contacts",
    singular: "Contact",
    fields: [
      { name: "FirstName", label: "First Name", type: "text" },
      { name: "LastName", label: "Last Name", type: "text", required: true },
      { name: "Email", label: "Email", type: "email" },
      { name: "Phone", label: "Phone", type: "tel" },
      { name: "Title", label: "Title", type: "text" },
    ],
  },
  Case: {
    label: "Cases",
    singular: "Case",
    fields: [
      { name: "Subject", label: "Subject", type: "text", required: true },
      { name: "Status", label: "Status", type: "text" },
      { name: "Priority", label: "Priority", type: "text" },
      { name: "Origin", label: "Origin", type: "text" },
      { name: "Description", label: "Description", type: "textarea" },
    ],
  },
};

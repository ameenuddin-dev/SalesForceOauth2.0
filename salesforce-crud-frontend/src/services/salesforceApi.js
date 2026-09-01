import api from "./api";
export const salesforceApi = {
  getRecords: async (object, page = 1, limit = 20) => {
    const r = await api.get("/api/salesforce/query", {
      params: { object, page, limit },
    });
    return r.data;
  },
  createRecord: async (object, data) => {
    const r = await api.post("/api/salesforce/record", data, {
      params: { object },
    });
    return r.data;
  },
  updateRecord: async (object, id, data) => {
    const r = await api.patch(`/api/salesforce/record/${id}`, data, {
      params: { object },
    });
    return r.data;
  },
  deleteRecord: async (object, id) => {
    const r = await api.delete(`/api/salesforce/record/${id}`, {
      params: { object },
    });
    return r.data;
  },
};

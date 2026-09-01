import { useCallback, useEffect, useState } from "react";
import { salesforceApi } from "../services/salesforceApi";
const PAGE_SIZE = 20;
export default function useSalesforceRecords(object) {
  const [records, setRecords] = useState([]),
    [page, setPage] = useState(1),
    [loading, setLoading] = useState(false),
    [loadingMore, setLoadingMore] = useState(false),
    [error, setError] = useState(null),
    [hasMore, setHasMore] = useState(true);
  const loadRecords = useCallback(
    async (p = 1) => {
      try {
        setError(null);
        p === 1 ? setLoading(true) : setLoadingMore(true);
        const r = await salesforceApi.getRecords(object, p, PAGE_SIZE);
        const rows = r?.data?.records ?? [];
        p === 1 ? setRecords(rows) : setRecords((prev) => [...prev, ...rows]);
        setPage(p);
        setHasMore(rows.length === PAGE_SIZE);
      } catch (e) {
        setError(
          e.response?.data?.message || "Failed to load Salesforce records.",
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [object],
  );
  useEffect(() => {
    setRecords([]);
    setPage(1);
    setHasMore(true);
    loadRecords(1);
  }, [object, loadRecords]);
  const loadMore = () => {
    if (!loading && !loadingMore && hasMore) loadRecords(page + 1);
  };
  const createRecord = async (d) => {
    const r = await salesforceApi.createRecord(object, d);
    await loadRecords(1);
    return r;
  };
  const updateRecord = async (id, d) => {
    const r = await salesforceApi.updateRecord(object, id, d);
    await loadRecords(1);
    return r;
  };
  const deleteRecord = async (id) => {
    const r = await salesforceApi.deleteRecord(object, id);
    await loadRecords(1);
    return r;
  };
  return {
    records,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    createRecord,
    updateRecord,
    deleteRecord,
  };
}

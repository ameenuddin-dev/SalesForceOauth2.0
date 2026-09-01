import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  CheckCircle2,
  Database,
  LogOut,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Table2,
  Users,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { SALESFORCE_OBJECTS } from "../config/salesforceObjects";
import { useAuth } from "../context/AuthContext";
import useSalesforceRecords from "../hooks/useSalesforceRecords";

import ObjectSelector from "../components/salesforce/ObjectSelector";
import RecordsTable from "../components/salesforce/RecordsTable";
import RecordModal from "../components/salesforce/RecordModal";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [object, setObject] = useState("Account");

  const [modal, setModal] = useState({
    open: false,
    mode: "create",
    record: null,
  });

  const [saving, setSaving] = useState(false);

  const config = SALESFORCE_OBJECTS[object];

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    record: null,
  });

  const {
    records,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useSalesforceRecords(object);

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const handleCreate = () => {
    setModal({
      open: true,
      mode: "create",
      record: null,
    });
  };

  const handleEdit = (record) => {
    setModal({
      open: true,
      mode: "edit",
      record,
    });
  };

  const handleSubmit = async (data) => {
    try {
      setSaving(true);

      if (modal.mode === "edit") {
        await updateRecord(modal.record.Id, data);

        toast.success(`${config.singular} updated successfully`);
      } else {
        await createRecord(data);

        toast.success(`${config.singular} created successfully`);
      }

      setModal({
        open: false,
        mode: "create",
        record: null,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          `Failed to ${modal.mode === "edit" ? "update" : "create"} ${
            config.singular
          }`,
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (record) => {
    setDeleteModal({
      open: true,
      record,
    });
  };

  const confirmDelete = async () => {
    const record = deleteModal.record;

    if (!record) {
      return;
    }

    try {
      await deleteRecord(record.Id);

      toast.success(`${config.singular} deleted successfully`);

      setDeleteModal({
        open: false,
        record: null,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || `Failed to delete ${config.singular}`,
      );
    }
  };

  const handleRefresh = async () => {
    try {
      await loadMore();
      toast.success("Records refreshed");
    } catch (error) {
      toast.error("Failed to refresh records");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          TOP NAVBAR
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
          {/* Brand */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Database size={21} />
            </div>

            <div>
              <h1 className="text-sm font-bold text-slate-900">
                Salesforce Manager
              </h1>

              <p className="text-xs text-slate-500">CRM Data Management</p>
            </div>
          </div>

          {/* Right side */}

          <div className="flex items-center gap-4">
            {/* Connection status */}

            <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-emerald-700">
                Salesforce Connected
              </span>
            </div>

            {/* User */}

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  Salesforce User
                </p>

                <p className="text-xs text-slate-500">Active session</p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                SF
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1600px] px-6 py-8">
        {/* Page header */}

        <section className="mb-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-blue-600">
                <Sparkles size={16} />

                <span className="font-medium">Salesforce Data Workspace</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                {config.label}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create, view, update and delete Salesforce{" "}
                {config.label.toLowerCase()}.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ObjectSelector value={object} onChange={setObject} />

              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
              >
                <Plus size={18} />
                Create {config.singular}
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            STATS
        ====================================================== */}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Loaded Records"
            value={records.length}
            icon={Database}
          />

          <StatCard title="Object" value={config.singular} icon={Table2} />

          <StatCard
            title="Fields"
            value={config.fields.length}
            icon={Activity}
          />

          <StatCard
            title="Connection"
            value="Active"
            icon={ShieldCheck}
            success
          />
        </section>

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <Activity size={19} className="mt-0.5 shrink-0" />

            <div>
              <p className="text-sm font-semibold">Unable to load records</p>

              <p className="mt-1 text-xs">{error}</p>
            </div>
          </div>
        )}

        {/* =====================================================
            TABLE CARD
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table toolbar */}

          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Users size={18} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {config.label}
                </h3>

                <p className="text-xs text-slate-500">
                  Showing {records.length} loaded records
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Records */}

          <RecordsTable
            records={records}
            fields={config.fields}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>

        {/* Footer */}

        <footer className="mt-6 flex flex-col justify-between gap-2 text-xs text-slate-400 sm:flex-row">
          <p>Salesforce CRUD Management System</p>

          <p>Secure OAuth 2.0 Session</p>
        </footer>
      </main>

      {/* =====================================================
          CREATE / EDIT MODAL
      ====================================================== */}

      <RecordModal
        open={modal.open}
        mode={modal.mode}
        objectConfig={config}
        record={modal.record}
        onClose={() =>
          !saving &&
          setModal({
            open: false,
            mode: "create",
            record: null,
          })
        }
        onSubmit={handleSubmit}
        submitting={saving}
      />

      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-100 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="text-red-600" size={21} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Delete {config.singular}?
                </h3>

                <p className="text-sm text-slate-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm leading-6 text-slate-600">
                Are you sure you want to delete this{" "}
                <span className="font-semibold text-slate-900">
                  {config.singular}
                </span>
                ?
              </p>

              {deleteModal.record && (
                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Record
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                    {deleteModal.record.Name ||
                      deleteModal.record.Subject ||
                      deleteModal.record.Id}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 p-4">
              <button
                type="button"
                onClick={() =>
                  setDeleteModal({
                    open: false,
                    record: null,
                  })
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ title, value, icon: Icon, success = false }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              success ? "text-emerald-600" : "text-slate-900"
            }`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            success
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <Icon size={19} />
        </div>
      </div>

      {success && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 size={14} />
          Connected
        </div>
      )}
    </div>
  );
}

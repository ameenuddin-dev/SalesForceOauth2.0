import { Pencil, Trash2 } from "lucide-react";

export default function RecordsTable({
  records,
  fields,
  loading,
  loadingMore,
  hasMore,
  onLoadMore,
  onEdit,
  onDelete,
}) {
  const scroll = (e) => {
    const x = e.currentTarget;
    if (x.scrollTop + x.clientHeight >= x.scrollHeight - 100) onLoadMore();
  };
  if (loading)
    return (
      <div className="rounded-2xl bg-white p-12 text-center text-slate-500">
        Loading records...
      </div>
    );
  return (
    <div
      onScroll={scroll}
      className="max-h-[calc(100vh-250px)] overflow-auto rounded-2xl border bg-white"
    >
      <table className="min-w-full text-left">
        <thead className="sticky top-0 bg-slate-100">
          <tr>
            {fields.map((f) => (
              <th
                key={f.name}
                className="border-b px-4 py-3 text-xs uppercase text-slate-500"
              >
                {f.label}
              </th>
            ))}
            <th className="border-b px-4 py-3 text-xs uppercase text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.Id} className="hover:bg-slate-50">
              {fields.map((f) => (
                <td
                  key={f.name}
                  className="max-w-xs border-b px-4 py-3 text-sm"
                >
                  <div className="truncate">{r[f.name] ?? "—"}</div>
                </td>
              ))}
              <td className="border-b border-slate-100 px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => onEdit(r)}
                    aria-label={`Edit ${r.Name || r.Id}`}
                    title="Edit record"
                    className="
        group
        inline-flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-slate-200
        bg-white
        text-slate-500
        transition-all
        duration-200
        hover:border-blue-200
        hover:bg-blue-50
        hover:text-blue-600
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/30
        active:scale-95
      "
                  >
                    <Pencil
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => onDelete(r)}
                    aria-label={`Delete ${r.Name || r.Id}`}
                    title="Delete record"
                    className="
        group
        inline-flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-slate-200
        bg-white
        text-slate-500
        transition-all
        duration-200
        hover:border-red-200
        hover:bg-red-50
        hover:text-red-600
        focus:outline-none
        focus:ring-2
        focus:ring-red-500/30
        active:scale-95
      "
                  >
                    <Trash2
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {!records.length && (
            <tr>
              <td
                colSpan={fields.length + 1}
                className="p-12 text-center text-slate-500"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {loadingMore && (
        <div className="p-4 text-center text-sm text-slate-500">
          Loading more...
        </div>
      )}
      {!hasMore && records.length > 0 && (
        <div className="p-4 text-center text-xs text-slate-400">
          No more records.
        </div>
      )}
    </div>
  );
}

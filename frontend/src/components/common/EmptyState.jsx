export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/70 px-6 py-10 text-center">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export default function LoadingOverlay({ visible = false, label = "Loading..." }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/35 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white/90 px-6 py-8 shadow-2xl">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        <p className="mt-3 text-sm font-medium text-slate-700">{label}</p>
      </div>
    </div>
  );
}

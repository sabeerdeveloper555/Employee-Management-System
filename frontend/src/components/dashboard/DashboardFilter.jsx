function DashboardFilter({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="date-range"
        className="text-sm font-medium text-slate-600"
      >
        Date Range
      </label>

      <select
        id="date-range"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="year">This Year</option>
      </select>
    </div>
  );
}

export default DashboardFilter;
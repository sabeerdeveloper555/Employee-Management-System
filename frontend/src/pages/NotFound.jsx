import { Link } from "react-router-dom";
import { HiOutlineFaceFrown } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary">
        <HiOutlineFaceFrown className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-primary">
        404
      </h1>
      <p className="mt-2 text-base font-medium text-text-primary">
        Page not found
      </p>
      <p className="mt-1 max-w-sm text-sm text-text-secondary">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-primary-700 hover:shadow-card active:scale-[0.98]"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

import { AlertCircle, RefreshCw } from "lucide-react";

function Error({
  title = "Something went wrong",
  message = "Unable to load please try agin some time",
  onRetry,
  fullScreen = true,
}) {
  return (
    <div
      className={
        fullScreen
          ? "flex min-h-[calc(100vh-4rem)] items-center justify-center px-4"
          : "flex items-center justify-center py-10 px-4"
      }
      role="alert"
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-red-50 p-3">
          <AlertCircle size={28} className="text-red-500" />
        </div>

        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <p className="mt-1 text-md text-gray-800">{message}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export default Error;

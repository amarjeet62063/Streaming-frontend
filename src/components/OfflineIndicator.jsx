import { useOnlineStatus } from "../hooks/useOnlineStatus";

function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-[9999]
                 -translate-x-1/2 rounded-lg
                 bg-gray-900 px-4 py-3
                 text-sm text-white shadow-lg"
    >
      You're offline. Some features may be unavailable.
    </div>
  );
}

export default OfflineIndicator;

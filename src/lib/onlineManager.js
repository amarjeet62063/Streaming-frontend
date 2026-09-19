import { onlineManager } from "@tanstack/react-query";

onlineManager.setEventListener((setOnline) => {
  const handleOnline = () => setOnline(true);
  const handleOffline = () => setOnline(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
});

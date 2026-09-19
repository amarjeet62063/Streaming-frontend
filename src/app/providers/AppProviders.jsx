import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OfflineIndicator from "../../components/OfflineIndicator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      networkMode: "online",
    },
    mutations: {
      retry: 0,
      networkMode: "online",
    },
  },
});

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <OfflineIndicator />
      {children}
    </QueryClientProvider>
  );
}

export default AppProviders;

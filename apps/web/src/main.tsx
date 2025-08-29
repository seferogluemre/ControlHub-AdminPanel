import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
// Generated Routes
import { handleServerError } from "#/utils/handle-server-error";
import { useAuthStore } from "#context/auth.context.ts";
import { FontProvider } from "./context/font-context";
import { ThemeProvider } from "./context/theme-context";
import "./index.css";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // eslint-disable-next-line no-console
        if (import.meta.env.DEV) console.log({ failureCount, error });

        if (failureCount >= 0 && import.meta.env.DEV) return false;
        if (failureCount > 3 && import.meta.env.PROD) return false;

        return true;
        /* return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        ) */
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      handleServerError(error);
    },
  }),
});

const router = createRouter({
  routeTree,
  context: { queryClient, auth: useAuthStore.getState() },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe(() => {
      router.invalidate();
    });

    return () => unsubscribe();
  }, []);

  const auth = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <FontProvider>
          <RouterProvider
            router={router}
            context={{
              auth,
            }}
          />
        </FontProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

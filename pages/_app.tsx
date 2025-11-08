import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "~/components/ui/provider";
import { Analytics } from "@vercel/analytics/next"

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<QueryClientProvider client={queryClient}>
				<Analytics mode={"production"} />
				<Component {...pageProps} />
			</QueryClientProvider>
		</Provider>
	);
}

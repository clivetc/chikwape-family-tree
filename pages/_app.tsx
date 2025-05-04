import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "~/components/ui/provider";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</Provider>
	);
}

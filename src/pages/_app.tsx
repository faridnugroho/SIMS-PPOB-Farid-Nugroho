import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store } from "@/store";
import AppShell from "@/components/layouts/AppShell";
import { Toaster } from 'react-hot-toast';
import "../../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppShell>
        <Component {...pageProps} />
        <Toaster />
      </AppShell>
    </Provider>
  )
}

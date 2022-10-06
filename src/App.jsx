import "./App.css";

import CookieBanner from "./components/cookie-banner";
import NoInternet from "./components/dialogs/noInternet";
import Toast from "./components/shared/toast";

import { SocketProvider } from "./features/socket";
import { useAccessToken } from "./hooks";

import Pages from "./pages";

export default function App() {
  useAccessToken();
  return (
    <SocketProvider>
      <Pages />
      <Toast />
      <NoInternet />
      <CookieBanner />
    </SocketProvider>
  );
}

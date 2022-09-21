import "./App.css";
import CookieBanner from "./components/cookie-banner";
import Toast from "./components/shared/toast";
import { useAccessToken } from "./hooks";
import Pages from "./pages";

export default function App() {
  useAccessToken();
  return (
    <>
      <Pages />
      <Toast />
      <CookieBanner />
    </>
  );
}

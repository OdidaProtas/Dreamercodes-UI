import "./App.css";
import Toast from "./components/shared/toast";
import useAccessToken from "./hooks/useAccessToken";
import Pages from "./pages";

export default function App() {
  useAccessToken();
  return (
    <>
      <Pages />
      <Toast />
    </>
  );
}

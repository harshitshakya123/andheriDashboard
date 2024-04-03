import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProfileProvider } from "./store/UserProfileStore";
import { I18nextProvider } from "react-i18next";
import global_es from "./translation/en/global.json";
import global_jp from "./translation/jp/global.json";
import i18next from "i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("lang") || "en",
  resources: {
    en: {
      global: global_es,
    },
    jp: {
      global: global_jp,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </I18nextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

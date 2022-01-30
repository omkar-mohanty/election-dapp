import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
const rootElement = document.getElementById("root");
import Metamask from "./pages/Metamask";
if (window.ethereum) {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootElement
  );
} else {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Metamask />}>
        </Route>
      </Routes>
    </BrowserRouter>,
    rootElement
  );
}

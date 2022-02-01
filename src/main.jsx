/*
  Main Entry point of the entire web app
*/
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
const rootElement = document.getElementById("root");
import Metamask from "./pages/Metamask";

//Since metamask is a requirement to use this app a check needs to be there 
//to ensure that metamask is installed
//If metamask is not installed the used is directed to a page where link 
//to install metamask
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

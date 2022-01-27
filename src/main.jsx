
import { render } from "react-dom";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Election from "./pages/Election";
import SingleElection from "./pages/SingleElection";
import Home from "./pages/Home";
import AddElection from "./pages/AddElection";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="elections" element={<Election />} />
        <Route path=":id" element={<SingleElection />} />
        <Route path="add" element={<AddElection />} />
        <Route path="*" element={<h1>
          There aint nothin here sonny
        </h1>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
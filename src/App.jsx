import React, { useEffect, useState } from "react"
import Main from "./pages/Main";
import Election from "./pages/Election";
import SingleElection from "./pages/SingleElection";
import Home from "./pages/Home";
import AddElection from "./pages/AddElection";
import {
  Routes,
  Route
} from "react-router-dom";
import { Typography } from "@mui/material";
import ElectionFactory, { isWalletUnlocked } from "./data/electionContract";
import MetamaskLogin from "./pages/MetamaskLogin";

function App() {
  let [unlocked, stateUnlocked] = useState(false);
  let [electionFactory, stateElectionFactory] = useState(null);
  useEffect(() => {
    isWalletUnlocked()
      .then((val) => {
        let res = val;
        stateUnlocked(res);
      })
  }, [])
  if (!unlocked) {
    return (
      <Routes>
        <Route path="*" element={<MetamaskLogin
          unlocked={unlocked}
          stateUnlocked={stateUnlocked} />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="elections" element={<Election electionFactory={electionFactory} />} >
          </Route>
          <Route path=":id" element={<SingleElection electionFactory={electionFactory} />} />
          <Route path="add" element={<AddElection electionFactory={electionFactory} />} />
          <Route path="*" element={
            <Typography variant="h3">
              Broken Link Perhaps?
            </Typography>} />
        </Route>
      </Routes>
    )
  }
}
export default App

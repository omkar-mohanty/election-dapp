import React from "react"
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Button, Typography } from "@mui/material";
import AddButton from "./components/AddButton";
import Link from '@mui/material/Link';
import Metamask from "./pages/Metamask";
class App extends React.Component {
  render() {
    if (window.ethereum) {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center">
          <AddButton />
          <Outlet />
        </Grid>
      );
    } else {
      return (
        <Metamask />
      )
    }

  }
}

export default App

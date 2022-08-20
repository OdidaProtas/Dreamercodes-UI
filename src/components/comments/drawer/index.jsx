import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";

export default function () {
  const [state, setState] = React.useState(false);

  function toggleDrawer() {
    setState((o) => !o);
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 400, p: 2 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h5">Comments</Typography>
      <List></List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"anchor"}>
        <Button onClick={toggleDrawer}>{"Comments"}</Button>
        <Drawer anchor={"right"} open={state} onClose={toggleDrawer}>
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

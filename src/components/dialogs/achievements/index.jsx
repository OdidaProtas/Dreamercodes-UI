import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDialog } from "../../../hooks";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

export default function Achievements() {
  const [open, toggle] = useDialog({ scope: "LOCAL", name: "achievements" });

  return (
    <>
      <Button variant="outlined" onClick={toggle} fullWidth>
        Show More
      </Button>
      <Dialog
        hideBackdrop
        sx={{ backdropFilter: "blur(4px)" }}
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={toggle}
      >
        <DialogTitle>Achievements</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Your achievements since you began using dreamercodes
          </DialogContentText>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}

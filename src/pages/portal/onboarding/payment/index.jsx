import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  ListItemAvatar,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Check";
import Timeline from "./timeline";
import { useHistory } from "react-router-dom";
import actions from "../actions";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(true);
  const { push } = useHistory();

  const { handleOnboarded } = actions();

  const handleClose = () => {
    handleOnboarded();
    push("/portal");
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="inherit" elevation={0} sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              DreamersCodes PRO
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container>
            <Grid item xs>
              <Typography variant="h4">Try Dreamcodes PRO for free</Typography>
              <List
                dense
                sx={{
                  mt: 6,
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="14-day free trial" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Unlimited coding practice" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Play with working code" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Goals and progress tracking" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="No ads and interruptions" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs>
              <Box sx={{ mb: 3 }}>
                <Timeline />
                <Box sx={{ p: 6 }}>
                  <Button
                    onClick={() => push("/portal/onboarding/checkout")}
                    fullWidth
                    disableElevation
                    variant="contained"
                  >
                    Start Free Trial
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import {
  AppBar,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Search } from "@mui/icons-material";

export default function ({ title }) {
  const [state, setState] = React.useState(false);

  function toggleDrawer() {
    setState((o) => !o);
  }

  return (
    <div>
      <React.Fragment key={"anchor"}>
        <Button onClick={toggleDrawer}>{title}</Button>
        <Drawer
          // hideBackdrop
          anchor={"right"}
          open={state}
          onClose={toggleDrawer}
          sx={{
            bgcolor: "rgba(117, 117, 117, 0.2)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Container
            sx={{ width: "69vw", bgcolor: "azure", minHeight: "100vh", pt: 3 }}
          >
            <Stack spacing={2}>
              <Paper
                role="presentation"
                elevation={0}
                color="secondary"
                //   onClick={toggleDrawer(anchor, false)}
                //   onKeyDown={toggleDrawer(anchor, false)}
              >
                <Toolbar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5">{title}</Typography>
                  </Box>
                  <Box>
                    <TextField
                      InputProps={{
                        inputAdornment: (
                          <InputAdornment>
                            <IconButton>
                              <Search />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      size="small"
                      placeholder="Search Notes..."
                    />
                  </Box>
                  <Box>
                    <IconButton></IconButton>
                  </Box>
                </Toolbar>
              </Paper>
              <Divider />
              <ReactQuill placeholder="New note..." />
            </Stack>
          </Container>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

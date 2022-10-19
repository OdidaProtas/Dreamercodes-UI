import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountMenu from "../../../../components/auth/accountMenu";
import Logo from "../../../../components/shared/logo";
import { ChatList } from "react-chat-elements";
import { IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../../hooks";

const drawerWidth = 300;

export default function RoomsLayout({ children }) {
  const { push } = useHistory();
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography
            sx={{ flexGrow: 1 }}
            color="secondary"
            variant="h6"
            noWrap
            component="div"
          >
            Rooms
          </Typography>
          <TextField />
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{}}>
          <Logo textOnly />
        </Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            bgcolor: "background.newWhite",
          }}
        >
          <Typography sx={{ mt: 1 }}>My Rooms</Typography>
          <Box>
            <IconButton onClick={() => push("/rooms/new")}>
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <ChatList
          className="chat-list"
          dataSource={[
            {
              avatar: "http://res.cloudinary.com/dreamercodes/image/upload/v1663485380/Screenshot_2022-09-17_212633_wqhday.png",
              alt: `${user?.firstName}_avatar`,
              title: `${user?.firstName}`,
              subtitle:
                "Why don't we go to the No Way Home movie this weekend ?",
              date: new Date(),
              unread: 3,
            },
          ]}
        />
        <Box sx={{ p: 3 }}>
          <Typography>Direct Messages</Typography>
        </Box>
        <Divider />
        <ChatList className="chat-list" dataSource={[]} />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccountMenu from "../../../../components/auth/accountMenu";
import Logo from "../../../../components/shared/logo";
import { ChatList } from "react-chat-elements";

const drawerWidth = 300;

export default function RoomsLayout({ children }) {
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
        <Box sx={{ p: 2, bgcolor: "background.newWhite" }}>
          <Typography>My Rooms</Typography>
        </Box>
        <Divider />

        <ChatList
          className="chat-list"
          dataSource={[
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              alt: "kursat_avatar",
              title: "Kursat",
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
        <ChatList
          className="chat-list"
          dataSource={[
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              alt: "kursat_avatar",
              title: "Kursat",
              subtitle:
                "Why don't we go to the No Way Home movie this weekend ?",
              date: new Date(),
              unread: 3,
            },
            {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
          ]}
        />
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

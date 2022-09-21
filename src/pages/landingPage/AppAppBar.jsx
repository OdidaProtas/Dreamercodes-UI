import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "./components/AppBar";
import Toolbar from "./components/Toolbar";
import { useHistory, useLocation } from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const isCourses = /\/course/.test(pathname);
  const isAbout = /\/about/.test(pathname);
  const isCommunity = /\/community/.test(pathname);
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* <Box sx={{ flex: 1 }} /> */}
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            onClick={() => push("/")}
            sx={{ fontSize: 24, cursor: "pointer" }}
          >
            {"dreamercodes"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              onClick={() => push("/courses")}
              sx={{ ...rightLink, color: isCourses ? "pink" : "white" }}
            >
              {"Courses"}
            </Link>

            <Link
              color="inherit"
              variant="h6"
              underline="none"
              onClick={() => push("/about-us")}
              sx={{ ...rightLink, color: isAbout ? "pink" : "white" }}
            >
              {"About Us"}
            </Link>

            <Link
              color="inherit"
              variant="h6"
              underline="none"
              onClick={() => push("/blog")}
              sx={rightLink}
            >
              {"Blog"}
            </Link>

            <Link
              color="inherit"
              variant="h6"
              underline="none"
              onClick={() => push("/community")}
              sx={{ ...rightLink, color: isCommunity ? "pink" : "white" }}
            >
              {"Community"}
            </Link>

            <Link
              color="inherit"
              variant="h6"
              underline="none"
              onClick={() => push("/portal")}
              sx={rightLink}
            >
              {"Students"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              onClick={() => push("/accounts")}
              sx={{ ...rightLink, color: "secondary.main" }}
            >
              {"Sign in"}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;

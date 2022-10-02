import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Credentials from "./credentials";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Paper,
  Switch,
  Toolbar,
} from "@mui/material";
import UsersTable from "./users";
import { useDocTitle, useItem, useList } from "../../../../hooks";
import AddPersons from "../../students/add";
import { MyCalendar } from "./calendar";
import {
  ArrowBack,
  Book,
  Dashboard,
  Edit,
  ImportantDevices,
  Language,
  OpenInNew,
  WorkspacePremium,
} from "@mui/icons-material";
import DeleteDiallog from "../../../../components/dialogs/deleteDialog";
import BannersUpload from "./bannersUpload";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AppDetail() {
  const { push, goBack } = useHistory();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const val = params.get("tab") ?? "0";
  const value = parseInt(val);

  const handleChange = (event, newValue) => {
    push({ search: `?tab=${newValue}` });
  };

  const { id } = useParams();

  const { getItem: getApp, loading_item } = useItem({
    instance: "auth",
    slug: "apps",
  });

  const app = getApp();

  useDocTitle(`Organization ${app?.slug}`);

  const { loading_users: loadingUsers } = useList({
    instance: "auth",
    slug: "users",
  });

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Toolbar />
      <Box sx={{ mb: 2, display: "flex", mt: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Avatar src={app?.imageUrl} />
        </Box>
        <Box>
          <Button
            startIcon={<Edit />}
            onClick={() => push(`/dashboard/new?mode=edit&id=${id}`)}
            disableElevation
            variant="contained"
          >
            Edit
          </Button>
        </Box>

        <Box>
          <Button
            startIcon={<ArrowBack />}
            sx={{ ml: 2 }}
            onClick={goBack}
            disableElevation
            variant="contained"
          >
            Go back
          </Button>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ textTransform: "none" }} label="Apps" {...a11yProps(0)} />
          <Tab sx={{ textTransform: "none" }} label="Users" {...a11yProps(1)} />

          <Tab
            sx={{ textTransform: "none" }}
            label="Calendar"
            {...a11yProps(3)}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Banners"
            {...a11yProps(4)}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Add user"
            {...a11yProps(5)}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Settings"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid sx={{ pt: 2 }} container spacing={3}>
          <Grid item xs>
            <Paper elevation={0} sx={{ p: 1, textAlign: "center" }}>
              <Box sx={{ textAlign: "right" }}>
                <WorkspacePremium sx={{ color: "lightgray" }} />
              </Box>
              <ImportantDevices />
              <Typography sx={{ my: 1 }} variant="h5">
                Students{" "}
                <Link
                  target={"blank"}
                  href={`http://${app?.slug}.${window.location.host}/portal`}
                >
                  <OpenInNew sx={{ fontSize: "16px" }} />
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={0} sx={{ p: 1, textAlign: "center" }}>
              <Box sx={{ textAlign: "right" }}>
                <WorkspacePremium sx={{ color: "lightgray" }} />
              </Box>
              <Dashboard />
              <Typography sx={{ my: 1 }}>
                Dashboard{" "}
                <Link
                  target={"blank"}
                  href={`http://${app?.slug}.${window.location.host}/mentor`}
                >
                  <OpenInNew sx={{ fontSize: "16px" }} />
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={0} sx={{ p: 1, textAlign: "center" }}>
              <Box sx={{ textAlign: "right" }}>
                <WorkspacePremium sx={{ color: "orange" }} />
              </Box>
              <Book />
              <Typography sx={{ my: 1 }}>Blog </Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={0} sx={{ p: 1, textAlign: "center" }}>
              <Box sx={{ textAlign: "right" }}>
                <WorkspacePremium sx={{ color: "orange" }} />
              </Box>
              <Language />
              <Typography sx={{ my: 1 }}>Website</Typography>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!Boolean(loadingUsers) && <UsersTable />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Credentials />
        <Box sx={{ my: 2, bgcolor: "background.ogWhite" }}>
          <FormGroup>
            <FormControlLabel
              control={<Switch color="success" defaultChecked />}
              label="Sandbox"
            />
          </FormGroup>
        </Box>
        <Box>
          <Paper
            elevation={0}
            sx={{ p: 2, bgcolor: "background.newWhite", my: 2 }}
          >
            <Typography>APP SECURITY</Typography>
          </Paper>
          <DeleteDiallog />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MyCalendar />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <BannersUpload />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AddPersons />
      </TabPanel>
    </Box>
  );
}

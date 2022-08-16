import { Box, Button, Container, Stack, Typography } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MonitorIcon from "@mui/icons-material/Monitor";
import CasinoIcon from "@mui/icons-material/Casino";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useHistory } from "react-router-dom";
import actions from "../actions";

export default function () {
  const { push } = useHistory();

  const { handleSelectedCategory } = actions();

  function handleCategoryClick(category) {
    handleSelectedCategory(category);
    push("/portal/onboarding/select-courses");
  }

  return (
    <Container sx={{ py: 5 }}>
      <Stack spacing={3}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">What would you like to create?</Typography>
          <Typography variant="h6">
            We’ll recommend the best programming languages for beginners.
          </Typography>
        </Box>
        <Button
          onClick={() => handleCategoryClick(`mobile_development`)}
          startIcon={<SmartphoneIcon />}
          variant="contained"
          disableElevation
        >
          Mobile apps
        </Button>
        <Button
          startIcon={<MonitorIcon />}
          variant="contained"
          disableElevation
        >
          Websites
        </Button>
        <Button startIcon={<CasinoIcon />} variant="contained" disableElevation>
          Games for mobile and web
        </Button>
        <Button
          startIcon={<SettingsIcon />}
          variant="contained"
          disableElevation
        >
          Backend Systems
        </Button>
        <Button
          startIcon={<QuestionMarkIcon />}
          variant="contained"
          disableElevation
        >
          I'm not sure
        </Button>
      </Stack>
    </Container>
  );
}

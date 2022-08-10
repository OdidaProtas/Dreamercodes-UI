import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";

export default () => {
  const { push } = useHistory();
  return (
    <Container>
      <Box sx={{ mt: 3, textAlign: "center", mb: 6 }}>
        <Stack spacing={3}>
          <Typography variant="h4">Hang tight!</Typography>
          <Typography variant="h6">
            Hold on for a few seconds while we're developing your custom
            learning plan.
          </Typography>
          <Typography sx={{ color: "#40BF9C" }} variant="h3">
            That's all, Brian Odida
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper sx={{ width: "fit-content", p: 3 }}>
              <Typography>Meet one of our happy users</Typography>
              <img
                width={300}
                src="https://www.sololearn.com/Images/psycho_loading.jpg"
                alt=""
              />
              <Typography>
                {" "}
                <i>
                  "Dreamschool helped me learn to code <br /> and land a job in
                  less <br />
                  than a year"
                </i>{" "}
              </Typography>
              <Typography>
                Jeremy, 23, mobile developer from Nairobi, KE
              </Typography>
            </Paper>
          </Box>
          <Box>
            <Button
              onClick={() => push("/portal/onboarding/plan")}
              variant="contained"
            >
              Thanks
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

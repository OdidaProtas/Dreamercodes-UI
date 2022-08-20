import {
  Box,
  Stack,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
  Divider,
  IconButton,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Paypal from "../../../../components/payments/paypal";
import actions from "../actions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function () {
  const { handleOnboarded } = actions();
  const { push } = useHistory();

  const [state, setState] = useState({
    phone: "",
  });

  function handleCheckout() {
    handleOnboarded();
    push("/portal");
  }

  const { goBack } = useHistory();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs>
          <Stack spacing={3}>
            <Box sx={{ display: "flex" }}>
              <Box>
                <IconButton onClick={goBack}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="h4">Payment Details</Typography>
              </Box>
            </Box>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                Pay with MPESA
              </Typography>
              <PhoneInput
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                onlyCountries={["ke"]}
                country={"ke"}
                value={state.phone}
                onChange={(phone) => setState({ phone })}
              />
            </Paper>
            <Typography variant="h5">Other payment options</Typography>
            <Paper sx={{ p: 2 }}>
              <Paypal />
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={3}>
              <Box />
              <Typography>
                Your subscription begins today. You will be charged $12.99
                $monthly.
              </Typography>
              <Typography>
                You can cancel your PRO subscription anytime from your profile
                settings section.
              </Typography>
              <Divider />
              <Box sx={{ py: 6 }}>
                <Grid container>
                  <Grid item xs>
                    <Typography>Monthly Plan</Typography>
                    <Typography variant="h5">
                      Total to be charged now
                    </Typography>
                  </Grid>
                  <Grid item xs sx={{ textAlign: "right" }}>
                    <Typography>$12.99</Typography>
                    <Typography variant="h5">$12.99</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Button
                  onClick={handleCheckout}
                  disableElevation
                  fullWidth
                  variant="contained"
                >
                  Start My Subscription
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

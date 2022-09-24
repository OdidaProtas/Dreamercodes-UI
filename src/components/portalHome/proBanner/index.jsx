import { Container, Paper, Grid, Typography, Button, Box } from "@mui/material";
import useOnboardingProfile from "../../../pages/portal/onboarding/hooks/useOnboardingProfile";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function () {
  const { profile, loading } = useOnboardingProfile();
  const started = Number(profile?.trialStarted);
  const startDate = new Date(started);
  const toEnd = startDate.getTime() + 1000 * 60 * 60 * 24 * 14;
  let date_1 = new Date(toEnd);
  let date_2 = new Date();
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return (
    <Container sx={{ position: "absolute", bottom: -90 }}>
      <Paper sx={{ mx: 6, bgcolor: "darkcyan", textAlign: "left", p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs sx={{ display: "flex", alignItems: "center" }}>
            {profile?.isPro && (
              <Box>
                <Typography variant="h5">DREAMERCODES PRO</Typography>
                {}
                <Typography>
                  {profile?.isTrial
                    ? `Your free trial ends in ${TotalDays} days`
                    : "PRO"}
                </Typography>
              </Box>
            )}

            {!profile?.isPro && (
              <Box>
                <Typography variant="h5">DREAMERCODES PRO</Typography>
                <Typography>
                  Get 14 days of free trial PRO experience
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs>
            <img
              height={80}
              width="100%"
              src="data:image/png;base64,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"
              alt=""
            />
          </Grid>
          <Grid
            item
            xs
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <Box>
              <Button
                startIcon={
                  profile?.isPro && !profile?.isTrial ? <VerifiedIcon /> : null
                }
                color="secondary"
                disableElevation
                variant="contained"
              >
                {!profile?.isPro
                  ? "FREE TRIAL"
                  : profile?.isTrial
                  ? "Upgrade"
                  : "PRO"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

import { Button, Grid, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import ViewIcon from "@mui/icons-material/ViewArray";
import Cert from "../cert";

export default function ({ cert }) {
  const { name, id } = cert;
  const { push } = useHistory();
  return (
    <Grid item xs={3}>
      <Paper sx={{ pb: 2 }}>
        <Cert noMargin />
        <Typography sx={{ my: 2 }} variant="h5">
          {name}
        </Typography>
        <Button
          variant="contained"
          disableElevation
          startIcon={<ViewIcon />}
          onClick={() => push(`/profile/cert/${id}`)}
        >
          View Certificate
        </Button>
      </Paper>
    </Grid>
  );
}

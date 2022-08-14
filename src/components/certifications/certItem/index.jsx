import { Button, Grid, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import ViewIcon from "@mui/icons-material/ViewComfy";

export default function ({ cert }) {
  const { name, id } = cert;
  const { push } = useHistory();
  return (
    <Grid item xs={3}>
      <Paper sx={{ p: 2 }}>
        <Typography>{name}</Typography>
        <Button
          startIcon={<ViewIcon />}
          onClick={() => push(`/profile/cert/${id}`)}
        >
          View Certification
        </Button>
      </Paper>
    </Grid>
  );
}

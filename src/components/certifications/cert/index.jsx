import { Paper, Typography } from "@mui/material";

export default function () {
  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: 2, bgcolor: "azure", m: { lg: 6 }, textAlign: "center" }}
      >
        <Typography>Cert</Typography>
      </Paper>
    </>
  );
}

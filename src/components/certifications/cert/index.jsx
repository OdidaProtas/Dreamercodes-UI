import { Box, Divider, Paper, Typography } from "@mui/material";
import Logo from "../../shared/logo";

export default function ({ noMargin }) {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: "azure",
          m: { lg: noMargin ? 0 : 6 },
          textAlign: "center",
        }}
    >
        <Box>
          <Logo />
        </Box>
        <Typography>Dreamschool Certificate</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography>This is to certify that</Typography>
        <Typography variant="h4">Brian Odida</Typography>
      </Paper>
    </>
  );
}

import { Box, Grid } from "@mui/material";

import getSampleCerts from "../../../data/certs";
import CertItem from "../certItem";

export default function () {
  const certs = getSampleCerts();
  return (
    <Box sx={{ mt: 3 }}>
      <Grid container>
        {certs.map((cert, idx) => {
          return <CertItem cert={cert} key={idx} />;
        })}
      </Grid>
    </Box>
  );
}

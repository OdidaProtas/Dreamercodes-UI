import { Box, Container, Grid } from "@mui/material";

import getSampleCerts from "../../../data/certs";
import CertItem from "../certItem";

export default function () {
  const certs = getSampleCerts();
  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2} >
        {certs.map((cert, idx) => {
          return <CertItem cert={cert} key={idx} />;
        })}
      </Grid>
    </Container>
  );
}

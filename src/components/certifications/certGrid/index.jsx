import { Button, Container, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

import getSampleCerts from "../../../data/certs";
import CertItem from "../certItem";

export default function () {
  const certs = getSampleCerts();
  const { push } = useHistory();
  const hasCerts = Boolean(certs.length);
  return (
    <Container sx={{ mt: 3 }}>
      {hasCerts && (
        <Grid container spacing={2}>
          {certs.map((cert, idx) => {
            return <CertItem cert={cert} key={idx} />;
          })}
        </Grid>
      )}

      {!hasCerts && (
        <>
          <Typography>Complete courses to earn certifications</Typography>
          <Button onClick={() => push("/portal")}>Show Courses</Button>
        </>
      )}
    </Container>
  );
}

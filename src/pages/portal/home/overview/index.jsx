import { Box, Container, Typography } from "@mui/material";
import Cards from "../../../../components/portalHome/cards";
import Hero from "../../../../components/portalHome/hero";
import ProBanner from "../../../../components/portalHome/proBanner";
import Footer from "../../../../components/shared/footer";

export default function () {
  return (
    <>
      <Container>
        <Box sx={{ textAlign: "center", mt: 4, position: "relative" }}>
          <Hero />
          <ProBanner />
        </Box>
        <Box sx={{ pt: 13 }}>
          <Box sx={{ pt: 6 }}>
            <Cards />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

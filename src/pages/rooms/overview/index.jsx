import { Box, Container, Grid, Paper } from "@mui/material";
import Chat from "../components/chat";

export default function RoomsOverview() {
  return (
    <Container sx={{ pt: 3 }}>
      <Grid spacing={3} container>          
        <Grid item xs={8} elevation={0} sx={{bgcolor:"background.newWhite"}} component={Paper} spacing={2}>
          <Chat />
        </Grid>
        <Grid item xs>
          <Box sx={{ ml: 3, p: 2 }} component={Paper}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus magni, consequatur soluta similique vitae corporis
            labore praesentium! Facilis quisquam distinctio ipsam debitis
            inventore officia tempore minus dignissimos, commodi, cupiditate
            reiciendis!
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

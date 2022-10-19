import { Grid, TextField } from "@mui/material";

export default function Addroom() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <form onSubmit={handleSubmit}></form>
          <TextField fullWidth label="Room name" />
        </Grid>
        <Grid item xs>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          repudiandae rem doloremque, neque iusto optio. Molestias, consequuntur
          magnam necessitatibus praesentium adipisci, omnis facere odit vero
          voluptatem distinctio alias tempore quibusdam.
        </Grid>
      </Grid>
    </>
  );
}

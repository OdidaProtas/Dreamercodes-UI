import { Box, Button, Grid } from "@mui/material";
import CourseCard from "../../../../../components/mentor/courseCard";
import Loader from "../../../../../components/shared/loader";
import { useList } from "../../../../../hooks";
import Typography from "../../../../landingPage/components/Typography";

export default function BannersUpload() {
  const { getItemsArray, loading_banners: loadingBanners } = useList({
    slug: "banners",
    instance: "auth",
  });

  const banners = getItemsArray();

  console.log(banners);

  if (loadingBanners) {
    return <Loader />;
  }

  if (!banners.length) {
    return (
      <Box
        sx={{
          minHeight: "48vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography>You havent added any banners</Typography>
          <br />
          <Button disableElevation variant="contained" color="secondary">
            Add new banner
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Grid>
      <Grid container>
        <Grid item xs>
          <CourseCard />
        </Grid>
      </Grid>
    </Grid>
  );
}

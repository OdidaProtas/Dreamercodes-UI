import {
  Button,
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useHistory } from "react-router-dom";
import AddBlogPostCategory from "../../../../components/dialogs/addBlogPostCategory";
import LoaderComponent from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";
import { useStateValue } from "../../../../state/hooks";

export default function () {
  const { push } = useHistory();
  const state = useStateValue();
  useDocTitle("Blog");
  const handleClikAddButton = (e) => {
    push("/mentor/blog/article/new");
  };

  const { getItemsArray: getSubTopics } = useList({
    instance: "courses",
    slug: "blog-topics",
  });

  const subTopics = getSubTopics();
  const loadingSubTopics = state["loading_blog-topics"];

  const { getItemsArray: getArticles } = useList({
    instance: "courses",
    slug: "articles",
  });

  const articles = getArticles();
  const loadingArticles = state["loading_articles"];
  return (
    <>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5">Blog</Typography>
            <Typography>Manage Blog articles</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <AddBlogPostCategory />
            <Box>
              <Button
                sx={{ ml: 1 }}
                onClick={handleClikAddButton}
                disableElevation
                variant="contained"
              >
                Add Blog article
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5">0 Posts</Typography>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ minWidth: 100 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Sort Posts
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"newest"}
                        label="Sort Posts"
                        onChange={"handleChange"}
                      >
                        <MenuItem value={"newest"}>Newest</MenuItem>
                        <MenuItem value={"oldest"}>Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              {loadingArticles && (
                <Box
                  sx={{
                    height: 144,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ my: 8 }}>
                    <CircularProgress desc="articles" />
                  </Box>
                </Box>
              )}
              <Grid sx={{ mt: 2 }} spacing={2} container>
                {Boolean(articles.length) &&
                  articles.map((article) => {
                    return (
                      <Grid key={article.id} item xs={6}>
                        <Card sx={{ maxWidth: 345, mt: 2 }}>
                          <CardMedia
                            component="img"
                            height="144"
                            image={article.bannerUrl}
                            alt={article.title}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {article.title}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Preview</Button>
                            <Button
                              disableElevation
                              variant="contained"
                              size="small"
                            >
                              Publish{" "}
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </Paper>
          </Grid>
          <Grid sx={{ bgcolor: "azure", textAlign: "center" }} item xs={3}>
            <Typography variant="h5">Categories</Typography>

            {loadingSubTopics && (
              <Box
                sx={{
                  minHeight: 144,
                  textAlign: "center",
                  my: 4,
                }}
              >
                <Box>
                  <CircularProgress />
                </Box>
              </Box>
            )}
            {!loadingSubTopics && Boolean(subTopics.length) && (
              <>
                {subTopics.map((s) => {
                  return (
                    <Card sx={{ maxWidth: 345, mt: 2 }}>
                      <CardMedia
                        component="img"
                        height="50"
                        image={s.imageUrl}
                        alt={s.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {s.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            )}

            {!loadingSubTopics && !Boolean(subTopics.length) && (
              <>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ my: 4 }}>
                    No categories have been added
                  </Typography>

                  <AddBlogPostCategory />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

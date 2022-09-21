import { Box, Button, CircularProgress, Container } from "@mui/material";
import { lazy, Suspense } from "react";
import { useState } from "react";
import { useAxios, useDocTitle, useList, useToast } from "../../hooks";
import AppAppBar from "../landingPage/AppAppBar";
import AppFooter from "../landingPage/AppFooter";
import Typography from "../landingPage/components/Typography";
import ProductHero from "../landingPage/ProductHero";
import withRoot from "../landingPage/withRoot";
const ReactQuill = lazy(() => import("react-quill"));
import "react-quill/dist/quill.snow.css";
import { useDispatch, useStateValue } from "../../state/hooks";
import Loader from "../../components/shared/loader";

function About() {
  useDocTitle("About Us");

  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const { loading, axiosAction } = useAxios("courses");
  const { showToast } = useToast();

  const [editor, setEditor] = useState(false);
  const toggleEditor = () => setEditor((p) => !p);

  function successHandler({ data }) {
    dispatch({
      type: "ADD_ENTRY",
      payload: data,
      context: "about",
    });
    showToast("success", "About saved");
  }

  function errorHandler(error) {
    console.error(error);
    showToast("error", "An error occured");
  }

  function handleSubmit(e) {
    e.preventDefault();
    axiosAction({
      successHandler,
      errorHandler,
      endpoint: "/about",
      payload: { body: value },
      method: "post",
    });
  }

  const { getItemsArray: getAbout, loading_about: loadingAbout } = useList({
    slug: "about",
    instance: "courses",
  });

  const about = getAbout()[0];

  return (
    <>
      <AppAppBar />
      <ProductHero about />

      <Box sx={{ my: 3 }}>
        {loadingAbout && <Loader />}
        {Boolean(about) && !loadingAbout && (
          <>
            <div sx={{ textAlign: "right" }}>
              <button disabled>edit info</button>
            </div>
            <Container
              sx={{ my: 6 }}
              dangerouslySetInnerHTML={{
                __html: about?.body,
              }}
            ></Container>
          </>
        )}

        {!Boolean(about) && !loadingAbout && (
          <Suspense fallback={<Loader />}>
            <Typography variant="h6">No about information is added</Typography>
            {!editor && (
              <Typography sx={{ my: 5 }}>
                Sign in with an administrator account to add about
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              {editor && (
                <Container sx={{ my: 3 }}>
                  <ReactQuill
                    onChange={setValue}
                    value={value}
                    placeholder="Write about draft"
                  />
                </Container>
              )}
              <Container>
                {
                  <Button
                    fullWidth
                    disabled={loading}
                    type={editor ? "submit" : "button"}
                    onClick={editor ? () => {} : toggleEditor}
                    disableElevation
                    variant="contained"
                  >
                    {editor && loading ? <CircularProgress size={20} /> : ""}
                    {editor && !loading ? "Save draft" : ""}
                    {!editor ? "Add About Information" : ""}
                  </Button>
                }
              </Container>
            </form>
          </Suspense>
        )}
      </Box>
      <AppFooter />
    </>
  );
}

export default withRoot(About);

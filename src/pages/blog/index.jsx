import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import post1 from "./blog-post.1.md";
import post2 from "./blog-post.2.md";
import post3 from "./blog-post.3.md";
import useDocTitle from "../../hooks/useDocTitle";
import { useList } from "../../hooks";
import { useMemo } from "react";
import { useStateValue } from "../../state/hooks";
import theme from "../landingPage/theme";
import withRoot from "../landingPage/withRoot";

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [{ title: "September 2022", url: "#" }],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default withRoot(function () {
  useDocTitle("Blog");

  useList({
    slug: "blog-topics",
    instance: "courses",
  });

  const { getItemsArray: getArticlesArray } = useList({
    instance: "courses",
    slug: "articles",
  });

  const state = useStateValue();
  const loading = state["loading_blog-posts"];

  const sections = useMemo(() => {
    return Object.keys(state["blog-topics"] ?? [])
      .map((id) => state["blog-topics"][id])
      .map((topic) => ({
        ...topic,
        url: `blog/article${topic.slug}`,
      }));
  }, [state["blog-topics"]]);

  const articles = getArticlesArray();

  const mainFeaturedPost = articles.map((a) => {
    return {
      title: a.title,
      description: (
        <div
          dangerouslySetInnerHTML={{
            __html: a.description,
          }}
        ></div>
      ),
      image: a.bannerUrl,
      imageText: a.title,
      linkText: "Continue reading…",
    };
  })[0];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header loading={loading} title="Dreamercodes" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
});

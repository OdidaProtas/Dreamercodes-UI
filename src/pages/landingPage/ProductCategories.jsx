import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "./components/Typography";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://wallpaperaccess.com/full/3909258.jpg",
    title: "React.js",
    width: "40%",
  },
  {
    url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAAD4CAMAAACXF/l7AAAAwFBMVEX///9nt/dCpfUNR6Fhtffn8/5bs/eo1Prb4+8ANpvN5vzr9f4ARKCMx/kwn/QKRqEVR5USSJwVRpFKqPVwu/jv9/7J5PwXRYsXQYSTyvkWRo8AQJ8WPnzQ5/zi6PIAM5oVO3Y/jtC6xuAFHD8WOW8PLFkAPJ5JmN0XN3ISMWILJlAIIEan0/qIwvje7v0+kdkALXgAPo4XP3sXO3IJFjwCDjANO4MGHT8MM3EAFTQOPooFJ1wAEGcAKYUALJgAJpf069WNAAAEvElEQVR4nO3ci1baQBAGYCAUrUW5tCJSVCIqoPaC99ravv9bdZMAJSGQ3exu+Hc6/wt4vjPzZ7gdSyUOh8PhcDgcDqdUOnxnINtGzHJSMxAQzEmtrJ0qW4yHLYQtH7atiMJzYYvtcF8Iz4UtxsN9IWuplulYYPqyR2jH2BKnELKUy9wX42ELWQvMrWRLAkPHUq0eblsRhXeMrIX7YiGUdqzDFqoWmO6bmAtK93nHyFq4LxbCO8YW2+G+0LUQ2rEyJQuhW1mm1BdCc4HpPqXPYbj7cQolC0pfKO0Ydz9hIXQrKfUFxcJ9IWvhW2khlHaM0u8tKT3HKH1faeS3cCAW7gtZC8ytpNR97gtbbIdSX/hWxkNox2A+h+FbmQiIhfvCFtvhW4k5F+5+wkLoVlLqC4qF+xKnkOoLJQuhHaNkodQXShZKO4ZiMfF/SP6zW7lzu6Ob204RFolbeVyr6qa2X4gle8eO9f8MJUu1EItEX5yxSPXFFQuhHUOxFPSbq0IsBjAw3S/prxlM9w1oYPpiQINm0dEg9UVXg9UXPQ3ejuXXoFryaBD7Mo/q22Zki+psMLufT4PbF3UNvkVeg90XNQ3Oa359jQs7Jq9xxSKhkdmxKoYl63rKdH//4OMnDMvm2cj0Zf+gUtHUGLNs0shaNDUGLRs0En2JLFoao5a1vZHqS6WiqTFsSZ+N/I5paYxb0jSqlpwaC5YUjUJfNDRWLCuaHJYcGkuW+FNA7lYmLcoaa5bl2aj3JZfGomVZk9eipLFqWWhy9UVZY9ky603OvihqrFuC2eTvi5KmAIvQaO2YtKYQi0yyLBIahyyZGqcsGRrHLBs1zlk2aBy0rNXAWL4oWNZoYCwqc1mjyf79WEFRtaRoYCxqO5aqcdqS0MBY1HdsReO8ZUkDY8m3YzENCctMQ8QSashYhKZ8vG3ELF+1LZXKt91tK+Y50daMXr6fblsxj65mNO53qWgCS7c3JbFpwtLvHrWbFDSj8UBYeu1mq+78po0uhEVgms1m67PjGmG5iwYjMECavRwaYQmW7KgdYbyGw5rR5OI+GkyEaXk4vVHVhJY70ZjQEmIaVzAatd4ElqgxvQXGq+NoVGYzupxE7Y9hvDrOpnWkNYHlPgXjoiawhO1fwXh1157Q/vVkNpgA045hXNP414vBrE4GSpO9aYElGEx/Dcal3ghLMJjBeow7s/FvwsEsYdorGFfujf8QDSbYsgTGW4oTsxGWf4NZrFk7QXGjN/7wJhhMEpOUOKHxH27CwcQwTfECMwWDtGlpvfEfF4MZh5h+t91qpErgNaFlhhGTGfR7QrKWgr1pwjJcbNnFoNv0NkpCDc57z7gmtERbNpn0X730orgxm8ASbdnl+DV7JtC9iSxiMpMnqZEgauazCS3Pw8unVkPNArhpwvL8fP0yVWNgavzHH8OX17QzL6fB2bS9A//x51OrtfLqy0lN59d0OtWxBBqY7wjO3zQtUL05f9O0QG3a+ZmmBeq9pwkN0mwUb2WKpo7zFDCgoTUbpN6wJq4Bup4mngK0ZkNKQ6w3pDTEricpDa3eXJGaDa1No6Xh3tgJa5IaYr3B0fx+r5uzPzCa010D2TaCw+FwOBwOh5Oev++s49eZtSQnAAAAAElFTkSuQmCC",
    title: "Flutter",
    width: "20%",
  },
  {
    url: "https://miro.medium.com/max/512/1*91cJ4VOJQvGNGiMuKAdjjg.png",
    title: "Android",
    width: "40%",
  },
  {
    url: "http://blog.pusher.com/wp-content/uploads/2015/05/django-logo.png",
    title: "Django",
    width: "38%",
  },
  {
    url: "https://res.cloudinary.com/practicaldev/image/fetch/s--NkEd4eMp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yzk14w928sebjxk3h3s8.png",
    title: "Node.js",
    width: "38%",
  },
  {
    url: "https://wallpaperaccess.com/full/3910937.png",
    title: "Angular",
    width: "24%",
  },
  {
    url: "https://miro.medium.com/max/700/1*-uckV8DOh3l0bCvqZ73zYg.png",
    title: "Spring Boot",
    width: "40%",
  },
  {
    url: "https://www.pngfind.com/pngs/m/344-3441378_ruby-on-rails-ruby-on-rails-logo-png.png",
    title: "Rails",
    width: "20%",
  },
  {
    url: "https://wallpaperaccess.com/full/4584350.jpg",
    title: "Vue",
    width: "40%",
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        All the mordern tools you'll ever need
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}

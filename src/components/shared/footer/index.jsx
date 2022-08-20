import { Box } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
export default function () {
  return (
    <Box sx={{ minHeight: "20vh", bgcolor: "rgb(45,56,70)", mt: 8 }}>
      <Box sx={{ minHeight: "10vh" }}>
        <Box
          sx={{
            color: "lightgray",
            height: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            pt: 3,
          }}
        >
          <LinkedInIcon />
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
          <YouTubeIcon />
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#18171d", minHeight: "10vh" }}></Box>
    </Box>
  );
}

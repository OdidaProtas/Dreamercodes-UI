import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LandscapeIcon from "@mui/icons-material/Landscape";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CircularProgress,
  Divider,
  Paper,
  Skeleton,
} from "@mui/material";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";

export default function CourseCard({
  course,
  handleClick,
  disabled,
  textOnly,
}) {
  const { push } = useHistory();

  const { url } = useRouteMatch();

  const { imageUrl, bannerUrl, title, name, id } = course;

  return (
    <Paper
      onClick={
        handleClick
          ? () => handleClick(id)
          : disabled
          ? () => {}
          : () => push(`${url}/${course.id}`)
      }
      elevation={0}
      sx={{
        bgcolor: "rgba(117, 117, 117, 0.2)",
        backgroundImage: `url(${bannerUrl})`,
        backdropFilter: "blur(200px)",
        cursor: "pointer",
        pt: textOnly ? 0 : 2,
        borderRadius: textOnly ? "4px" : "none",
      }}
    >
      <Box>
        {!textOnly && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              sx={{ width: 69, height: 69, mb: 2 }}
              src={imageUrl}
              alt={title}
            >
              <LandscapeIcon />
            </Avatar>
          </Box>
        )}
        <Box
          sx={{
            bgcolor: "#d3e3fd",
            p: 1,
            borderRadius: textOnly ? "4px" : "none",
          }}
        >
          <Typography variant="h6">
            {title ?? name?.split("_").join(" ")}
          </Typography>
          <div>{}</div>
        </Box>
      </Box>
    </Paper>
  );
}

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

export default function CourseCard({ course, handleClick, disabled }) {
  const { push } = useHistory();

  const { url } = useRouteMatch();

  const { imageUrl, bannerUrl, title, description, id } = course;

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
        borderBottom: "1px solid lightgray",
        cursor: "pointer",
        pt: 2,
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar style={{ width: 69, height: 69 }} src={imageUrl} alt={title}>
            <LandscapeIcon />
          </Avatar>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ bgcolor: "azure", p: 1 }}>
          <Typography variant="h5">{title}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

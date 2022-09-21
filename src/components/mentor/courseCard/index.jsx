import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Skeleton } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function CourseCard({ course, imgHeight }) {
  const { push } = useHistory();
  const { title, bannerUrl, description } = course;
  return (
    <Card
      elevation={0}
      onClick={() => push(`/mentor/courses/${course.id}`)}
      sx={{ maxWidth: 345, bgcolor: "azure" }}
    >
      <CardActionArea>
        {bannerUrl && (
          <CardMedia
            component="img"
            height={imgHeight ?? "140"}
            image={bannerUrl}
            alt={title}
          />
        )}

        {!bannerUrl && (
          <Skeleton
            variant="rectangular"
            fullWidth
            disableRipple
            height={144}
            animation={false}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

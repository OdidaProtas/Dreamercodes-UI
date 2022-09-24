import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SingleEditor from "../editors/singleEditor";
import { Grid } from "@mui/material";
import useItem from "../../hooks/useItem";

export default function VerticalTabs() {
  const { getItem: getSubTopic } = useItem({
    instance: "courses",
    slug: "subtopics",
  });

  const subtopic = getSubTopic();

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        p: 3,
        borderRadius: "4px",
        maxHeight: "72vh",
        overflow: "auto",
      }}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs>
            <Box>
              <div
                dangerouslySetInnerHTML={{ __html: subtopic?.description }}
              ></div>
            </Box>
          </Grid>
          {subtopic?.isTask && (
            <Grid item xs={5}>
              <SingleEditor />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

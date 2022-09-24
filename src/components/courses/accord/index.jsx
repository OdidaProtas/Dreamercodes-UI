import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { Stack, Paper } from "@mui/material";
import DetailTimeline from "../detailTimeline";
import { useHistory } from "react-router-dom";
import { useList } from "../../../hooks";
import Loader from "../../shared/loader";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function () {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { push } = useHistory();

  const { getItemsArray: getUnits, loading_units: loadingUnits } = useList({
    instance: "courses",
    slug: "units",
  });

  const units = getUnits();

  if (loadingUnits) {
    return <Loader desc="Units" />;
  }

  return (
    <div>
      {units.map((subject) => {
        return (
          <Accordion
            key={subject.id}
            expanded={expanded === subject.id}
            onChange={handleChange(subject.id)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{subject?.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={3}>
                <Paper elevation={0} sx={{ bgcolor: "azure", p: 2 }}>
                  <DetailTimeline />
                </Paper>
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

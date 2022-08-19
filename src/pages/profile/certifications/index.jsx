import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";

import ShareIcon from "@mui/icons-material/Share";
import { lazy, Suspense } from "react";

const Certificate = lazy(() =>
  import("../../../components/certifications/cert")
);

export default function () {
  const { id } = useParams();

  const { push } = useHistory();
  const { pathname } = useLocation();

  const isProfile = /\/profile/.test(pathname);

  const handleShareCert = () => {
    push(`/cert/${id}`);
  };


  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography>DS Certificate</Typography>
          <Typography>Certificate id: #_{id}</Typography>
        </Box>
        <Box>
          {isProfile && (
            <IconButton onClick={handleShareCert}>
              <ShareIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Suspense
        fallback={
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
            <div>Loading certificate...</div>
          </div>
        }
      >
        <Certificate />
      </Suspense>
    </>
  );
}

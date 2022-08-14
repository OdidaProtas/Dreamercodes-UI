import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
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

  const handleShareCert = async () => {
    await navigator.share(`/cert/${id}`);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {isProfile && (
            <IconButton onClick={handleShareCert}>
              <ShareIcon />
            </IconButton>
          )}
        </Box>
        <Box>
          <Typography>DS Certificate</Typography>
          <Typography>Certificate id: #_{id}</Typography>
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

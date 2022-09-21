import { Alert, Box, Divider, Typography } from "@mui/material";
import { Console } from "console-feed";
import { useStateValue } from "../../../state/hooks";

export default function ({ error, stack }) {
  const { debug } = useStateValue();
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Box>
        <Alert icon={false} severity="error">
          <Box>
            <Typography variant="h6">An error occured on this page</Typography>
            <Divider sx={{ my: 2 }} />
            {debug && (
              <>
                <Typography>Error details:</Typography>
                <Typography sx={{ my: 2 }}>{error}</Typography>
                <Typography>At: {stack}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" sx={{ my: 2 }}>
                  You are seeing this error because debug has been set to true.
                </Typography>
                <Console />
              </>
            )}
          </Box>
        </Alert>
      </Box>
    </Box>
  );
}

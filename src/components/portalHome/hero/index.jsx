import { Star } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import useDocTitle from "../../../hooks/useDocTitle";

export default function () {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  useDocTitle(`${user?.firstName} ${user?.lastName}`);
  return (
    <>
      <Box
        sx={{
          height: "45vh",
          bgcolor: "azure",
          borderBottomRightRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box>
            <Avatar sx={{ height: 144, width: 144 }}></Avatar>
          </Box>
          <Box sx={{ ml: 3, textAlign: "left" }}>
            <Stack spacing={2}>
              <Typography variant="h4">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="h6">1 following 0 followers</Typography>
              <Box>
                <Typography variant="h6">
                  <Star sx={{ color: "orange" }} />
                  <Star sx={{ color: "gray" }} />
                  <Star sx={{ color: "gray" }} />
                  <Star sx={{ color: "gray" }} />
                  <Star sx={{ color: "gray" }} />
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import { Box } from "@mui/material";
import Navigation from "../features/navigation";
import Login from "./login";

export default function SuAdmin() {
  const navoptions = [
    {
      exact: true,
      children: <Login />,
      route: "login",
      ssr: <Login />,
    },
  ];

  return (
    <Box>
      <Navigation options={navoptions} />
    </Box>
  );
}

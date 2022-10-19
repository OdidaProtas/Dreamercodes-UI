import { Chat } from "@mui/icons-material";
import { Dialog, Fab } from "@mui/material";

export default function Bot() {
  return (
    <>
      <Fab sx={{ position: "fixed", bottom: 18, right: 18 }}>
        <Chat />
      </Fab>
      <Dialog     >
      </Dialog>
    </>
  );
}

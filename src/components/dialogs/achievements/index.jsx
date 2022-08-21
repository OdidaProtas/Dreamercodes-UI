import { Button, Dialog, DialogTitle } from "@mui/material";
import useDialog from "../../../hooks/useDialog";

export default function () {
  const [open, toggle] = useDialog({ scope: "LOCAL", name: "achievements" });

  return (
    <>
      <Button variant="outlined" onClick={toggle} fullWidth>
        Show More
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onclose={toggle}>
        <DialogTitle>Achievements</DialogTitle>
      </Dialog>
    </>
  );
}

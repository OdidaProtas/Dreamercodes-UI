import { FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { useDialog } from "../../../hooks";
import { useStateValue } from "../../../state/hooks";

export default function FilterUser() {
  const { uploadProgress } = useStateValue();
  const [open, toggle] = useDialog({ scope: "LOCAL" });
  return (
    <>
      <IconButton onClick={toggle}>
        <FilterList />
      </IconButton>
      <Dialog
        fullWidth
        onClose={toggle}
        sx={{ bgcolor: "background.newWhite", backdropFilter: "blur(8px)" }}
        hideBackdrop
        open={open}
      >
        <DialogContent dividers sx={{ textAlign: "center" }}>
          <DialogContentText variant="h6">Filter users</DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"age"}
              label="Role"
              onChange={""}
            >
              <MenuItem value={10}>Admins</MenuItem>
              <MenuItem value={20}>Staff</MenuItem>
              <MenuItem value={30}>Students</MenuItem>
              <MenuItem value={30}>Support</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Save Filters"
            />
          </FormGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ({ value, handleChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Editor Theme</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Editor Theme"
          onChange={handleChange}
        >
          <MenuItem value={"solarized_light"}>Solarized Light</MenuItem>
          <MenuItem value={"solarized_dark"}>Solarized Dark</MenuItem>
          <MenuItem value={"github"}>Github</MenuItem>
          <MenuItem value={"dracula"}>Dracula</MenuItem>
          <MenuItem value={"terminal"}>Terminal</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
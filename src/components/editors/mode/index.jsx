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
        <InputLabel id="demo-simple-select-label">Editor mode</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Editor mode"
          onChange={handleChange}
        >
          <MenuItem value={"javascript"}>Javascript</MenuItem>
          <MenuItem value={"java"}>Java</MenuItem>
          <MenuItem value={"python"}>Python</MenuItem>
          <MenuItem value={"ruby"}>Ruby</MenuItem>
          <MenuItem value={"csharp"}>C#</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
import AceEditor from "react-ace";

import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Send from "@mui/icons-material/Send";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";

import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";
import { useRef } from "react";
import Themes from "../themes";
import Mode from "../mode";
import Output from "../output";

export default function () {
  const [mode, setMode] = useState("javascript");
  const [theme, setTheme] = useState("solarized_light");
  const [code, setCode] = useState("");

  const editor = useRef();

  function onChange(newValue) {
    setCode(newValue);
  }

  function run() {
    try {
      new Function(code)();
    } catch (e) {
      console.error(e);
    }
  }

  function handleModeChange(e) {
    setMode(e.target.value);
  }

  function handleThemeChange(e) {
    setTheme(e.target.value);
  }

  function handleReset() {
    setCode("");
    editor?.current?.setValue("", 0);
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5">DS IDE</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Themes value={theme} handleChange={handleThemeChange} />
          <Box sx={{ my: 2 }}>
            <Mode handleChange={handleModeChange} value={mode} />
          </Box>
        </Grid>
        <Grid item xs>
          <AceEditor
            ref={editor}
            mode={mode}
            theme={theme}
            placeholder={`Write ${mode} code here...`}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            height={"50vh"}
            width={"100%"}
            showGutter
            fontSize={15}
          />
          <div>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}>
                <Button
                  disabled={mode !== "javascript"}
                  onClick={run}
                  startIcon={<PlayArrowIcon />}
                  disableElevation
                  variant="contained"
                  sx={{ my: 2 }}
                >
                  Run Code
                </Button>
                <Button
                  disabled
                  onClick={handleReset}
                  startIcon={<HighlightOffIcon />}
                  disableElevation
                  variant="contained"
                  color="error"
                  sx={{ my: 2, ml: 2 }}
                >
                  Reset
                </Button>
              </div>
              <div>
                <Button
                  disabled
                  onClick={run}
                  startIcon={<Send />}
                  disableElevation
                  color="success"
                  variant="contained"
                  sx={{ my: 2 }}
                >
                  Submit
                </Button>
              </div>
            </div>

            <Box>
              <Typography>Console Output: </Typography>
              <Divider />
              <Box sx={{ mt: 3 }}>
                <Output />
              </Box>
            </Box>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

import AceEditor from "react-ace";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
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

import "ace-builds/src-noconflict/theme-solarized_dark";

import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";
import { useRef } from "react";
import Themes from "../themes";
import Mode from "../mode";
import Output from "../output";
import network from "../../../network";
import { useAxios } from "../../../hooks";
// import { CopyBlock } from "react-code-blocks";

export default function () {
  const [mode, setMode] = useState("javascript");
  const [theme, setTheme] = useState("solarized_light");
  const [code, setCode] = useState("");

  const { endpoints } = network;
  const { loading, axiosAction } = useAxios("compiler");

  const [codeOutPut, setCodeOutput] = useState("");

  const editor = useRef();

  function onChange(newValue) {
    setCode(newValue);
  }

  function run() {
    axiosAction({
      method: "post",
      payload: { code },
      errorHandler,
      successHandler,
      endpoint: `${endpoints.COMPILER_URLS.exec}/${mode}`,
    });
  }

  function successHandler(res) {
    const { data } = res;
    console.log(data);
  }

  function errorHandler(err) {
    console.error(err);
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
        <Grid item sx={{ pt: 3 }} xs={4}>
          <Typography variant="h5">1.0 Practice lesson</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">
            1. Write your first {mode} program
          </Typography>

          <Typography sx={{ my: 3 }}>console.log("Hello World!")</Typography>

          {/* <CopyBlock
            text={"console.log('hello world')"}
            language={mode}
            showLineNumbers
            wrapLines
          /> */}
        </Grid>
        <Grid item xs>
          <Grid container sx={{ my: 1 }} spacing={2}>
            <Grid item xs>
              <Themes value={theme} handleChange={handleThemeChange} />
            </Grid>
            <Grid item xs>
              <Mode handleChange={handleModeChange} value={mode} />
            </Grid>
            <Grid item xs>
              <div style={{ display: "flex" }}>
                <div style={{ flexGrow: 1 }}>
                  <Button
                    // disabled={mode !== "javascript" || mode !== "python"}
                    onClick={run}
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? null : <PlayArrowIcon />}
                    disableElevation
                    variant="contained"
                  >
                    {loading ? <CircularProgress size={20} /> : "Run Code"}
                  </Button>
                  {/* <Button
                  disabled
                  onClick={handleReset}
                  startIcon={<HighlightOffIcon />}
                  disableElevation
                  variant="contained"
                  color="error"
                  sx={{ my: 1, ml: 2 }}
                >
                  Reset
                </Button> */}
                </div>
                <div>
                  {/* <Button
                  disabled
                  onClick={run}
                  startIcon={<Send />}
                  disableElevation
                  color="success"
                  variant="contained"
                  sx={{ my: 1 }}
                >
                  Submit
                </Button> */}
                </div>
              </div>
            </Grid>
          </Grid>
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
            <Box>
              {loading && <LinearProgress />}
              <Output />
            </Box>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

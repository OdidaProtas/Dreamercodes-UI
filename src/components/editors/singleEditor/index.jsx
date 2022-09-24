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

import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";

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
  const [code, setCode] = useState("");

  const { endpoints } = network;
  const { loading, axiosAction } = useAxios("compiler");

  const editor = useRef();

  function onChange(newValue) {
    setCode(newValue);
  }

  function run() {
    // console.clear();
    axiosAction({
      method: "post",
      payload: { code },
      errorHandler,
      successHandler,
      endpoint: `${endpoints.COMPILER_URLS.exec}/${"javascript"}`,
    });
  }

  function successHandler(res) {
    const { data } = res;
    console.log(data);
  }

  function errorHandler(err) {
    console.error(err);
  }

  function handleReset() {
    setCode("");
    editor?.current?.setValue("", 0);
  }

  return (
    <>
      <AceEditor
        ref={editor}
        mode={"javascript"}
        theme={"solarized_light"}
        placeholder={`Write code here...`}
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        height={"39vh"}
        width={"100%"}
        showGutter
        fontSize={15}
      />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs>
          <Button
            disabled={loading}
            onClick={run}
            disableElevation
            variant="contained"
            fullWidth
          >
            {loading ? <CircularProgress size={20} /> : "Run code"}
          </Button>
        </Grid>
      </Grid>
      <div>
        <Box>
          {loading && <LinearProgress />}
          {Boolean(console) && <Output />}
        </Box>
      </div>
    </>
  );
}

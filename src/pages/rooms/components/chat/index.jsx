import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-chat-elements/dist/main.css";
import { MessageList, Navbar } from "react-chat-elements";
import { Box, Button, IconButton, Paper } from "@mui/material";
import { KeyboardVoice, MoreVert, Send } from "@mui/icons-material";
export default function Chat() {
  return (
    <Box sx={{ height: "69vh", position: "relative" }}>
      <Navbar
        left={<div style={{ color: "yellow" }}>Logo</div>}
        // center=<div>Home</div>
        right={
          <IconButton>
            <MoreVert sx={{ color: "secondary" }} />
          </IconButton>
        }
        type="dark"
      />
      <Box sx={{ pt: 2 }}></Box>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[
          {
            position: "left",
            type: "text",
            title: "Kursat",
            text: "Give me a message list example !",
          },
          {
            position: "right",
            type: "meetingLink",
            title: "Emre",
            text: "That's all.",
          },
        ]}
      />
      <Paper
        sx={{
          display: "flex",
          mt: 2,
          position: "absolute",
          bottom: 0,
          width: "100%",
          p: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <ReactQuill />
        </Box>
        
        <Box sx={{ ml: 2, display:"flex", alignItems:"flex-end" }}>
          <Box >
            <IconButton>
                <KeyboardVoice/>
            </IconButton>
            <Button variant="contained" disableElevation>
              <Send />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

import { Box, Divider, Paper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function ({ desc, value, handleChange, isEdit, existing }) {
  const [image, setImage] = React.useState(null);

  const onDrop = React.useCallback((acceptedFiles) => {
    handleChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });
  const { ref, ...rootProps } = getRootProps();

  useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      };
      reader.readAsDataURL(value);
    }
  }, [value]);

  return (
    <Paper
      sx={{
        height: "100%",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      {...rootProps}
      elevation={0}
    >
      <Box>
        {(Boolean(image) || existing) && (
          <Box>
            <img
              height={144}
              src={image ? image : isEdit ? existing : image}
              alt="Uploaded Image"
            />
            <Divider />
          </Box>
        )}
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop files here" : desc}</p>
      </Box>
    </Paper>
  );
}

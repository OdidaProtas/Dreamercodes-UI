import { Button, Typography } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/lottie/error.json";

export default class ErrorComponents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    const { desc, action } = this.props;
    return (
      <div style={{ textAlign: "center", marginLeft: "-144px" }}>
        <Lottie options={defaultOptions} height={270} width={270} />
        <Typography variant="h6">{desc}</Typography>
        <Typography>
          <em>{action}</em>{" "}
        </Typography>
      </div>
    );
  }
}

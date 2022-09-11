import { Typography } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/lottie/loading.json";

export default class LoaderComponent extends React.Component {
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

    const { desc } = this.props;

    return (
      <>
        <div style={{ textAlign: "center", marginLeft: "-144px" }}>
          <Lottie options={defaultOptions} height={270} width={270} />
          <Typography variant="h5" >Loading {desc} Data...</Typography>
        </div>
      </>
    );
  }
}

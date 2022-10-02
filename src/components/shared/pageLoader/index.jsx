import { Skeleton, Typography } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/lottie/page.json";

export default class PageLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.aimation) {
      return (
        <>
          <Skeleton
            sx={{ borderRadius: "4px" }}
            height={9}
            width={600}
            variant="rectangular"
          ></Skeleton>
        </>
      );
    }
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
        <div style={{ textAlign: "center" }}>
          <Lottie options={defaultOptions} height={270} width={270} />
          <Typography variant="h5">Loading Requested Page...</Typography>
        </div>
      </>
    );
  }
}

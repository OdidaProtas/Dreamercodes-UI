import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/coding.json";

export default class LottieControl extends React.Component {
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

    return (
      <div>
        <Lottie options={defaultOptions} height={270} width={270} />
      </div>
    );
  }
}

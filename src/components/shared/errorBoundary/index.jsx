import React from "react";
import DefaultErrorComponent from "./defaultErrorComponent";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: "",
    };
  }

  componentDidCatch(err) {
    console.log(err);
    this.setState({
      hasError: true,
      message: err.message,
    });
  }

  render() {
    const CustomErrorComponent = this.props.errorComponent;
    if (this.state.hasError) {
      if (CustomErrorComponent) return <CustomErrorComponent />;
      return <DefaultErrorComponent />;
    }
    return <>{this.props.children}</>;
  }
}

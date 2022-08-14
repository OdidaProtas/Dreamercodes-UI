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
    this.setState({
      hasError: true,
      message: err.message,
      stack: err.stack,
    });
  }

  render() {
    const CustomErrorComponent = this.props.errorComponent;
    if (this.state.hasError) {
      if (CustomErrorComponent) return <CustomErrorComponent />;
      return (
        <DefaultErrorComponent
          stack={this.state.stack}
          error={this.state.message}
        />
      );
    }
    return <>{this.props.children}</>;
  }
}

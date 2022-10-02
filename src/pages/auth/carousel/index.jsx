import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function AuthOrgCarousel({ bgImg }) {
  return (
    <Carousel showStatus={false} showIndicators={false} showThumbs={false}>
      <div>
        <img width="130%" src={bgImg} alt="" />
      </div>
      <div>
        <img height={"130%"} width="100%" src={bgImg} alt="" />
      </div>
      <div>
        <img height={"130%"} width="100%" src={bgImg} alt="" />
      </div>
    </Carousel>
  );
}

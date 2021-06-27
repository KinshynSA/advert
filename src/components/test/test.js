import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";

export default function Test(props){
  const [navs, setNavs] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    setNavs({
      nav1: slider1.current,
      nav2: slider2.current
    });
  }, []);

  const { nav1, nav2 } = navs;

  return (
    <div>
      <Slider asNavFor={nav2} ref={slider => (slider1.current = slider)}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={slider => (slider2.current = slider)}
      >
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};
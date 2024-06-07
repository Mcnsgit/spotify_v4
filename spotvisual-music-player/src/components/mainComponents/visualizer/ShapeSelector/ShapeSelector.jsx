import "../ShapeSelector/shape-selector.scss";
import sphereImg from "../../../assets/images/sphere.png";
import planeImg from "../../../assets/images/plane.png";
import tarusImg from "../../../assets/images/taurus.png";
import { useState } from "react";

import React from "react";

export const ShapeSelector = ({ currentShape, selectShape }) => {
  const [shapeSelected, setShapeSelected] = useState(currentShape);

  return (
    <div className="shape-selector">
      <div className="shape-selector__img-container">
        <img
          className={`shape-selector__img ${
            shapeSelected === "sphere" ? "--selected" : ""
          }`}
          onClick={() => {
            setShapeSelected("sphere");
            selectShape("sphere");
          }}
          src={sphereImg}
          alt="sphere wireframe Three.js element"
        />
      </div>

      <div className="shape-selector__img-container">
        <img
          className={`shape-selector__img ${
            shapeSelected === "plane" ? "--selected" : ""
          }`}
          onClick={() => {
            setShapeSelected("plane");
            selectShape("plane");
          }}
          src={planeImg}
          alt="plane wireframe Three.js element"
        />
      </div>

      <div className="shape-selector__img-container">
        <img
          className={`shape-selector__img ${
            shapeSelected === "torus" ? "--selected" : ""
          }`}
          onClick={() => {
            setShapeSelected("torus");
            selectShape("torus");
          }}
          src={tarusImg}
          alt="torus wireframe Three.js element"
        />
      </div>
    </div>
  );
};
 export default ShapeSelector
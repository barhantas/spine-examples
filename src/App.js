import React from "react";
import SpineCard from "./components/SpineCard";
import "./App.css";

import raptorSheet from "./raptor/raptor-pro.json";
import powerupSheet from "./powerup/powerup-pro.json";

var PIXI = require("pixi.js");
window.PIXI = PIXI;
require("pixi-spine");

function App() {
  const raptorAnimationNameList = Object.keys(raptorSheet.animations);
  const powerupAnimationNameList = Object.keys(powerupSheet.animations);

  const spriteList = [
    {
      name: "raptor",
      path: "raptor/raptor-pro.json",
      animationNameList: raptorAnimationNameList,
      scale: 0.3,
      x: 250,
      y: 500,
    },
    {
      name: "powerup",
      path: "powerup/powerup-pro.json",
      animationNameList: powerupAnimationNameList,
      scale: 0.8,
      x: 250,
      y: 400,
    },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {spriteList.map((spineObject, index) => (
        <SpineCard key={index} spineObject={spineObject} />
      ))}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

var PIXI = require("pixi.js");
window.PIXI = PIXI;
require("pixi-spine");

function SpineCard({
  spineObject: {
    name,
    path,
    animationNameList = [],
    skinName = "default",
    scale,
    x,
    y,
  },
}) {
  const [animationName, setAnimationName] = useState();
  const [timeScale, setTimeScale] = useState(10);

  const divId = `canvas-div-${name}`;

  useEffect(() => {
    var app = new PIXI.Application({
      width: 500,
      height: 500,
    });

    app.loader.add(name, path).load(function (loader, resources) {
      var spineInstance = new PIXI.spine.Spine(resources[name].spineData);

      spineInstance.skeleton.setSkinByName(skinName);
      spineInstance.skeleton.setSlotsToSetupPose();

      // set the position
      spineInstance.x = x;
      spineInstance.y = y;
      spineInstance.scale.set(scale);

      // play animation
      animationName && spineInstance.state.setAnimation(0, animationName, true);
      if (timeScale) {
        spineInstance.state.timeScale = timeScale / 10;
      }
      app.stage.addChild(spineInstance);

      app.start();

      const element = document.getElementById(divId);
      element.childNodes[0] && element.childNodes[0].remove();
      element.appendChild(app.view);
    });
  });

  return (
    <div style={{ width: 500, height: "100%", margin: 24, borderRadius: "50" }}>
      <div id={divId}></div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {animationNameList.map((name, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              padding: 8,
              cursor: "pointer",
            }}
            onClick={() => setAnimationName(name)}
          >
            {animationName === name ? (
              <span>&#9989;</span>
            ) : (
              <span style={{ marginRight: 8 }}>&#10148;</span>
            )}

            {name}
          </div>
        ))}
      </div>
      <span>&#10134;</span>
      <input
        type="range"
        min="0"
        max="20"
        defaultValue="10"
        onChange={({ target: { value } }) => {
          setTimeScale(value);
        }}
        style={{ width: "90%" }}
      />
      <span>&#10133;</span>
    </div>
  );
}

export default SpineCard;

import React, { useRef, useEffect, useState } from "react";
import "./UI.css";
import { fillCanvasData, canvasToImg } from "./misc";
/**
 * An overlay to display basic information
 */
export const InfoOverlay = ({ sample }: { sample: any }) => {
  console.log(
    "Sample: %s %s",
    sample.name,
    sample.caseNb ? "#" + sample.caseNb : ""
  );

  return (
    <>
      <div className="overlay" id="info">
        <span>{sample.name}</span>
      </div>
    </>
  );
};

/**
 * A dropdown menu to select a sample case (e.g. test case)
 * @param param0 case options + current caseId
 * export sample.caseNb in states
 */
export const CaseSelector = ({
  items,
  current,
  onSelect
}: {
  items: any;
  current: number;
  onSelect: any;
}) => {
  // const setSample = useSampleStates(state => state.setSample);

  return (
    <>
      <div className="overlay inputBtn" id="caseSelector">
        <select
          id="testCases"
          value={current}
          onChange={evt => onSelect(evt.target.value)}
        >
          {Object.keys(items).map(key => (
            <option key={key} value={key}>
              {items[key]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

/**
 * A canvas overlay to draw on top
 */

export const CanvasOverlay = ({ width, height, pointsBuff }: any) => {
  const canvasRef: any = useRef();
  const [img, setImg]: any = useState();

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#FF0000"; // ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(32, 32, 128, 128);
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();

    // create a new pixel array
    var imageData: ImageData = ctx.createImageData(
      canvasRef.current.width,
      canvasRef.current.height
    );
    fillCanvasData(pointsBuff, imageData);
    // copy the image data back onto the canvas
    ctx.putImageData(imageData, 0, 0); // at coords 0,0

    const img: HTMLImageElement = canvasToImg(canvasRef.current);
    setImg(img);
  }, [pointsBuff]);
  // console.log(img);
  return (
    <>
      <div className="overlay right" id="canvasOvr">
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
      {/* <img src={img ? img.src : null} alt="heightmap" /> */}
    </>
  );
};

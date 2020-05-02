import React, { useRef, useEffect, useState, ChangeEvent } from "react";
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
      <div className="overlay top centered">
        <div id="infoLabel">{sample.name}</div>
        <div id="description">{sample.desc}</div>
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
      <div className="overlay top inputBtn" id="caseSelector">
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
 * A canvas overlay to display drawings (for debug, ...)
 */

export const CanvasOverlay = ({ width, height, pointsBuff }: any) => {
  const canvasRef: any = useRef();
  const [img, setImg]: any = useState();

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext("2d");

    // create a new pixel array
    var imageData: ImageData = ctx.createImageData(
      canvasRef.current.width,
      canvasRef.current.height
    );
    fillCanvasData(pointsBuff, imageData);
    // copy the image data back onto the canvas
    ctx.putImageData(imageData, 0, 0); // at coords 0,0
    // drawOnCanvas(pointsBuff, ctx);

    const img: HTMLImageElement = canvasToImg(canvasRef.current);
    // setImg(img);
  }, [pointsBuff]);
  // console.log(img);
  return (
    <>
      <div className="overlay right bottom">
        <canvas ref={canvasRef} width={width} height={height} id="canvasOvr" />
      </div>
      {/* <img src={img ? img.src : null} alt="heightmap" /> */}
    </>
  );
};

/**
 * Multi purpose text box
 * @param handleSubmit 
 */
export const TextBox = ({ handleSubmit, defaultValue = "empty" }: any) => {
  const [text, setText] = useState(defaultValue);

  const handleChange = (event: any) => {
    setText(event.target.value);
  }

  // useEffect(() => {
  //   setText("toto à vélo");
  // })

  return (
    <>
      <br />
      <br />
      <form className="overlay inputTextForm" onSubmit={evt => handleSubmit(evt, text)}>
        <label>
          Format data as below <br />
          <textarea id="textArea" value={text} onChange={handleChange} />
        </label><br />
        <div className="submitBtn">
          <input type="submit" value="process" />
        </div>
      </form>
    </>
  );
}




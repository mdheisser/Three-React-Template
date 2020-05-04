import React, { useRef, useState, useEffect } from "react";
import './styles.css'
import { Vector3 } from "three";

/**
 * A canvas overlay to display heighmaps
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
 * 
 * fill canvas imagedata input from point buffer
 * @param pointsBuff point buffer
 * @param imageData filled from input buffer
 */
const fillCanvasData = (pointsBuff: any, imageData: ImageData) => {
    const setPixel = (imageData: any, i: number, c: number, a: number) => {
      var x = i % imageData.width;
      var y = Math.floor(i / imageData.width);
      var index = (x + y * imageData.width) * 4;
      imageData.data[index + 0] = c; //r
      imageData.data[index + 1] = c; //g
      imageData.data[index + 2] = c; //b
      imageData.data[index + 3] = a;
    };
  
    pointsBuff.forEach((val: number, i: number) => {
      let alpha = 1; //((x % 5) % 4) * ((y % 5) % 4) * 255;
      setPixel(imageData, i, val * 256, alpha * 255); // 255 opaque
    });
  };
  
  /**
   * dump canvas to image
   * @param canvas 
   */
  
  const canvasToImg = (canvas: HTMLCanvasElement) => {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  };
  
  /**
   * Draw some point list on canvas
   */
  
  const drawOnCanvas = (ptsList: Vector3[], canvasCtx: CanvasRenderingContext2D) => {
    canvasCtx.fillStyle = "#FF0000"; // ctx.fillStyle = "rgb(200,0,0)";
    canvasCtx.fillRect(32, 32, 128, 128);
    canvasCtx.beginPath();
    canvasCtx.arc(95, 50, 40, 0, 2 * Math.PI);
    canvasCtx.stroke();
  }
//@todo test what x and y means for canvas,
/**
 * y
 * ^
 * |
 * |____> x
 */
export const fillCanvasData = (pointsBuff: any, imageData: ImageData) => {
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

export const canvasToImg = (canvas: HTMLCanvasElement) => {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
};

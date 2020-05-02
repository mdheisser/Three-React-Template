/** Toolbox to handle geometric data*/

import { Vector3, Vector2 } from "three";
import { requestAPI } from "../../common/misc";

const ApiBaseUrl = "https://epsg.io/trans?";
const ApiEndUrl = "&s_srs=4326&t_srs=3857";
// construct URL for API call

/**
 * linear projection of geodata
 * @param geoData an array of geo data with terrain elevation
 */
export const projectGeoData = async (geoData: any) => {
  const size = 256;
  const elevArr = geoData.elevations.elevation;

  // Convert geodesic (lat,lon) to mercator(planar x,y,z)
  // var results: number[] = await Promise.all(
  // elevArr.map(async (item: any) => {
  var points = [];
  for (var item of elevArr) {
    // const inputStr = "x=" + item.lon + "&y=" + item.lat + "&z=" + item.z;
    const inputStr = `x=${item.lon}&y=${item.lat}&z=${item.z}&s_srs=4326&t_srs=3857`;
    const url = ApiBaseUrl + inputStr;

    const coords = await requestAPI(url);
    // console.log(coords);
    points.push(new Vector3(coords.x, coords.y, coords.z));
  }//)
  // )

  // Find min/max
  const min = new Vector3(0, 0, 0); const max = points[0];
  min.x = points.map(v => v.x).reduce((min, val) => val < min ? val : min);
  min.y = points.map(v => v.y).reduce((min, val) => val < min ? val : min);
  min.z = points.map(v => v.z).reduce((min, val) => val < min ? val : min);
  max.x = points.map(v => v.x).reduce((max, val) => val > max ? val : max);
  max.y = points.map(v => v.y).reduce((max, val) => val > max ? val : max);
  max.z = points.map(v => v.z).reduce((max, val) => val > max ? val : max);

  console.log('check min found at: https://epsg.io/map#srs=3857&x=%s&y=%s&z=18&layer=satellite', min.x, min.y);
  console.log('check max found at: https://epsg.io/map#srs=3857&x=%s&y=%s&z=18&layer=satellite', max.x, max.y);

  // Dimensions
  const range = max.clone().sub(min).round()
  console.log("altitude %sm -> %sm  (+%sm)", min.z, max.z, range.z);
  console.log("dimensions %sm x %sm", range.x, range.y);

  // Normalize so that min become origin at (0,0,0)

  const localPts = points.map(pt => pt.clone().sub(min));
  return localPts;
};

/**
* generate an height function from projected geodata
 */
export const ptsListHeighFn = (ptsList: Vector3[]) => {
  console.log(ptsList)
  return (p: Vector2) => {
    return Math.cos(p.length() / 8)
  };
}
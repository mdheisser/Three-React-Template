/** Toolbox to handle geometric data*/

import { Vector3, Vector2 } from "three";
import { requestAPI } from "../../common/misc";

const API_BaseUrl = "https://epsg.io/";
const API_Transform = "trans";
const API_Map = "map";
// conversion unit from/to (what SRS stands for?)
const SRS = {
  source: 4326, // geodesic
  target: 3857  // 
}


/**
 * linear projection of geodata
 * @param geoData array of geo data with terrain elevation
 */
export const projectGeoData = async (geoData: any) => {
  const size = 256;
  const elevArr = geoData.elevations.elevation;

  // Convert geodesic (lat,lon) to mercator(planar x,y,z)
  var points = [];
  for (var item of elevArr) {
    // construct URL for API call
    // const inputStr = "x=" + item.lon + "&y=" + item.lat + "&z=" + item.z;
    const inputStr = `?x=${item.lon}&y=${item.lat}&z=${item.z}&s_srs=${SRS.source}&t_srs=${SRS.target}`;
    const url = API_BaseUrl + API_Transform + inputStr;

    const coords = await requestAPI(url);
    points.push(new Vector3(parseInt(coords.x), parseInt(coords.y), parseInt(coords.z)));
  }

  const limits = getBoundaries(points);

  const mapDispStr = `${SRS.target}`
  console.log("Min found at: " + API_BaseUrl + API_Map + "#srs=3857&x=%s&y=%s&z=18&layer=satellite", limits.min.x, limits.min.y);
  console.log('Max found at: https://epsg.io/map#srs=3857&x=%s&y=%s&z=18&layer=satellite', limits.max.x, limits.max.y);

  // Compute area dimensions + altitude range
  const range = limits.max.clone().sub(limits.min).round();
  console.log("Altitude range %sm -> %sm  (+%sm)", limits.min.z, limits.max.z, range.z);
  console.log("Area dimensions H:%sm x W:%sm", range.x, range.y);

  // set origin at middle
  const origin = limits.min.clone().add(range.clone().multiplyScalar(0.5));
  console.log("origin set to:")
  console.log(origin);
  // center on origin => all coords become relative to this reference point
  const localPts = points.map(pt => pt.clone().sub(origin));
  return localPts;
};
/**
 * get min/max of a point list
 * @param points 
 */
const getBoundaries = (points: Vector3[]) => {
  // Find min/max
  const min = new Vector3(); const max = new Vector3();
  min.x = points.map(v => v.x).reduce((min, val) => val < min ? val : min);
  min.y = points.map(v => v.y).reduce((min, val) => val < min ? val : min);
  min.z = points.map(v => v.z).reduce((min, val) => val < min ? val : min);
  max.x = points.map(v => v.x).reduce((max, val) => val > max ? val : max);
  max.y = points.map(v => v.y).reduce((max, val) => val > max ? val : max);
  max.z = points.map(v => v.z).reduce((max, val) => val > max ? val : max);
  return { min, max }
}

/**
* generate an height function to display a set of points
 */
const POINT_SIZE = 1; // point size to display on canvas

export const ptsListHeighFn = (pointSet: Vector3[]) => {
  // rescale point set to fit target dim
  const limits = getBoundaries(pointSet);
  const range = limits.max.clone().sub(limits.min).round();
  const center = limits.min.clone().add(range.clone().multiplyScalar(0.5));
  // reposition on center
  let localPts = pointSet.map(pt => pt.clone().sub(center));
  // translate on new center
  const centerTarget = new Vector3(128,128,0.5);
  const translat = centerTarget.clone().sub(center);
  localPts = localPts.map(pt => pt.clone().add(translat));
  
  const findPt = (p: any) =>
  localPts.findIndex(pt => p.distanceTo(new Vector2(pt.y, pt.x)) < POINT_SIZE);

  return (p: Vector2) => findPt(p) === -1;//? (pts[index].z - z.min) / z.range : 1;
}
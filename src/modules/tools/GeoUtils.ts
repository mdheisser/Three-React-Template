/** Toolbox to handle geometric data*/

import { Vector2, Vector3 } from "three";
/**
 * interpolate some terrain elevation data
 * to generate an height function
 */

/**
 * planar projection of geo data 
 * @param geoData an array of terrain elevation data
 */
export const geoDataProjection = (geoData: any) => {
  const size = 256;
  const elevArr = geoData.elevations.elevation;
  var lat = { min: elevArr[0].lat, max: 0, range: 0 }
  var lon = { min: elevArr[0].lon, max: 0, range: 0 }
  var z = { min: elevArr[0].z, max: 0, range: 0 }

  // find min max
  elevArr.forEach((elt: any) => {
    lon.min = elt.lon < lon.min ? elt.lon : lon.min;
    lat.min = elt.lat < lat.min ? elt.lat : lat.min;
    z.min = elt.z < z.min ? elt.z : z.min;
    lon.max = elt.lon > lon.max ? elt.lon : lon.max;
    lat.max = elt.lat > lat.max ? elt.lat : lat.max;
    z.max = elt.z > z.max ? elt.z : z.max;
  });
  lon.range = lon.max - lon.min;
  lat.range = lat.max - lat.min;
    z.range = z.max - z.min;
  console.log("min lon %s lat %s z %s", lon.min, lat.min, z.min)
  console.log("max lon %s lat %s z %s", lon.max, lat.max, z.max)
  console.log("range lon %s lat %s z %s", lon.range, lat.range, z.range)
  // distance range
  const distRange = new Vector2();
  // min will become origin at (0,0,0)
  const mult = { lon: size / lon.range, lat: size / lat.range };
  const pts: Vector3[] = elevArr.map((elt: any) => {
    const pt = new Vector3(
      (elt.lat - lat.min) * mult.lat,
      (elt.lon - lon.max) * mult.lon,
      parseFloat(elt.z)
    );
    return pt;
  });
  //console.log(pts);
  const findPt = (p: any) =>
    pts.findIndex(pt => p.distanceTo(new Vector2(pt.x, pt.y)) < 5);
  return (p: Vector2) => {
    //return p.x > 64 ? 0.5 : 1;
    const index = findPt(p);
    return index !== -1 ? (pts[index].z - z.min) / z.range : 1;
  };
};

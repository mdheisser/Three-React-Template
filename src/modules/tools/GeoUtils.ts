/** Toolbox to handle geometric data*/

import { Vector2, Vector3 } from "three";
/**
 * interpolate some terrain elevation data
 * to generate an height function
 */
export const geodata_lerp = (geoData: any) => {
  const size = 256;
  const elevArr = geoData.elevations.elevation;
  var min = { lon: elevArr[0].lon, lat: elevArr[0].lat, z: elevArr[0].z };
  var max = { lon: 0, lat: 0, z: 0 };
  elevArr.forEach((elt: any) => {
    min.lon = elt.lon < min.lon ? elt.lon : min.lon;
    min.lat = elt.lat < min.lat ? elt.lat : min.lat;
    min.z = elt.z < min.z ? elt.z : min.z;
    max.lon = elt.lon > max.lon ? elt.lon : max.lon;
    max.lat = elt.lat > max.lat ? elt.lat : max.lat;
    max.z = elt.z > max.z ? elt.z : max.z;
  });
  const range = {
    lon: max.lon - min.lon,
    lat: max.lat - min.lat,
    z: max.z - min.z
  };
  const mult = { lon: size / range.lon, lat: size / range.lat };
  console.log(range);
  const pts: Vector3[] = elevArr.map((elt: any) => {
    const pt = new Vector3(
      (elt.lat - min.lat) * mult.lat,
      (elt.lon - min.lon) * mult.lon,
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
    return index !== -1 ? (pts[index].z - min.z) / range.z : 1;
  };
};

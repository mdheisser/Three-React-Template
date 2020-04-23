import { Vector3, PerspectiveCamera, Box3 } from "three";

export const smoothTransit = ()=>{

}

export const focusOnObjects = (selection: any, fitOffset = 1.2, controls: any, camera: PerspectiveCamera) => {
    // const camera: any = useThree().camera;
    // const controls = orbitRef.current;
    const box = new Box3();

    for (const object of selection) box.expandByObject(object);

    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);
    const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
    const fitWidthDistance = fitHeightDistance / camera.aspect;
    const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

    const direction = controls.target.clone()
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distance);

    controls.maxDistance = distance * 10;
    controls.target.copy(center);

    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();

    camera.position.copy(controls.target).sub(direction);

    controls.update();
}
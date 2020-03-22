///<reference path="../dts/misc-types-extend.d.ts" />
import React from "react";
import BasicTemplate from "./BasicTemplate";
import { Helpers } from "./BasicDemo";
import { Points, TorusKnotBufferGeometry, PointsMaterial, Box3 } from "three";
import { PointOctree } from "sparse-octree";
import { OctreeHelper } from "octree-helper";
import { Vector3 } from "math-ds";


const TestBase = () => {

    // Points.

    const points = new Points(
        new TorusKnotBufferGeometry(10, 10, 32, 32),
        new PointsMaterial({
            sizeAttenuation: false,
            color: 0xf4f4f4,
            size: 2
        })
    );

    // Octree.

    const octree = (function () {
        const size = 256;
        const bbox = new Box3(new Vector3(-size/2, -size/2, -size/2), new Vector3(size, size, size));
        // bbox.setFromObject(scene);

        const octree = new PointOctree(bbox.min, bbox.max, 0.0, 8, 8);

        const a = points.geometry.getAttribute("position").array;
        const v = new Vector3();

        let i, l;

        for (i = 0, l = a.length; i < l; i += 3) {

            octree.insert(v.fromArray(a, i), points);

        }

        return octree;

    }());

    const octreeHelper = new OctreeHelper(octree);
    // scene.add(helper);

    return (<>
        <primitive object={points} />
        <primitive object={octreeHelper} />
        <Helpers size={128} />
    </>)
}

const TestCase = () => {

    return (<TestBase />)
}

const TestCases = [TestCase];

export default ({ caseNb = 0 }) => {
    return (<BasicTemplate Sample={TestCases[caseNb]} />)
};
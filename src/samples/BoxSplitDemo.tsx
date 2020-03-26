///<reference path="../dts/misc-types-extend.d.ts" />
import React, { useState, useRef, useEffect } from "react";
import { Box3, Vector3, Matrix4 } from "three";
import { BoxSplitter } from "../components/Utils/BoxUtils";
import { useFrame, useThree, Canvas } from "react-three-fiber";
import { BoxEntityCtrlHlp } from "../components/Helpers/BoxEntityCtrlHlp";
import { useSampleStates } from "../common/SampleStates";
import InfoOverlay from "../components/UI/InfoOverlay";
import { Controls, Wrapper } from "./BasicDemo";


const StaticBoxStyle = {
    default: {
        color: "white",
        alpha: 0.4,
        ghostColor: "white",
        ghostAlpha: 0
    },
    hovered: {
        color: "orange",
        alpha: 0.4,
        ghostColor: "white",
        ghostAlpha: 0
    }
}

const MovingBoxStyle = {
    selected: {
        color: "white",
        alpha: 0.6,
        ghostColor: "white",
        ghostAlpha: 0.1
    }
}

const OverlapBoxStyle = {
    default: {
        color: "red",
        alpha: 1,
        ghostColor: "red",
        ghostAlpha: 0.1
    }
}

const SplitBoxesStyle = {
    default: {
        color: "green",
        alpha: 1,
        ghostColor: "green",
        ghostAlpha: 0.1
    }
}

const orig = new Vector3(0, 0, 0);
var orig2 = new Vector3(20, 30, 40);
const dim = new Vector3(50, 50, 50);
const dim2 = new Vector3(51, 51, 25);
const staticBox = new Box3(orig, dim);
const movingBox = new Box3(orig2, orig2.clone().add(dim2));

const AnimationWidget = () => {
    const { time, setTime } = useSampleStates();

    // init time state
    useEffect(() => {
        setTime(new Date(0))
    }, [])

    return (<>
        {time.custom ? <span id="timeinfo">Custom Time (SPACE key to toggle anim) {time.custom.toLocaleTimeString()}  </span> : ""}
    </>)
}

const Main = () => {

    const { setTime } = useSampleStates();
    const { time } = useSampleStates();
    // convert to minutes:
    const clk = useThree().clock;
    const anim = useRef(false);

    const [splitBoxes, setSplitBoxes]: any = useState([]);

    const staticBoxEnt = {
        box: staticBox,
        selected: false
    }

    const movingBoxEnt = {
        box: movingBox,
        selected: true,
    }

    const onMove = (mat: Matrix4) => {
        var movingBox = movingBoxEnt.box;
        const boxDim: any = new Vector3(0, 0, 0);
        movingBox.getSize(boxDim);
        const boxCenter: any = new Vector3()
        boxCenter.applyMatrix4(mat);
        movingBoxEnt.box.setFromCenterAndSize(boxCenter, boxDim);
        if (movingBox.intersectsBox(staticBox)) {
            var overlapBox = movingBox.clone().intersect(staticBox);
            var splitBoxes = BoxSplitter.split(staticBox, [overlapBox]);
            setSplitBoxes([overlapBox, ...splitBoxes]);
        }
        return {};
    }

    useFrame(() => {
        var realTime = clk.getElapsedTime(); //Math.round(clk.getElapsedTime() * 100);
        var date = new Date(0);
        date.setHours(Math.floor(realTime) % 24);
        date.setMinutes(Math.floor((realTime - Math.floor(realTime)) * 60))
        if (anim.current) {
            setTime(date);
        }
    })

    useEffect(() => {
        var mat = new Matrix4()
        const statBoxCenter = new Vector3(0, 0, 0);
        staticBox.getCenter(statBoxCenter);
        const movBoxCenter = new Vector3(0, 0, 0);
        movingBox.getCenter(movBoxCenter);
        var t = time.custom.getHours() * 60 + time.custom.getMinutes();
        var tmax = 24 * 60;
        mat.makeTranslation(statBoxCenter.x / 2 * (1 + Math.cos(2 * Math.PI * t / tmax) * 2),
            25 * (1 + Math.sin(2 * Math.PI * t / tmax) * 2),
            movBoxCenter.z);
        onMove(mat);
    }, [time]);

    useEffect(() => {
        // Start/Stop animation
        window.addEventListener('keydown', (evt) => {
            if (evt.code === "Space")
                anim.current = !anim.current;
        }, false);
    }, [])

    const helpers = [<BoxEntityCtrlHlp key={0} boxEnt={staticBoxEnt} boxStyle={StaticBoxStyle} />,
    <BoxEntityCtrlHlp key={1} boxEnt={movingBoxEnt} onChange={onMove} boxStyle={MovingBoxStyle} />];

    const splitBoxHelpers = splitBoxes.map((box: Box3, i: number) => {
        var ent = {
            box: box,
            selected: false
        };
        var style = i ? SplitBoxesStyle : OverlapBoxStyle
        return <BoxEntityCtrlHlp key={i + 2} boxEnt={ent} boxStyle={{ ...style }} />
    })

    return (<>
        {helpers}
        {splitBoxHelpers}
    </>)
}


export default ({ sample }: any) => {
    return (<>
        <AnimationWidget />
        <InfoOverlay sample={sample} />
        <Canvas camera={{ position: [100, 50, 100] }}>
            <ambientLight intensity={0.5} />
            <Wrapper />
            <Controls />
            <Main />
        </Canvas>
    </>)
};
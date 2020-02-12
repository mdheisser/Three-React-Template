import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as THREE from 'three'
import { useFrame } from "react-three-fiber";
import { Box3, Color } from "three";

// const defaultVal: bxLstHlpProps = 
// ({ title, paragraph = 'Hello World' })
export default ({ boxes = [], selected = [], multiselect = true, useFakeObj = true }) => {

  const boxListHlp = boxes.map((b: Box3, i: number) => {
    const visible = (selected.findIndex(val => val === i) !== -1);

    return <BoxHlp key={i} box={b} visible={visible} useFakeObj={useFakeObj} />;
  });

  return (
    <group>
      {boxListHlp}
    </group>
  );
}

const FakeMesh = ({ box, visible }: { box: Box3, visible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);

  const boxDim: any = new THREE.Vector3()
  box.getSize(boxDim);
  const boxCenter: any = new THREE.Vector3()
  box.getCenter(boxCenter);
  // color
  const color = isHovered ? 0xff0000 : (isActive ? 0xff0000 : 0xffffff);
  // const alpha = isHovered ? 0.0 : (isActive ? 0.2 : 0.0);
  const alpha = isActive ? 0.2 : 0.0;

  //useEffect of the activeState
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Events
  const onHover = useCallback(
    (e, value) => {
      e.stopPropagation();
      setIsHovered(value);
    },
    [setIsHovered]
  );

  const onClick = useCallback(
    e => {
      e.stopPropagation();
      setIsActive(v => !v);
    },
    [setIsActive]
  );
  return (<mesh
    visible={visible}
    position={boxCenter}
    onClick={e => onClick(e)}
    onPointerOver={e => onHover(e, true)}
    onPointerOut={e => onHover(e, false)}
  >
    <boxBufferGeometry attach="geometry" args={boxDim.toArray()} />
    <meshStandardMaterial
      attach="material"
      color={color}
      transparent
      opacity={alpha}
    />
  </mesh>)
}

const BoxHlp = ({ box, visible, useFakeObj }: { box: Box3, visible: boolean, useFakeObj: boolean }) => {
  const hlpRef: any = useRef();
  const fakeObjRef: any = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);


  // color
  const color = isHovered ? 0xe5d54d : (isActive ? 0xff0000 : 0xffffff);
  // var color = new Color(0x00ff00);

  //useEffect of the activeState
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);


  return (
    <>
      <box3Helper
        args={[box, new Color(color)]}
        box={box}
        visible={visible} />
      <FakeMesh
        // ref={fakeObjRef}
        box={box}
        visible={visible && useFakeObj} />
      {/* <boxHelper
        ref={hlpRef}
        args={[fakeObjRef.current, new Color(color)]}
      >
      </boxHelper> */}
    </>
  );
};
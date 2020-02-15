import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as THREE from 'three'
import { Box3, Color } from "three";

enum BOX_SELECT_MODES {
  SINGLE,
  MULTI,
  DRAG,
  ALLORNOT
}
// const defaultVal: bxLstHlpProps = 
// ({ title, paragraph = 'Hello World' })
export default ({ boxes = [], selection = { 0: true }, selectMode = BOX_SELECT_MODES.SINGLE, dispFakeObj = true }:
  { boxes: Box3[], selection: any, selectMode: BOX_SELECT_MODES, dispFakeObj: boolean }) => {
  const [state, setState] = useState(selection);

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const boxListHlp = boxes.map((b: Box3, i: number) => {
    return <BoxHlp key={i} box={b} isSelected={state[i]} dispFakeObj={dispFakeObj}
      onBoxSelect={() => select(i)} />;
  });

  const select = (id: string | number) => {
    // console.log("key: %s => state: %s", id, stateRef.current[id]);
    var curr = stateRef.current[id];
    if (selectMode !== BOX_SELECT_MODES.MULTI) allOrNothing(false);

    setState((prev: any) => {
      return { ...prev, [id]: !curr }
    })
  }

  const allOrNothing = (isVisible: boolean) => {
    setState((prev: any) => {
      boxes.forEach((b, i) => {
        prev[i] = isVisible;
      })
      return { ...prev }
    })
  }

  return (
    <group>
      {boxListHlp}
    </group>
  );
}

const BoxHlp = ({ box, isSelected, onBoxSelect, dispFakeObj }: { box: Box3, isSelected: boolean, onBoxSelect: any, dispFakeObj: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  // color
  const color = isSelected ? 0xe5d54d : 0xffffff; //(isSelected ? 0xff0000 : 0xffffff);
  // var color = new Color(0x00ff00);

  return (
    <>
      <box3Helper
        args={[box, new Color(color)]}
        box={box}
        visible={isSelected || isHovered}
      />
      <FakeMesh
        // ref={fakeObjRef}
        box={box}
        isSelected={isSelected}
        onBoxSelect={onBoxSelect}
        onBoxHover={() => setIsHovered(prev => !prev)}
        isVisible={dispFakeObj} />
      {/* <boxHelper
        ref={hlpRef}
        args={[fakeObjRef.current, new Color(color)]}
      >
      </boxHelper> */}
    </>
  );
};

const FakeMesh = ({ box, isSelected, onBoxSelect, onBoxHover, isVisible }:
  { box: Box3, isSelected: boolean, onBoxSelect: any, onBoxHover: any, isVisible: boolean }) => {
   const [isHovered, setIsHovered] = useState(false);

  const boxDim: any = new THREE.Vector3()
  box.getSize(boxDim);
  const boxCenter: any = new THREE.Vector3()
  box.getCenter(boxCenter);
  // color
  const color = 0x00ff00;
  // const alpha = isHovered ? 0.0 : (isActive ? 0.2 : 0.0);
  const alpha = (isSelected && isVisible) ? 0.2 : 0.0;

  // Events
  const onHover = useCallback(
    (e, value) => {
      e.stopPropagation();
      onBoxHover();
      setIsHovered(value);
    },
    [setIsHovered]
  );

  const onClick = useCallback(
    e => {
      e.stopPropagation();
      // setIsActive(v => !v);
      onBoxSelect();
    },
    [] // [setIsActive]
  );
  
  return (<mesh
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
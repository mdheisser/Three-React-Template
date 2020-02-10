import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback
} from "react";
import { useFrame } from "react-three-fiber";

export default () => {
  const mesh = useRef();
  const time = useRef(0);

  
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);


  // color
  const color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);

  //useEffect of the activeState
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // raf loop
  useFrame(() => {
    // mesh.current.rotation.y += 0.01 * timeMod;
    // if (isActiveRef.current) {
    //   time.current += 0.03;
    //   mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4;
    // }
  });

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

  return (
    
    <mesh
      ref={mesh}
      position={[0,0,0]}
      onClick={e => onClick(e)}
      onPointerOver={e => onHover(e, true)}
      onPointerOut={e => onHover(e, false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};
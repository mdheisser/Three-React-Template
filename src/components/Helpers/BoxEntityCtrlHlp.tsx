import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Box3, Vector3, Matrix4, Color } from "three";
import { useSampleStates } from "../../common/SampleStates";

export type BoxStyle = {
  color: Color,
  alpha: number,
  ghostColor: Color,
  ghostAlpha: number
}

export type BoxEntity = {
  box: Box3,
  selected: Boolean,
  style: { // custom style
    default: BoxStyle,
    selected: BoxStyle
    hovered: BoxStyle
  }
}

export enum BOX_SELECT_MODES {
  SINGLE,
  MULTI,
  DRAG,
  DRAGMULTI,
  ALLORNOT
}

const defaultStyle = {
  default: {
    color: 'white',
    alpha: 0.2,
    ghostColor: 'white',
    ghostAlpha: 0
  },
  hovered: {
    color: 'white',
    alpha: 0.5,
    ghostColor: 'brown',
    ghostAlpha: 0.2
  },
  selected: {
    color: 'orange',
    alpha: 0.8,
    ghostColor: 'green',
    ghostAlpha: 0.4
  }
}

export const BoxEntityCtrlHlp = ({ boxEnt, onClick, onChange, boxStyle=defaultStyle }: { boxEnt: BoxEntity, onClick: any, onChange: any, boxStyle?: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const boxRef: any = useRef();
  const ghostRef: any = useRef();

  const boxDim: any = new Vector3()
  boxEnt.box.getSize(boxDim);
  const boxCenter: any = new Vector3()
  boxEnt.box.getCenter(boxCenter);

  var style = boxEnt.style ? Object.assign(boxStyle, boxEnt.style) : boxStyle;

  // color
  const color = boxEnt.selected ? style.selected.color : style.default.color;
  const alpha = boxEnt.selected ? style.selected.alpha : isHovered ? style.hovered.alpha : style.default.alpha;
  const ghostColor = boxEnt.selected ? style.selected.ghostColor : style.default.ghostColor;
  const ghostAlpha = boxEnt.selected ? style.selected.ghostAlpha : isHovered ? style.hovered.ghostAlpha : style.default.ghostAlpha;

  // Events
  const onHover = useCallback(
    (e, enabled) => {
      e.stopPropagation();
      setIsHovered(enabled);
    },
    [isHovered]
  );

  useEffect(() => {
    boxRef.current.setFromObject(ghostRef.current);
  })

  const inputCtrl = boxEnt.selected ? <InputCtrl /*ref={ghostRef}*/ onChange={onChange} object={ghostRef.current} /> : "";

  return (
    <>
      {inputCtrl}
      <boxHelper ref={boxRef} >
        <lineBasicMaterial attach='material' color={new Color(color)} transparent opacity={alpha} />
      </boxHelper>
      <mesh ref={ghostRef} attach="object"
        // visible={ghostAlpha > 0}
        position={boxCenter}
        onPointerUp={e => onClick(e)}
        onPointerOver={e => onHover(e, true)}
        onPointerOut={e => onHover(e, false)}
        onWheel={() => console.log("wheel")}
      >
        <boxBufferGeometry attach="geometry" args={boxDim.toArray()} />
        <meshStandardMaterial
          attach="material"
          color={ghostColor}
          transparent
          opacity={ghostAlpha}
        />
      </mesh>
      {/* </boxHelper> */}
    </>
  );
};

const InputCtrl =
  // React.forwardRef(({ onChange, object }, objectRef) => {
  ({ onChange, object }) => {
    const { transfCtrl } = useSampleStates();

    const onMove = (event) => {
      onChange(event.target.object.matrix)
    }

    useEffect(() => {
      if (transfCtrl.enabled) {
        console.log("attach controled object");
        transfCtrl.attach(object);
        transfCtrl.addEventListener('dragging-changed', onMove);
      }
    }, [transfCtrl]);

    // cleanup effect hook
    useEffect(() => () => {
      console.log("detach controled object");
      transfCtrl.detach();
      transfCtrl.removeEventListener('dragging-changed', onChange);
    }, []);

    return <></>
  }//)

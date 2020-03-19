import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import { Box3, Vector3, Color } from "three";
import { useSampleStates } from "../../common/SampleStates";

export type BoxStyle = {
  color: string,
  alpha: number,
  ghostColor: string,
  ghostAlpha: number
}

export type BoxEntity = {
  box: Box3,
  selected: Boolean
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
  hovered: {            // only affects unselected box
    color: 'white',   // seems to have no impact
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

export const BoxEntityCtrlHlp = ({ boxEnt, onClick = () => { }, onChange = () => { }, boxStyle = defaultStyle }:
  { boxEnt: BoxEntity, onClick?: any, onChange?: any, boxStyle?: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const boxRef: any = useRef();
  const ghostRef: any = useRef();

  const boxDim: any = new Vector3()
  boxEnt.box.getSize(boxDim);
  const boxCenter: any = new Vector3()
  boxEnt.box.getCenter(boxCenter);

  var style = {...defaultStyle};
  Object.assign(style, boxStyle); // fill missing custom style properties if any

  // color
  const color = boxEnt.selected ? style.selected.color : style.default.color;
  const alpha = boxEnt.selected ? style.selected.alpha : isHovered ? style.hovered.alpha : style.default.alpha;
  const ghostColor = boxEnt.selected ? style.selected.ghostColor : style.default.ghostColor;
  const ghostAlpha = boxEnt.selected ? style.selected.ghostAlpha : isHovered ? style.hovered.ghostAlpha : style.default.ghostAlpha;

  // Events
  const onHover = //useCallback(
    (e:any, enabled: any) => {
      e.stopPropagation();
      setIsHovered(enabled);
    }//,[isHovered]);

  var inputCtrl: any = useRef();
  useEffect(() => {
    inputCtrl.current = boxEnt.selected ? <InputCtrl /*ref={ghostRef}*/ onChange={onChange} object={ghostRef.current} /> : "";
    boxRef.current.setFromObject(ghostRef.current);
  })



  return (
    <>
      {inputCtrl.current}
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
  ({ onChange, object }: any) => {
    const { transfCtrl } = useSampleStates();

    const onMove = (event: any) => {
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

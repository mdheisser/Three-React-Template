import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as THREE from 'three'
import { Box3, Vector3, Matrix4, Color, LineBasicMaterial } from "three";
import { useSampleStates } from "../../common/SampleStates";
/**
 * an entitiy that doesn't have selected or onMove properties 
 * cannot be seleted nor moved
 * 
 */
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
  onMove: (matrix: Matrix4) => {}
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

export default ({ boxEntities = [], selectMode = BOX_SELECT_MODES.SINGLE, globalStyle = defaultStyle }:
  { boxEntities: BoxEntity[], selectMode?: BOX_SELECT_MODES, globalStyle?: any }) => {
  const [entities, setEntities] = useState(boxEntities);

  const { transfCtrl } = useSampleStates();

  useEffect(() => {
    if (boxEntities.length === entities.length) {
      boxEntities.forEach((ent, i) => ent.selected = entities[i].selected)
    }
    setEntities(boxEntities);
  }, [boxEntities]);

  // const countItems = () => {
  //   var count = entities.reduce((sum: number, key: any) => entities[key].selected ? sum + 1 : sum, 0);
  //   return count
  // }
  const getSelected = () => {
    return entities.filter(ent => ent.selected)
  }
  // boxes = [];
  const hoverable = getSelected().length === 0; //&& selectMode !== BOX_SELECT_MODES.ALLORNOT;

  const handleClick = useCallback(
    (id: any, e: any) => {
      e.stopPropagation();
      // selection
      if (e.button === 1 && entities[id].selected !== undefined) {
        var selectState = entities[id].selected;
        if (selectMode !== BOX_SELECT_MODES.MULTI) // clear selection
          entities.forEach(ent => {
            if (ent.selected !== undefined)
              ent.selected = false
          });

        entities[id].selected = !selectState;
        setEntities([...entities])
        if (entities[id].selected && entities[id].onMove) {
          transfCtrl.attach(e.object);
        }
        else {
          transfCtrl.detach();
        }
      }
    }, [transfCtrl, entities])

  const boxListHlp = selectMode !== BOX_SELECT_MODES.ALLORNOT ? boxEntities.map((boxEnt: BoxEntity, i: number) => {
    return <BoxHlp key={i}
      boxEnt={boxEnt}
      handleClick={(e: any) => handleClick(i, e)}
      // hoverable={hoverable}
      boxStyle={globalStyle} />;
  }) : [];

  const allOrNothing = (enabed: boolean) => {
    setEntities((prev: BoxEntity[]) => {
      prev.forEach((ent) => ent.selected = enabed)
      return [...prev]
    })
  }

  const onMove = (event: any) => {
    // console.log("drag ", event.value ? "begin" : "end");
    if (!event.value) { // on drag out
      // var id: any = getSelected()[0];
      // need to use a ref here, because we are in a listener 
      // entitiesRef.current[id].onMove(transfCtrl.object.matrix);
      var selectedEntity = getSelected()[0];
      if (selectedEntity) {
        selectedEntity.onMove(transfCtrl.object.matrix);
      } else {
        console.log("error: undefined selected entity => can't move");
      }
    }
  }

  useEffect(() => {
    if (transfCtrl.enabled) {
      transfCtrl.addEventListener('dragging-changed', onMove);
    }
  }, [transfCtrl]);

  // cleanup effect hook
  useEffect(() => () => {
    console.log("clean boxlist hlp before unmount");
    transfCtrl.detach();
    transfCtrl.removeEventListener('dragging-changed', onMove);
  }, []);

  return (
    <group>
      {boxListHlp}
    </group>
  );
}

const BoxHlp = ({ boxEnt, handleClick, boxStyle }: { boxEnt: BoxEntity, handleClick: any, boxStyle: any }) => {
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

  return (
    <>
      <boxHelper ref={boxRef}>
        <lineBasicMaterial attach='material' color={new Color(color)} transparent opacity={alpha} />
      </boxHelper>
      <mesh ref={ghostRef} attach="object"
        // visible={ghostAlpha > 0}
        position={boxCenter}
        onPointerUp={e => handleClick(e)}
        onPointerOver={e => onHover(e, true)}
        onPointerOut={e => onHover(e, false)}
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

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as THREE from 'three'
import { Box3, Vector3, Matrix4, Color, LineBasicMaterial } from "three";
import { useSampleStates } from "../../common/SampleStates";

export type BoxMovableEntity = {
  box: Box3,
  color: Color,
  selected: Boolean,
  onMove: (matrix: Matrix4) => {}
}

export enum BOX_SELECT_MODES {
  SINGLE,
  MULTI,
  DRAG,
  DRAGMULTI,
  ALLORNOT
}

export default ({ boxEntities = [], selectMode = BOX_SELECT_MODES.SINGLE }:
  { boxEntities: BoxMovableEntity[], selectMode?: BOX_SELECT_MODES }) => {
  const [entities, setEntities] = useState(boxEntities);

  const entitiesRef = useRef(entities);
  useEffect(() => {
    entitiesRef.current = entities;
  }, [entities]);
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
    // console.log(entitiesRef.current);
    return entitiesRef.current.filter(ent => ent.selected)
    // .map(ent=>ent.selected);
  }
  // boxes = [];
  const hoverable = getSelected().length === 0; //&& selectMode !== BOX_SELECT_MODES.ALLORNOT;

  const boxListHlp = selectMode !== BOX_SELECT_MODES.ALLORNOT ? boxEntities.map((boxEnt: BoxMovableEntity, i: number) => {
    return <BoxHlp key={i}
      boxEnt={boxEnt}
      handleClick={(e: any) => handleClick(i, e)}
      hoverable={hoverable} />;
  }) : [];

  const handleClick = useCallback(
    (id: any, e: any) => {
      e.stopPropagation();
      // selection
      if (e.button === 1) {
        // if (getSelected().length === 0 || state[id]) {
        var curr = entitiesRef.current[id].selected;
        if (selectMode !== BOX_SELECT_MODES.MULTI) allOrNothing(false);

        setEntities((prev: any) => {
          prev[id].selected = !curr;
          return [...prev];
          // return { ...prev, [id]: !curr }
        })
        if (!curr) {
          transfCtrl.attach(e.object);
        }
        else {
          transfCtrl.detach();
        }
      }
    }, [transfCtrl])

  const allOrNothing = (isVisible: boolean) => {
    setEntities((prev: BoxMovableEntity[]) => {
      prev.forEach((ent) => ent.selected = isVisible)
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

const BoxHlp = ({ boxEnt, handleClick, hoverable }: { boxEnt: BoxMovableEntity, handleClick: any, hoverable: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const boxRef: any = useRef();
  const ghostRef: any = useRef();
  const hoverableRef: any = useRef();
  hoverableRef.current = hoverable;

  const boxDim: any = new Vector3()
  boxEnt.box.getSize(boxDim);
  const boxCenter: any = new Vector3()
  boxEnt.box.getCenter(boxCenter);

  // color
  const color = boxEnt.color ? boxEnt.color : boxEnt.selected ? 0xe5d54d : 0xffffff; //(isSelected ? 0xff0000 : 0xffffff);
  const ghostColor = boxEnt.color ? boxEnt.color : boxEnt.selected ? 0xe5d54d : 0xffffff; //(isSelected ? 0xff0000 : 0xffffff);
  const alpha = boxEnt.selected ? 0.8 : isHovered ? 0.5 : 0.1;
  const ghostAlpha = (boxEnt.selected || isHovered) ? 0.2 : 0.0;

  // Events
  const onHover = useCallback(
    (e, enabled) => {
      if (hoverableRef.current) {
        e.stopPropagation();
        setIsHovered(enabled);
      }
    },
    [setIsHovered]
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

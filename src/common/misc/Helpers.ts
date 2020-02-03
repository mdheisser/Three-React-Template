import * as THREE from 'three';
import { Box3, Color, Group } from 'three';

export const AxeGridHelper: any = (size: number) => {
    var hlpGrp = new Group();
    hlpGrp.add(new THREE.GridHelper(size, Math.round(size/12)));
    hlpGrp.add(new THREE.AxesHelper(size/2));
    hlpGrp.visible = true;
    return hlpGrp;
}

/**
 * Used to display a group of boxes
 * Add `meshGrp` to the scene to display it 
 */
export class BoxListHelper {

    meshGrp: Group;
    subBoxesArr: BoxListHelper[];

    /**
     * 
     * @param boxes the boxes to display
     * @param customColorFn a function to tweak box colors
     * @param subBoxesList 
     */
    constructor(boxes: any[], customColorFn?: ((boxIndex: any) => Color) | undefined, subBoxesList?: any)  {
        this.meshGrp = new Group();
        this.getBoxColor = customColorFn ? customColorFn : this.getBoxColor;
        this.subBoxesArr = subBoxesList;
        this.refresh(boxes);
    }

    getBoxColor = (boxIndex: any = null) => {
        // var lut = new Lut("rainbow", boxes.length * 10);
        // return lut.getColor(Math.random());
        return new Color(0xffffff);
    };

    refresh(boxes: Box3[]) {
        this.meshGrp.children = [];
        if (boxes && boxes.length) {
            boxes.forEach((box, i) => {
                var boxHlp = new THREE.Box3Helper(box, this.getBoxColor());
                if (this.subBoxesArr && this.subBoxesArr[i]) {
                    boxHlp.children.push(this.subBoxesArr[i].meshGrp)
                    boxHlp.children[0].visible = false;
                }
                boxHlp.visible = true;
                this.meshGrp.add(boxHlp);
            })
        }
    }

    singleBox(id: number | null, showSubBoxes = false) {
        this.allBoxes(false)
        if (id !== null && this.meshGrp.children[id]) {
            this.meshGrp.children[id].visible = true;
            if (this.meshGrp.children[id].children[0]) {
                this.meshGrp.children[id].children[0].visible = showSubBoxes;
            }
            // if (showSubBoxes && this.subBoxList) {
            //     var subBoxList = subBoxesArr[id]
            //     subBoxList.highlightAllBoxes(true);
            // }
        }
    }

    allBoxes(visible: boolean) {
        this.meshGrp.children.forEach(boxHlp => {
            boxHlp.visible = visible;
        })
    }
}
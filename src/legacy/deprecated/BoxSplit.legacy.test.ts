import * as THREE from 'three'
import { BoxSplitter } from '../../common/misc/BoxUtils'
import watch from 'redux-watch'
import store from '../../redux/store'
import { BoxListHelper, AxeGridHelper } from '../../common/misc/Helpers';
import Sample from '../Sample';
import Engine from '../Engine';
import { Color } from 'three';

export default class BoxSplitTests extends Sample {

    selectedIndex = 0;
    boxSplitReject: any;
    dbgHlpGrp: any;

    constructor(props: any) {
        super(props);
        
        // Engine.scene.add(AxeGridHelper(128));
    }

    runSample(testId: string){
        console.log("Running test #" + testId);
        Engine.camera.position.x = 0;
        Engine.camera.position.y = 32;
        Engine.camera.position.z = 256;
        this.dbgHlpGrp = new THREE.Group();
        Engine.scene.add(this.dbgHlpGrp);
        this.initStateListeners();
        // this[testId]();
        this.test2();
    };

    // animate(){

    // }

    initStateListeners() {
        let w = watch(store.getState, 'DemoSamples.commands.switch')
        store.subscribe(w((newVal: any, oldVal: any, objectPath: any) => {
            console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
            this.selectCombination(this.selectedIndex++);
        }))
    }

    debugAction = (val: any) => {
        // console.log(val);
    }

    selectCombination(index: number) {
        var splitHlp = new BoxListHelper(this.boxSplitReject[index], (i) => { return new Color(0x00ff00); });
        if (!this.dbgHlpGrp.children.length) {
            this.dbgHlpGrp.add(splitHlp.meshGrp);
        }
        else {
            this.dbgHlpGrp.children[0] = splitHlp.meshGrp;
        }

    }

    test1() {
        var min = new THREE.Vector3(77, 36.5, -3.5);
        var max = new THREE.Vector3(109, 100.5, 0);
        var box = new THREE.Box3(min, max);
        min = new THREE.Vector3(0, 0.5, -3.5);
        max = new THREE.Vector3(128, 128, 0);
        var box2 = new THREE.Box3(min, max);
        var hlp = new BoxListHelper([box, box2]);
        Engine.scene.add(hlp.meshGrp);
        var boxSplit = BoxSplitter.split(box, [box2]);
        console.log(boxSplit);
    }

    test2() {
        var size = 20;
        var matrix = new THREE.Matrix4();
        matrix.makeScale(size, size, size);
        var min = new THREE.Vector3(0, 0, 0);
        var max = new THREE.Vector3(2, 2, 2);
        var box = new THREE.Box3(min, max);
        box.applyMatrix4(matrix);
        min = new THREE.Vector3(1, 1, 1);
        max = new THREE.Vector3(3, 3, 3);
        var box2 = new THREE.Box3(min, max);
        box2.applyMatrix4(matrix);
        var hlp = new BoxListHelper([box, box2]);
        Engine.scene.add(hlp.meshGrp);
        var intersectBox = box.clone().intersect(box2);
        var intersectHlp = new BoxListHelper([intersectBox], (i) => { return new Color(0xff0000); });
        Engine.scene.add(intersectHlp.meshGrp);
        var boxSplit = BoxSplitter.split(box, [intersectBox]);
        var splitHlp = new BoxListHelper(boxSplit, (i) => { return new Color(0x00ff00); });
        Engine.scene.add(splitHlp.meshGrp);
        console.log(splitHlp);
    }

    test3() {
        var size = 20;
        var matrix = new THREE.Matrix4();
        matrix.makeScale(size, size, size);
        var min = new THREE.Vector3(0, 0, 1);
        var max = new THREE.Vector3(4, 4, 2);
        var box = new THREE.Box3(min, max);
        box.applyMatrix4(matrix);
        min = new THREE.Vector3(1, 1, 0);
        max = new THREE.Vector3(3, 3, 3);
        var box2 = new THREE.Box3(min, max);
        box2.applyMatrix4(matrix);
        var hlp = new BoxListHelper([box, box2]);
        Engine.scene.add(hlp.meshGrp);
        var intersectBox = box.clone().intersect(box2);
        var intersectHlp = new BoxListHelper([intersectBox], (i) => { return new Color(0xff0000); });
        Engine.scene.add(intersectHlp.meshGrp);
        var boxSplit = BoxSplitter.split(box, [intersectBox]);
        // if (boxSplit.length > 1) {
        //     this.boxSplit = boxSplit;
        //     boxSplit = BoxSplitter.split(box, boxSplit[0]);
        //     console.log(boxSplit);
        // }
        var splitHlp = new BoxListHelper(boxSplit, (i) => { return new Color(0x00ff00); });
        Engine.scene.add(splitHlp.meshGrp);
        console.log(splitHlp);
    }

    test4() {
        // max:Vector3 {x: -36, y: 80, z: 92}
        // min:Vector3 {x: -92, y: -16, z: 36}
        // max:Vector3 {x: -36, y: 70.4, z: 92}
        // min:Vector3 {x: -92, y: -6.399999999999999, z: 36}
        var size = 20;
        var matrix = new THREE.Matrix4();
        matrix.makeScale(size, size, size);
        var min = new THREE.Vector3(-92, -16, 36);
        var max = new THREE.Vector3(-36, 80, 92);
        var box = new THREE.Box3(min, max);
        // box.applyMatrix4(matrix);
        min = new THREE.Vector3(-92, -6.399999999999999, 36);
        max = new THREE.Vector3(-36, 70.4, 92);
        var box2 = new THREE.Box3(min, max);
        // box2.applyMatrix4(matrix);
        var hlp = new BoxListHelper([box, box2]);
        Engine.scene.add(hlp.meshGrp);
        var intersectBox = box.clone().intersect(box2);
        var intersectHlp = new BoxListHelper([intersectBox], (i) => { return new Color(0xff0000); });
        Engine.scene.add(intersectHlp.meshGrp);
        var boxSplit = BoxSplitter.split(box, [intersectBox]);
        if (boxSplit) {
            var splitHlp = new BoxListHelper(boxSplit, (i) => { return new Color(0x00ff00); });
            Engine.scene.add(splitHlp.meshGrp);
            console.log(splitHlp);
        } else {
            this.boxSplitReject = BoxSplitter.getRejected();
            // boxSplit = BoxSplitter.split(box, boxSplit[0]);
            // console.log(boxSplit);
        }
    }

    default() {

        // min: Vector3 {x: -120.54866776461628, y: -32, z: -120.54866776461628}
        // Max: Vector3 {x: -7.451332235383724, y: 96, z: -7.451332235383724}
        // min: Vector3 {x: -101.69911184307752, y: 0, z: -101.69911184307752}
        // Max: Vector3 {x: -26.300888156922483, y: 64, z: -26.300888156922483}
        var size = 20;
        var matrix = new THREE.Matrix4();
        matrix.makeScale(size, size, size);
        var min = new THREE.Vector3(-120.54866776461628, -32, -120.54866776461628);
        var max = new THREE.Vector3(7.451332235383724, 96, -7.451332235383724);
        var box = new THREE.Box3(min, max);
        // box.applyMatrix4(matrix);
        min = new THREE.Vector3(-101.69911184307752, 0, -101.69911184307752);
        max = new THREE.Vector3(-26.300888156922483, 64, -26.300888156922483);
        var box2 = new THREE.Box3(min, max);
        // box2.applyMatrix4(matrix);
        var hlp = new BoxListHelper([box, box2]);
        Engine.scene.add(hlp.meshGrp);
        // var intersectBox = box.clone().intersect(box2);
        // var intersectHlp = new BoxListHelper([intersectBox], (i) => { return 0xff0000; });
        // this.scene.add(intersectHlp.meshGrp);
        // var boxSplit = BoxSplitter.split(box, [intersectBox]);
        // if (boxSplit) {
        //     var splitHlp = new BoxListHelper(boxSplit, (i) => { return 0x00ff00; });
        //     this.scene.add(splitHlp.meshGrp);
        //     console.log(splitHlp);
        // } else {
        //     this.boxSplitReject = BoxSplitter.getRejected();
        // }
    }


}


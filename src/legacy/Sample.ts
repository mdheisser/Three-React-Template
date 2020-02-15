import { AmmoLib } from "./PhysAmmo";
import Engine from "./Engine";

export default class Sample extends Engine {

    updatable: any[] = [];
    static animated: any[] = [];
    dynamic: any[] = [];
    // sampleId: string;

    constructor(props: any) {
        super(props);
    // this.sampleId = store.getState().DemoSamples.sampleId;
    // this.initStateListeners(); // this.stateListener = new StateListener();
    }

    // initStateListeners() {
    //     let w = watch(store.getState, 'Voxels.raycast.locked')
    //     store.subscribe(w((newVal: any, oldVal: any, objectPath: any) => {
    //         this.ctrlMgr.Controls.ORBIT.enableKeys = !newVal;
    //         // this.selectedEntity = this.VoxelVolume.voxelEntities[store.getState().Voxels.raycast.entityId];
    //     }));
    // }

    // registerForUpdate(obj: any) {
    //     this.arrayObjUpdate.push(obj);
    // }

    // unregisterForUpdate(obj: any) {
    //     this.arrayObjUpdate.forEach((item, idx, arr) => {
    //         if (item == obj)
    //             arr.splice(idx, 1);
    //     })
    // }


    /**
     * Every scene objects needing animation/update goes here
     * @param time 
     * @param delta 
     */
    animate(time: any, delta: any) {
        // dynamic physical objects
        // for (var i = 0, il = Sample.dynamic.length; i < il; i++) {
        this.dynamic.forEach((objThree, i) => {
            var ms = objThree.userData.physicsBody.getMotionState();
            if (ms) {
                var transformAux = new AmmoLib.btTransform();;
                ms.getWorldTransform(transformAux);
                var p = transformAux.getOrigin();
                var q = transformAux.getRotation();
                objThree.position.set(p.x(), p.y(), p.z());
                objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
            }
        });

        // animated objects
        // this.dayTime = (time / 4) % 24;
        this.updatable.forEach((item) => {
            if (item.userData)
                item.userData.update(time);
            else if (item.anim)
                item.anim(time);
            else
                item.update(time);
        })
    }

    render(){
        return super.render();
    }

}

// export class StateListener {


//     constructor() {
//         this.init();
//     }

//     init() {
//         let w = watch(store.getState, 'Voxels.raycast.locked')
//         store.subscribe(w((newVal, oldVal, objectPath) => {
//             console.log('selected entity: %s', newVal);
//             // this.selectedEntity = this.VoxelVolume.voxelEntities[store.getState().Voxels.raycast.entityId];
//         }));
//     }
// }
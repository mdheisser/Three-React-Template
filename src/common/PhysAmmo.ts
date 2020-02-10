import * as Ammo from 'three/examples/js/libs/ammo';


export var AmmoLib: any;

export const load = () => {
    Ammo().then((ammo: any) => {
        AmmoLib = ammo;
        // init();
        // animate();
        console.log("Ammo loaded")
    });
}

export class PhysAmmo {
    static AmmoLib: any;
    dynamicObj = [];
    // Physics variables
    collisionConfiguration: any;
    dispatcher: any;
    broadphase: any;
    solver: any;
    physicsWorld: any;

    constructor() {
        load();
        this.init();
    }

    init() {
        // Physics configuration
        this.collisionConfiguration = new AmmoLib.btDefaultCollisionConfiguration();
        this.dispatcher = new AmmoLib.btCollisionDispatcher(this.collisionConfiguration);
        this.broadphase = new AmmoLib.btDbvtBroadphase();
        this.solver = new AmmoLib.btSequentialImpulseConstraintSolver();
        this.physicsWorld = new AmmoLib.btDiscreteDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration);
        this.physicsWorld.setGravity(new AmmoLib.btVector3(0, - 6, 0));
    }

}
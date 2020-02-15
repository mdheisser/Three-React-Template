import * as THREE from 'three';
// var LightAnim = {};

/**
 * Light presets
 */

// CentralSpot 
var CentralSpot = new THREE.SpotLight(0xffffff, 1);
CentralSpot.name = "CentralSpotLight";
CentralSpot.position.set(15, 40, 35);
CentralSpot.angle = Math.PI / 4;
CentralSpot.penumbra = 0.05;
CentralSpot.decay = 2;
CentralSpot.distance = 250;
CentralSpot.castShadow = true;
CentralSpot.shadow.mapSize.width = 1024;
CentralSpot.shadow.mapSize.height = 1024;
CentralSpot.shadow.camera.near = 10;
CentralSpot.shadow.camera.far = 200;
// CentralSpot.userData.update = (time: number) =>LightAnim.oscillationXZ(time, CentralSpot);

// Spotlight 2
var SurroundSpot = CentralSpot.clone();
SurroundSpot.name = "SurroundingSpotLight";
SurroundSpot.position.set(-600,400,0);
SurroundSpot.angle = Math.PI / 8;
SurroundSpot.distance = 2000
SurroundSpot.shadow.camera.far = 15000;
SurroundSpot.userData.update = (time: number) => {
    SurroundSpot.position.z = 80*Math.cos(time/4);
};

// Sunlight
const sizeFactor=1;
var Sunlight = new THREE.DirectionalLight( 0xFEE465, 1 );
Sunlight.name = "SunLight";
Sunlight.position.set( 700, 200, 0 ); 			//default; light shining from top
Sunlight.castShadow = true;            // default false

//Set up shadow properties for the light
Sunlight.shadow.mapSize.width = 1024;  // default
Sunlight.shadow.mapSize.height = 1024; // default
Sunlight.shadow.camera.left = -500;
Sunlight.shadow.camera.right = 500;
Sunlight.shadow.camera.bottom = -200;
Sunlight.shadow.camera.top = 200;
Sunlight.shadow.camera.near = 0.5;    // default
Sunlight.shadow.camera.far = 5000;     // default

export {CentralSpot, SurroundSpot, Sunlight};


/**
 * Lights animations
 */
// LightAnim.oscillationXZ = (t: number, obj: THREE.Light) => {
//     obj.position.x = 80*Math.cos(t/4);
//     obj.position.z = 400*Math.cos(t/10);
// }
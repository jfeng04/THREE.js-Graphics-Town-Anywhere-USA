/*jshint esversion: 6 */
// @ts-nocheck

/*
 * A file for one-time units
 *
 * NEIGHBORHOOD CHECK NEIGHBORHOOD AND HIGHWAY 
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { constructionPerimeter , craneMachine, trashTruck, constructionLights} from "./constructionSite.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

let vanXPos = -100;
let vanZPos1 = 0;
let vanZPos2 = -6;
let posOrNeg = 1;

let VSLightBlue = `
varying vec3 v_Normal;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_Normal = normal;
}`;
let FSLightBlue = `
uniform float speed;
uniform float time; 
uniform float opacityminus;
void main() {
    gl_FragColor = vec4(0, 0, opacityminus*clamp(abs(sin(speed*time/200.0)),0.2,2.0), 1);
}
`;
let VSLightRed = `
varying vec3 v_Normal;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_Normal = normal;
}`;
let FSLightRed = `
uniform float speed;
uniform float time; 
uniform float opacityminus;
void main() {
  gl_FragColor = vec4(opacityminus*clamp(abs(cos(speed*time/200.0)),0.2,2.0),0,0,1);
}
`;

/**
 * This is the popo car
 */
let textureLoader = new T.TextureLoader();
let glftLoader = new GLTFLoader();

export class stationaryPopo extends GrObject {
  constructor(params = {}) {

    let bothPopos = new T.Group();
    let sirenGroup = new T.Group();
    let popoCar = new T.Group();
    let popoCar2 = new T.Group();

    glftLoader.load("../examples/assets/grand_theft_auto_san_andreas_-_police_car_-_lspd/scene.gltf", function(gltf) {

        let policeCar = gltf.scene; 
        
       
        policeCar.scale.set(1, 1, 1); 
        policeCar.rotation.set(0,Math.PI/2 * 0.2,0); 
        policeCar.position.set(-10,0.8,10.175);
        popoCar.add(policeCar);
      }, undefined, function(error) {
        console.error('An error happened', error);
      });

      let sirenBlueGeom = new T.BoxGeometry(.3,.2,1);
      let sirenBlueMat = new T.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          speed: {value: 1.0},
          opacityminus: {value: 1.0}
        },
        vertexShader: VSLightBlue,
        fragmentShader: FSLightBlue
      });

      let sirenBlueMesh = new T.Mesh(sirenBlueGeom,sirenBlueMat);
      sirenBlueMesh.position.set(10.4,1.7,9.45);

      popoCar.add(sirenBlueMesh);


      let sirenRedGeom = new T.BoxGeometry(.3,.2,1);
      let sirenRedMat = new T.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          speed: {value: 1.0},
          opacityminus: {value: 1.0}
        },
        vertexShader: VSLightRed,
        fragmentShader: FSLightRed
      });
      let sirenRedMesh = new T.Mesh(sirenRedGeom,sirenRedMat);
      sirenRedMesh.position.set(10.4,1.7,10.45);

      sirenGroup.add(sirenBlueMesh);
      sirenGroup.add(sirenRedMesh);
      popoCar.add(sirenGroup);
      bothPopos.add(popoCar);

      let sirenGroup2 = sirenGroup.clone();
      sirenGroup2.position.set(-7.7,0,-2.4);
      sirenGroup2.rotateY(-Math.PI * 0.4);

    glftLoader.load("../examples/assets/grand_theft_auto_san_andreas_-_police_car_-_lspd/scene.gltf", function(gltf) {

        let policeCar = gltf.scene; 
        
       
        policeCar.scale.set(1, 1, 1); 
        policeCar.rotation.set(0,Math.PI/2,0); 
        policeCar.position.set(6,0.8,10);
        popoCar2.add(policeCar);
      }, undefined, function(error) {
        console.error('An error happened', error);
      });
    popoCar2.position.x = 4;
    


    popoCar2.add(sirenGroup2);
    bothPopos.add(popoCar2);



    super("stationaryPopo",bothPopos);
    this.sirenBlueMat = sirenBlueMat;
    this.sirenRedMat = sirenRedMat;
  }

  stepWorld(delta,timeOfDay){
    this.sirenBlueMat.uniforms.time.value += delta;
    this.sirenRedMat.uniforms.time.value += delta;
  }
}

export class movingSwatVan extends GrObject {
    constructor(params = {}) {
  
      let swatVan = new T.Group();
      let wheel_group = new T.Group(); 
      let swatVanComplete = new T.Group();   
      let sirenGroup = new T.Group();
      
      
  
      // perfect asset I MADE from workbook 7
      let exSettings = {
        steps: 2,
        depth: 0.85,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelSegments: 2
      };
      let cabSettings = {
        steps: 2,
        depth: 0.7,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelSegments: 2
      };
      let backSettings = {
        steps: 2,
        depth: 2.5,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelSegments: 2
      };
      let bottomSettings = {
        steps: 2,
        depth: 4.2,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelSegments: 2
      };
      let wheelGeometry = new T.CylinderGeometry(0.3,0.3,0.2);
      let wheelMaterial = new T.MeshStandardMaterial(
      {color: "black",
      metalness: 0.6,
      roughness: 0.3});
  
      let wheelMesh1 = new T.Mesh(wheelGeometry,wheelMaterial);
      let wheelMesh2 = new T.Mesh(wheelGeometry,wheelMaterial);
      let wheelMesh3 = new T.Mesh(wheelGeometry,wheelMaterial);
      let wheelMesh4 = new T.Mesh(wheelGeometry,wheelMaterial);
  
      wheel_group.add(wheelMesh1,wheelMesh2,wheelMesh3,wheelMesh4);
      wheel_group.rotateZ(Math.PI/2);
      wheel_group.position.y = 0.3;
      swatVan.add(wheel_group);
      wheelMesh2.position.y = 1.5;
      wheelMesh3.position.z = -3.5
      wheelMesh4.position.z = -3.5;
      wheelMesh4.position.y = 1.5;
      let bodyGroup = new T.Group();
      let backGroup = new T.Group();
      swatVan.add(bodyGroup);
      swatVan.add(backGroup);
      let truckBodyCurve = new T.Shape();
      let truckBodyMaterial = new T.MeshStandardMaterial({
        color: 'black',
        metalness: 0.5,
        roughness: 0.7
      });
  
      let truckBinMaterial = new T.MeshStandardMaterial({
        color: "black",
        metalness: 0.5,
        roughness: 0.7
      });
      let truckFenderMaterial = new T.MeshStandardMaterial({
        color: "#888888",
        metalness: 0.6,
        roughness: 0.3
      });
      
      
      truckBodyCurve.moveTo(-1.55, 0.75);
      truckBodyCurve.lineTo(-1.6, 1.5);
      truckBodyCurve.lineTo(0.15, 1.5);
      truckBodyCurve.lineTo(0.1, 0.75);
      truckBodyCurve.lineTo(-1.55, 0.75);
  
      let truckbody_geom = new T.ExtrudeGeometry(truckBodyCurve, exSettings);
      let truckBody = new T.Mesh(truckbody_geom, truckBodyMaterial);
      truckBody.position.z = -3.75;
      bodyGroup.add(truckBody);
  
      let cabCurve = new T.Shape();
  
      cabCurve.moveTo(-1.55,1.5);
      cabCurve.lineTo(-1.5, 2.3);
      cabCurve.lineTo(0.05, 2.3);
      cabCurve.lineTo(0.1, 1.5);
      cabCurve.lineTo(-1.55, 1.5);
  
  
      let cab_geom = new T.ExtrudeGeometry(cabCurve, cabSettings);
      let cab = new T.Mesh(cab_geom, truckBodyMaterial);
      cab.position.z = -3.6;
      bodyGroup.add(cab);
  
      let backCurve = new T.Shape();
  
      backCurve.moveTo(-1.75,1.0);
      backCurve.lineTo(-1.75, 2.5);
      backCurve.lineTo(0.25, 2.5);
      backCurve.lineTo(0.25, 1.0);
      backCurve.lineTo(-1.75, 1.0);
  
  
      let back_geom = new T.ExtrudeGeometry(backCurve, backSettings);
      let back_mesh = new T.Mesh(back_geom, truckBinMaterial);
      back_mesh.position.z = -2.5;
      backGroup.add(back_mesh);
  
      let bottomCurve = new T.Shape();
  
      bottomCurve.moveTo(-1.6,0.65);
      bottomCurve.lineTo(-1.6, .75);
      bottomCurve.lineTo(0.1, .75);
      bottomCurve.lineTo(0.1, 0.65);
      bottomCurve.lineTo(-1.6, 0.65);
  
  
      let bottom_geom = new T.ExtrudeGeometry(bottomCurve, bottomSettings);
      let bottom = new T.Mesh(bottom_geom, truckFenderMaterial);
      bottom.position.z = -3.9;
      bodyGroup.add(bottom);



      let sirenBlueGeom = new T.BoxGeometry(.3,.2,1);


      let sirenBlueMat = new T.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          speed: {value: 1.0},
          opacityminus: {value: 1.0}
        },
        vertexShader: VSLightBlue,
        fragmentShader: FSLightBlue
      });

      let sirenBlueMesh = new T.Mesh(sirenBlueGeom,sirenBlueMat);
      sirenBlueMesh.position.set(10.4,1.7,9.45);

      let sirenRedGeom = new T.BoxGeometry(.3,.2,1);

      let sirenRedMat = new T.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          speed: {value: 1.0},
          opacityminus: {value: 0.0}
        },
        vertexShader: VSLightRed,
        fragmentShader: FSLightRed
      });

      let sirenRedMesh = new T.Mesh(sirenRedGeom,sirenRedMat);
      sirenRedMesh.position.set(10.4,1.7,10.45);



      sirenGroup.add(sirenBlueMesh);
      sirenGroup.add(sirenRedMesh);

      sirenGroup.position.set(-10.65,0.8,7.5);
      sirenGroup.rotation.set(0,Math.PI/2,0);
      swatVan.add(sirenGroup);

      let headlightTarget = new T.Mesh(new T.BoxGeometry(.1,.1,.1), new T.MeshStandardMaterial({}));
      headlightTarget.material.visible = false;

      let headlight = new T.SpotLight( 0xffffff,100);
      headlight.position.set( 0,2,-4.65);
      headlight.rotation.y = Math.PI;
        headlight.angle = Math.PI / 6;
        headlight.target = headlightTarget;
        headlight.penumbra = 0.5;
        swatVanComplete.add(headlight);
      headlightTarget.position.z = -8;
      headlightTarget.position.x = -0.75;

    swatVan.add(headlightTarget);

      swatVan.rotation.y = Math.PI;
      swatVan.position.z = -9.5
      swatVan.position.x = -0.75
      swatVan.position.y = 0.1;
      swatVan.scale.set(1.2, 1.2, 1.2);
      swatVanComplete.add(swatVan);

      let swatInsignia = textureLoader.load("../examples/assets/swatvan.png");
      let insigniaGeom = new T.PlaneGeometry(3,2);
      let insigniaMat = new T.MeshStandardMaterial({map: swatInsignia});
      let insigniaMesh = new T.Mesh(insigniaGeom,insigniaMat);
      insigniaMesh.position.set(1.5,2.2,-8);
      insigniaMesh.rotation.set(0,Math.PI/2,0);

      let insigniaOpposite = insigniaMesh.clone();
      insigniaOpposite.position.x = -1.2;
      insigniaOpposite.rotation.y = (-Math.PI/2);
      
 
      swatVanComplete.add(insigniaMesh);
      swatVanComplete.add(insigniaOpposite);

      swatVanComplete.rotation.y = Math.PI/2;
      swatVanComplete.position.x = vanXPos;
      swatVanComplete.position.z = vanZPos1;

      super("movingSwatVan",swatVanComplete);
      this.rideable = swatVanComplete;
      this.sirenBlueMat = sirenBlueMat;
      this.sirenRedMat = sirenRedMat;
      this.vanXPos = vanXPos;
      this.swatVanComplete = swatVanComplete;
      this.posOrNeg = posOrNeg;
    }
  
    stepWorld(delta,timeOfDay){
        this.vanXPos += delta * 0.03 * this.posOrNeg;
        this.swatVanComplete.position.x = this.vanXPos;
        if(Math.abs(this.vanXPos) > 100){
            this.swatVanComplete.rotateY(Math.PI);
            this.posOrNeg *= -1;
            if (this.posOrNeg > 0) {
                this.swatVanComplete.position.z = vanZPos1;
                
            } else if(this.posOrNeg < 0){
                this.swatVanComplete.position.z = vanZPos2;
            }
        }

        

        if(this.vanXPos > 60){
            this.swatVanComplete.traverse((child) => {

                if (child.isMesh) {
                    child.material.opacity = 1 - 0.01*this.vanXPos;
                    child.material.transparent = true; 
                }
            });
            this.sirenBlueMat.uniforms.opacityminus.value *= 0.01*this.vanXPos;
            this.sirenRedMat.uniforms.opacityminus.value *= 0.01*this.vanXPos;

        } else if(this.vanXPos < -55){
            this.swatVanComplete.traverse((child) => {

                if (child.isMesh) {
                    child.material.opacity = 1 + 0.01*this.vanXPos;
                    child.material.transparent = true; 
                }
            });
            this.sirenBlueMat.uniforms.opacityminus.value *= 0.01*-this.vanXPos;
            this.sirenRedMat.uniforms.opacityminus.value *= 0.01*-this.vanXPos;
        }
        
        else{
            this.swatVanComplete.traverse((child) => {

                if (child.isMesh) {
                    child.material.opacity = 1;
                    child.material.transparent = true; 
                }
            });

            this.sirenBlueMat.uniforms.opacityminus.value = 1;
            this.sirenRedMat.uniforms.opacityminus.value = 1;

        }

        this.sirenBlueMat.uniforms.time.value += delta;
        this.sirenRedMat.uniforms.time.value += delta;
    }
  }





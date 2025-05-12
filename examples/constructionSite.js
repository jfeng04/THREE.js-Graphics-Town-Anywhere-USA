/*jshint esversion: 6 */
// @ts-nocheck

/*
 * G-town Building
 *
 * construction site 
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";

/**
 * This is the surrounding construction site
 */
let textureLoader = new T.TextureLoader();

export class constructionPerimeter extends GrObject {
  constructor(params = {}) {
    let perimGroup = new T.Group();

    let dirtGeom = new T.BoxGeometry(29.9,0.2,29.9);
    let dirtMat = new T.MeshStandardMaterial({color: "#5a4f3e", roughness: 9});
    let dirtMesh = new T.Mesh(dirtGeom,dirtMat);
    perimGroup.add(dirtMesh);

    perimGroup.position.x = -25;
    perimGroup.position.z = -25;


    let barrierGeom = new T.PlaneGeometry(25,3);
    let tarpyTexture = textureLoader.load("../examples/assets/tarp.png");
    tarpyTexture.repeat.set(4, 1);
    tarpyTexture.wrapS = T.RepeatWrapping; 
    tarpyTexture.wrapT = T.RepeatWrapping; 
    let barrierMaterial = new T.MeshStandardMaterial({ color: "#FF5F15", side: T.DoubleSide, bumpMap: tarpyTexture, bumpScale: 10});
    let barrierMesh1 = new T.Mesh(barrierGeom,barrierMaterial);
    barrierMesh1.position.set(-2.5,1.5,15);
    perimGroup.add(barrierMesh1);


    let barrierMesh2 = new T.Mesh(barrierGeom,barrierMaterial);
    barrierMesh2.position.set(15,1.5,-2.5);
    barrierMesh2.rotateY(Math.PI/2);
    perimGroup.add(barrierMesh2);

    let barrierLongGeom = new T.PlaneGeometry(30,3)
    let barrierMesh3 = new T.Mesh(barrierLongGeom,barrierMaterial);
    barrierMesh3.position.set(-15,1.5,0);
    barrierMesh3.rotateY(Math.PI/2);
    perimGroup.add(barrierMesh3);

    let barrierMesh4 = new T.Mesh(barrierLongGeom,barrierMaterial);
    barrierMesh4.position.set(0,1.5,-15);

    perimGroup.add(barrierMesh4);

    super("constructionPerimeter",perimGroup);
  }
}

// I GOT THIS FROM MY WB8 WHICH WAS DERIVED FROM WB7
export class trashTruck extends GrObject {

    constructor() {
    let bothTrashTrucks = new T.Group();
      let trashtruck = new T.Group();
      let wheel_group = new T.Group();                  
  
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
      let binSettings = {
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
      trashtruck.add(wheel_group);
      wheelMesh2.position.y = 1.5;
      wheelMesh3.position.z = -3.5
      wheelMesh4.position.z = -3.5;
      wheelMesh4.position.y = 1.5;
      let bodyGroup = new T.Group();
      let binGroup = new T.Group();
      trashtruck.add(bodyGroup);
      trashtruck.add(binGroup);
      let truckBodyCurve = new T.Shape();
      let truckBodyMaterial = new T.MeshStandardMaterial({
        color: 'white',
        metalness: 0.5,
        roughness: 0.7
      });
  
      let truckBinMaterial = new T.MeshStandardMaterial({
        color: "green",
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
  
      let binCurve = new T.Shape();
  
      binCurve.moveTo(-1.75,1.0);
      binCurve.lineTo(-1.5, 2.5);
      binCurve.lineTo(0.05, 2.5);
      binCurve.lineTo(0.25, 1.0);
      binCurve.lineTo(-1.75, 1.0);
  
  
      let bin_geom = new T.ExtrudeGeometry(binCurve, binSettings);
      let bin = new T.Mesh(bin_geom, truckBinMaterial);
      bin.position.z = -2.5;
      binGroup.add(bin);
  
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

      trashtruck.rotateY(Math.PI);
      trashtruck.position.set(-17.5,0.1,-35);
      trashtruck.scale.set(1.2, 1.2, 1.2);
      bothTrashTrucks.add(trashtruck);

      let trashTruck2 = trashtruck.clone();

      let blueBinMaterial = new T.MeshStandardMaterial({
          color: "blue",
          metalness: 0.5,
          roughness: 0.7
      });
      
      trashTruck2.children[2].children[0].material = blueBinMaterial;
      
      trashTruck2.position.set(12,0.1,20);
      trashTruck2.rotateY(Math.PI);
      bothTrashTrucks.add(trashTruck2);
      super("trashTruck", bothTrashTrucks);
    }
  }
// I GOT THIS FROM MY WB8 WHICH WAS DERIVED FROM WB7
  export class craneMachine extends GrObject {
    /**
     * @param {CraneProperties} params
     */
    constructor(params = {}) {
      let cranemachineGroup = new T.Group();
  
      let exSettings = {
        steps: 3,
        depth: 0.4,
        bevelEnabled: false
      };
      let ballSettings = {
        steps: 3,
        depth: 0.1,
        bevelEnabled: false
      };
      let baseofwreckingballmachine_curve = new T.Shape();
      baseofwreckingballmachine_curve.moveTo(-0.25, 0);
      baseofwreckingballmachine_curve.lineTo(-0.25, 2);
      baseofwreckingballmachine_curve.lineTo(-0.2, 2.25);
      baseofwreckingballmachine_curve.lineTo(-0.25, 5);
      baseofwreckingballmachine_curve.lineTo(-0.2, 5);
      baseofwreckingballmachine_curve.lineTo(-0.2, 5.1);
      baseofwreckingballmachine_curve.lineTo(0.2, 5.1);
      baseofwreckingballmachine_curve.lineTo(0.2, 5);
      baseofwreckingballmachine_curve.lineTo(0.25, 5);
      baseofwreckingballmachine_curve.lineTo(0.2, 2.25);
      baseofwreckingballmachine_curve.lineTo(0.25, 2);
      baseofwreckingballmachine_curve.lineTo(0.25, 0);
      baseofwreckingballmachine_curve.lineTo(-0.25, 0);
      let baseofwreckingballmachine_geom = new T.ExtrudeGeometry(baseofwreckingballmachine_curve, exSettings);
      let rustytexture = textureLoader.load("../examples/assets/rust.png");

      rustytexture.repeat.set(4, 4);
      rustytexture.wrapS = T.RepeatWrapping; 
      rustytexture.wrapT = T.RepeatWrapping; 
      let wreckingball_mat = new T.MeshStandardMaterial({
        color: "red",
        metalness: 0.9,
        roughness: 0.7,
        bumpMap: rustytexture, bumpScale: 3
      });
      let base = new T.Mesh(baseofwreckingballmachine_geom, wreckingball_mat);
      cranemachineGroup.add(base);
      base.translateZ(-0.25);
  
      let arm_group = new T.Group();
      cranemachineGroup.add(arm_group);
      arm_group.translateY(4.5);
      let arm_curve = new T.Shape();
      arm_curve.moveTo(-1.5, 0);
      arm_curve.lineTo(-1.5, 0.25);
      arm_curve.lineTo(-0.5, 0.4);
      arm_curve.lineTo(4, 0.1);
      arm_curve.lineTo(4, 0);
      arm_curve.lineTo(-1.5, 0);
      let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
      let arm = new T.Mesh(arm_geom, wreckingball_mat);
      arm_group.add(arm);
      arm.translateZ(-0.25);
  
      let suspenderGroup = new T.Group();
      arm_group.add(suspenderGroup);
      suspenderGroup.translateX(3);
      let suspender_curve = new T.Shape();
      suspender_curve.moveTo(-0.25, 0);
      suspender_curve.lineTo(-0.25, -0.25);
      suspender_curve.lineTo(-0.05, -0.3);
      suspender_curve.lineTo(-0.05, -2.5);
      suspender_curve.lineTo(0.05, -2.5);
      suspender_curve.lineTo(0.05, -0.3);
      suspender_curve.lineTo(0.25, -0.25);
      suspender_curve.lineTo(0.25, 0);
      suspender_curve.lineTo(-0.25, 0);
      let suspender_geom = new T.ExtrudeGeometry(suspender_curve, ballSettings);
      let suspender_material = new T.MeshStandardMaterial({
        color: "grey",
        metalness: 0.8,
        roughness: 0.3,
        bumpMap: rustytexture, bumpScale: 3
      });
      let suspender = new T.Mesh(suspender_geom, suspender_material);
      suspenderGroup.add(suspender);
      suspender.translateZ(-0.25);
  
      let wb_geom = new T.TorusGeometry(0.6,0.2);
      let wb_material = new T.MeshStandardMaterial({
        color: "grey",
        metalness: 0.5,
        roughness: 0.5,
        bumpMap: rustytexture, bumpScale: 5
      });
      let wb = new T.Mesh(wb_geom, wb_material);
      wb.scale.set(1,0.75,1);
      wb.position.z = 0.05;
      suspenderGroup.add(wb);
      wb.translateZ(-0.25);
      wb.translateY(-3);
      cranemachineGroup.scale.set(4,5,4);
      cranemachineGroup.position.set(-35,0,-15)
      super("craneMachine",cranemachineGroup);
    }}


    let VSLight = `
    varying vec3 v_Normal;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      v_Normal = normal;
    }`;
    let FSLight = `
    void main() {
      vec3 tempColor = vec3(2.0,2.0,0.0);
      gl_FragColor = vec4(tempColor,1);
    }
    `;
    export class constructionLights extends GrObject{
         constructor(params = {}) {
        let lights = new T.Group();
        
        let lightPoleGeom = new T.BoxGeometry(0.2,6,0.2);
        let lightArmGeom = new T.BoxGeometry(0.2,0.2,3);
        let lightBrightGeom = new T.BoxGeometry(0.3,0.2,0.8);
        let lightPoleMat = new T.MeshStandardMaterial({color: "grey", metalness: 0.8, roughness: 0.5});
        let lightBrightMat = new T.ShaderMaterial({
            vertexShader: VSLight,
            fragmentShader: FSLight
          });

        let light1 = new T.Group()
        let light1Mesh = new T.Mesh(lightPoleGeom,lightPoleMat);
        let light1ArmMesh = new T.Mesh(lightArmGeom,lightPoleMat);
        let light1BrightMesh = new T.Mesh(lightBrightGeom,lightBrightMat);
        light1ArmMesh.position.set(0,3,-1);
        light1BrightMesh.position.set(0.0,2.8,-2);
        
        light1.add(light1BrightMesh);
        light1.add(light1Mesh);
        light1.add(light1ArmMesh);
        lights.add(light1);

        lights.position.y = 3;
        lights.position.x = -25;
        lights.position.z = -11;

        let light2 = light1.clone();
        light2.position.set(8,0,0)
        lights.add(light2);

        let light3 = light1.clone();
        light3.position.set(14,0,-10);
        light3.rotateY(Math.PI/2);
        lights.add(light3);
      
        super("constructionLights",lights);
        this.light1BrightMesh = light1BrightMesh;
        this.lightBrightMat = lightBrightMat;
    }

    }
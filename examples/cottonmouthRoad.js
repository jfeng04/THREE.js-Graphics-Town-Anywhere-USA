/*jshint esversion: 6 */
// @ts-nocheck

/*
 * road networks
 *
 * highway 
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { constructionPerimeter , craneMachine, trashTruck, constructionLights} from "./constructionSite.js";

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


let VSLightMoving = `
varying vec3 v_Normal;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_Normal = normal;
}`;
let FSLightMoving = `
uniform float speed;
uniform float time; 
void main() {
  gl_FragColor = vec4(clamp(abs(sin(speed*time/400.0)),0.3,2.0),0,0,1);
}
`;
/**
 * This is the nearby road system (I-75 and neighborhood roads)
 */
let textureLoader = new T.TextureLoader();

export class highwaySystemRoads extends GrObject {
  constructor(params = {}) {
    let highwaySystem = new T.Group();
    let highwayGeom = new T.BoxGeometry(79.9,0.2,5);
    let highwaytexture = textureLoader.load("../examples/assets/roadtexture.png");
    highwaytexture.repeat.set(5, 1);
    highwaytexture.wrapS = T.RepeatWrapping; 
    highwaytexture.wrapT = T.RepeatWrapping; 
    let highwayMat = new T.MeshStandardMaterial({map: highwaytexture});
    
    let highwayRightLane = new T.Mesh(highwayGeom,highwayMat);
    let highwayLeftLane = highwayRightLane.clone();
    highwayLeftLane.position.set(0,0,8);
    highwaySystem.add(highwayRightLane);
    highwaySystem.add(highwayLeftLane);

    let highwayMedianGeom = new T.BoxGeometry(79.9,1.2,1);
    let highwayMedianMat = new T.MeshStandardMaterial({color: "grey", metalness: 0.9});
    let highwayMedianMesh = new T.Mesh(highwayMedianGeom,highwayMedianMat);
    highwayMedianMesh.position.set(0,0.6,4);
    highwaySystem.add(highwayMedianMesh);

    let lights = new T.Group();
        
    let lightPoleGeom = new T.BoxGeometry(0.2,6,0.2);
    let lightArmGeom = new T.BoxGeometry(0.2,0.2,4);
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
    light1ArmMesh.position.set(0,3,0);
    light1BrightMesh.position.set(0.0,2.8,-1.5);

    let light2BrightMesh = light1BrightMesh.clone();
    light2BrightMesh.position.z = 1.5;
    
    light1.add(light1BrightMesh);
    light1.add(light2BrightMesh);

    light1.add(light1Mesh);
    light1.add(light1ArmMesh);
    lights.add(light1);

    lights.position.y = 3;
    lights.position.x = -35;
    lights.position.z = 4;

    for(let i = 0; i<80; i+=10){
        let light2 = light1.clone();
        light2.position.set(i,0,0)
        lights.add(light2);
    }
    highwaySystem.add(lights);

    highwaySystem.position.set(0,0,-7);
    super("highwaySystemRoads",highwaySystem);
    this.light1BrightMesh = light1BrightMesh;
    this.lightBrightMat = lightBrightMat;
  }
}

export class neighborhoodRoads extends GrObject {
    constructor(params = {}) {
      let roadSystem = new T.Group();
      let roadGeom = new T.BoxGeometry(5,0.2,36.5);
      let roadMat = new T.MeshStandardMaterial({color: "grey"});
      
      let road1Group = new T.Group();
      let roadLane1 = new T.Mesh(roadGeom,roadMat);
      road1Group.add(roadLane1);



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
      light1.rotateY(Math.PI/2);
      light1.position.set(-6,0,-10);
      lights.add(light1);

      for(let i = 0; i<30; i+=10){
        let light2 = light1.clone();
        light2.position.set(-6,0,i);
        lights.add(light2);
        }

        for(let i = -10; i<30; i+=10){
            let light3 = light1.clone();
            light3.position.set(6,0,i);
            light3.rotateY(Math.PI);
            lights.add(light3);
        }
      lights.position.y = 3;

      roadSystem.add(lights);


      let road2Group = road1Group.clone();
      roadLane1.position.set(-10,0,3.5);
      road2Group.position.set(10,0,3.5);
      roadSystem.add(road1Group);
      roadSystem.add(road2Group);
  

  
      roadSystem.position.set(0,0,18);
      super("neighborhoodRoads",roadSystem);
        this.light1BrightMesh = light1BrightMesh;
        this.lightBrightMat = lightBrightMat;
    }
  }

  export class emptyLot extends GrObject {
    constructor(params = {}) {
    
    let lotGroup = new T.Group();
      let lotGeometry = new T.BoxGeometry(30,0.1,30);
      let lotTexture = textureLoader.load("../examples/assets/parkinglot.png");
      lotTexture.repeat.set(2, 1);
      lotTexture.wrapS = T.RepeatWrapping; 
      lotTexture.wrapT = T.RepeatWrapping; 

      let lotMat = new T.MeshStandardMaterial({map: lotTexture});
      let lotMesh = new T.Mesh(lotGeometry,lotMat);
      lotMesh.scale.set(1.5,1,0.6);
      lotGroup.add(lotMesh);


     // add pole
     let lightGroup = new T.Group();
     let poleGeom = new T.CylinderGeometry(0.2,0.2,5);
     let poleMat = new T.MeshStandardMaterial({color: "black"});
     let poleMesh = new T.Mesh(poleGeom, poleMat);
     poleMesh.position.y = 1;
     lightGroup.add(poleMesh);

     
 
     // add light
     let rLightGeom = new T.CylinderGeometry(0.25,0.25,0.5);
     let rLightMat = new T.ShaderMaterial({
       uniforms: {
         time: { value: 0 },
         speed: {value: 1.0},
         emissive: {value: new T.Color(0xff0000)}
       },
       vertexShader: VSLightMoving,
       fragmentShader: FSLightMoving
     });
 
     let rLightMesh = new T.Mesh(rLightGeom,rLightMat);
     rLightMesh.position.y = 1;
     lightGroup.add(rLightMesh);


     lightGroup.position.set(24,1.5,0);

     let lightGroup2 = lightGroup.clone();
     lightGroup2.position.set(-24,1.5,0);

     for(let i = -25; i < 25; i += 5){
        let moreLights = lightGroup.clone();
        moreLights.position.set(i + 3.5,5.0,0);
        moreLights.rotateZ(Math.PI/2);
        lotGroup.add(moreLights);
     }
     document.onload = function worldControls(){
       let speed = document.getElementById("speed-slider");
       speed.onchange = function() { rLightMat.uniforms.speed.value = speed.value();}
     }

     lotGroup.add(lightGroup);
     lotGroup.add(lightGroup2);

    
      lotGroup.position.set(15,0,-15);
      super("emptyLot",lotGroup);
      this.rLightMat = rLightMat;
    }
    stepWorld(delta,timeOfDay){
        this.rLightMat.uniforms.time.value += delta;
        this.rLightMat.uniforms.emissive.value[0] *= Math.abs(Math.sin(delta));
      }
  }



  export class billBoard extends GrObject {
    constructor(params = {}) {
    
    let boardGroup = new T.Group();

    let supporterGeom = new T.CylinderGeometry(0.5,0.5,15);
    let supporterMat = new T.MeshStandardMaterial({color: "black"});
    let supporterMesh = new T.Mesh(supporterGeom,supporterMat);
    supporterMesh.position.y = 2.5;
    supporterMesh.position.z = -0.4;
    boardGroup.add(supporterMesh);

    let ad1Geom = new T.PlaneGeometry(10,5);
    let ad1Mat = new T.MeshStandardMaterial({map: textureLoader.load("../examples/assets/billBoardAd.png")});
    let ad1Mesh = new T.Mesh(ad1Geom,ad1Mat);
    ad1Mesh.rotateY(Math.PI/2);
    ad1Mesh.position.set(0.5,7,-6);
    boardGroup.add(ad1Mesh)


    let ad2Geom = new T.PlaneGeometry(10,5);
    let ad2Mat = new T.MeshStandardMaterial({map: textureLoader.load("../examples/assets/billBoardAd2.png")});
    let ad2Mesh = new T.Mesh(ad2Geom,ad2Mat);
    ad2Mesh.rotateY(-Math.PI/2);
    ad2Mesh.position.set(-0.5,7,-6);
    boardGroup.add(ad2Mesh)

    let adSupporterGeom = new T.BoxGeometry(10,5,0.9);
    let adSupporterMesh = new T.Mesh(adSupporterGeom,supporterMat);
    adSupporterMesh.rotateY(Math.PI/2);

    adSupporterMesh.position.set(0,7,-6);
    boardGroup.add(adSupporterMesh);

    let gratyGeom = new T.PlaneGeometry(2,11);
    let gratyMat = new T.MeshStandardMaterial({map: textureLoader.load("../examples/assets/grate.png"), transparent: true,opacity: 0.5, side: T.DoubleSide} );
    let grateMesh = new T.Mesh(gratyGeom,gratyMat);
    grateMesh.position.set(0,4.4,-6)
    grateMesh.rotateX(Math.PI/2);
    boardGroup.add(grateMesh);

    let grateMeshDupe = grateMesh.clone();
    grateMeshDupe.position.y = 9.6;
    boardGroup.add(grateMeshDupe)

    boardGroup.position.set(-37.5,3.5,5)

    boardGroup.scale.set(0.7,0.7,0.7);
    
    super("billBoard",boardGroup);
    }
  }

  


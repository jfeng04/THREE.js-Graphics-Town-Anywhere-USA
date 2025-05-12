/*jshint esversion: 6 */
// @ts-nocheck

/*
 * A file for one-time units
 *
 * FOR THE HELICOPTER AND RUNNING DUDE 
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { constructionPerimeter , craneMachine, trashTruck, constructionLights} from "./constructionSite.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

let VSLightGreen = `
varying vec3 v_Normal;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_Normal = normal;
}`;
let FSLightGreen = `
uniform float speed;
uniform float time; 
void main() {
    gl_FragColor = vec4(0,clamp(abs(cos(speed*time/200.0)),0.2,1.0),0,1);
}
`;

let angle = 0;
let angleEscapee = 0;

/**
 * This is the heli
 */
let textureLoader = new T.TextureLoader();
let glftLoader = new GLTFLoader();

export class helicopterFlying extends GrObject {
  constructor(params = {}) {
    let fullGroup = new T.Group();

    let projectEscapee = new T.Group();
    glftLoader.load("../examples/assets/backrooms/scene.gltf", function(gltf) {

        let model = gltf.scene; 
        
       
        model.scale.set(25, 25, 25); 
        projectEscapee.add(model);
      }, undefined, function(error) {
        console.error('An error happened', error);
      });

      glftLoader.load("../examples/assets/low-poly_qbs-09/scene.gltf", function(gltf) {

        let model = gltf.scene; 
        
       
        model.scale.set(.0015, .0015, .0015); 
        model.position.set(-0.75,-0.35,0);
        model.rotateY(-Math.PI/2);
        projectEscapee.add(model);
      }, undefined, function(error) {
        console.error('An error happened', error);
      });

      projectEscapee.position.set(10,1,30);

      fullGroup.add(projectEscapee);



    let helicopterGroup = new T.Group();
    let heliGroup = new T.CylinderGeometry(0.75, 0.75, 1);
    let heliMat = new T.MeshStandardMaterial({ color: "#00008B",metalness:0.8});
    // @ts-ignore
    let heliBodyMesh = new T.Mesh(heliGroup, heliMat);
    heliBodyMesh.scale.set(1,1,2);
    helicopterGroup.add(heliBodyMesh);

    let heliCopterBottomGeom = new T.BoxGeometry(0.2,0.2,3.5);
    let helicopterBottom1 = new T.Mesh(heliCopterBottomGeom, new T.MeshStandardMaterial({color:"black"}));
    let helicopterBottom2 = helicopterBottom1.clone();

    helicopterBottom1.position.set(0.8,1.7,0);
    helicopterBottom2.position.set(0.8,2.3,0);


    helicopterGroup.add(helicopterBottom1);
    helicopterGroup.add(helicopterBottom2);

    let helicopterBackGeom = new T.BoxGeometry(0.4,0.4,3);
    let helicopterBackMesh = new T.Mesh(helicopterBackGeom,heliMat);
    helicopterBackMesh.position.set(-0.5,2,-2);
    helicopterBackMesh.rotateY(0.05);
    helicopterGroup.add(helicopterBackMesh);

    let mainRotorGroup = new T.Group();
    let helicopterRotorMainGeom = new T.BoxGeometry(0.2,0.2,5);
    let helicopterRotorMainMesh = new T.Mesh(helicopterRotorMainGeom,new T.MeshStandardMaterial({color:"black"}));

    let helicopterMainRotor2 = helicopterRotorMainMesh.clone();
    helicopterMainRotor2.rotateX(Math.PI/2);

        
    mainRotorGroup.add(helicopterRotorMainMesh);
    mainRotorGroup.add(helicopterMainRotor2)
    helicopterGroup.add(mainRotorGroup);
    mainRotorGroup.position.set(-1,2,0);

    let secondaryRotorGroup = mainRotorGroup.clone();
    secondaryRotorGroup.scale.set(0.25,0.25,0.25);
    helicopterGroup.add(secondaryRotorGroup);
    secondaryRotorGroup.position.set(-0.5,2.25,-3);
    secondaryRotorGroup.rotateZ(Math.PI/2);

    let backlightGeom = new T.BoxGeometry(0.2,0.2,0.2);
    let backlightmat =  new T.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          speed: {value: 1.0},
          opacityminus: {value: 0.0}
        },
        vertexShader: VSLightGreen,
        fragmentShader: FSLightGreen
      });

    let backLightMesh = new T.Mesh(backlightGeom,backlightmat);
    backLightMesh.position.set(-1,2,-3.5);
    helicopterGroup.add(backLightMesh);


    let searchlight = new T.SpotLight( 0xffffff,5000,);
    searchlight.position.set(0,0,5);
    searchlight.rotation.y = -Math.PI/2;
      searchlight.angle = Math.PI/20;
      searchlight.target = projectEscapee;


      helicopterGroup.add(searchlight);


    // @ts-ignore
    heliBodyMesh.position.y = 2;
 
    helicopterGroup.scale.set(2,2,2);

    helicopterGroup.position.y = 25;
    helicopterGroup.position.x = -40;
    helicopterGroup.position.z = 40;
    helicopterGroup.rotateZ(-Math.PI/2);

    fullGroup.add(helicopterGroup);

    super("helicopterFlying",fullGroup);
    this.rideable = heliBodyMesh;
    this.backlightmat = backlightmat;
    this.helicopterGroup = helicopterGroup;
    this.mainRotorGroup = mainRotorGroup;
    this.secondaryRotorGroup  = secondaryRotorGroup;
    this.angle = angle;
    this.projectEscapee = projectEscapee;
    this.angleEscapee = angleEscapee;
  }

  stepWorld(delta,timeOfDay){
    let radius = 20; 
    let speed = .0005; 

    this.angle += delta*speed;
    this.helicopterGroup.position.x = Math.cos(this.angle) * radius;
    this.helicopterGroup.position.z = 30 + Math.sin(this.angle) * radius;
    this.helicopterGroup.rotation.y = -this.angle;
    this.helicopterGroup.rotation.x = 0.3;

    this.mainRotorGroup.rotation.x += 3*delta;
    this.secondaryRotorGroup.rotation.y += 2*delta;

    this.projectEscapee.position.x = Math.cos(this.angleEscapee) * radius*0.3 * 1.5;
    this.projectEscapee.position.z = Math.sin(this.angleEscapee) * radius*0.3 + 20;
    this.projectEscapee.rotation.y = -this.angleEscapee + Math.PI;
    this.angleEscapee -= delta*speed;
    


    this.backlightmat.uniforms.time.value += delta;

  
}}
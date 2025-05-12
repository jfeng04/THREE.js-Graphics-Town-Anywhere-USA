/*jshint esversion: 6 */
// @ts-nocheck

/*
 * G-town Building
 *
 * construction site building
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../../WB10-jfeng233/libs/CS559-Framework/shaderHelper.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

/**
 * This is the Building located in the construction site
 */
let textureLoader = new T.TextureLoader();
let glftLoader = new GLTFLoader();


export class skyScraperFrame extends GrObject {
  constructor(params = {}) {
    // draw the floors of the skyscraper
    let original_Y = 0.25;
    let boxGeom = new T.BoxGeometry(15,0.5,15);
    let floorTexture = textureLoader.load("../examples/assets/concreteTex.png");
    floorTexture.repeat.set(5, 5);
    floorTexture.wrapS = T.RepeatWrapping; 
    floorTexture.wrapT = T.RepeatWrapping; 
    let boxMat = new T.MeshStandardMaterial({map: floorTexture});

    let buildingGroup = new T.Group();
    for (let i = 0; i < 10; i++) {
      let floor = new T.Mesh(boxGeom, boxMat);
      floor.position.x = -30;
      floor.position.z = -30;
      floor.position.y = original_Y + i * 2;
      buildingGroup.add(floor);
  }
  // draw pillar
    let pillarGeom = new T.BoxGeometry(3,20,0.5);
    let pillarMat = new T.MeshStandardMaterial({map: floorTexture});
    let pillar1 = new T.Mesh(pillarGeom,pillarMat);
    pillar1.position.x = -30;
    pillar1.position.z = -28;
    pillar1.position.y = 10;
    buildingGroup.add(pillar1);

    let pillar2 = new T.Mesh(pillarGeom,pillarMat);
    pillar2.position.x = -30;
    pillar2.position.z = -32;
    pillar2.position.y = 10;
    buildingGroup.add(pillar2);

    let pillarOtherGeom = new T.BoxGeometry(0.5,20,3);
    let pillar3 = new T.Mesh(pillarOtherGeom,pillarMat);
    pillar3.position.x = -32;
    pillar3.position.z = -30;
    pillar3.position.y = 10;
    buildingGroup.add(pillar3);

    let pillar4 = new T.Mesh(pillarOtherGeom,pillarMat);
    pillar4.position.x = -28;
    pillar4.position.z = -30;
    pillar4.position.y = 10;
    buildingGroup.add(pillar4);

    // draw roof

    let roofGeom = new T.BoxGeometry(4.5,0.5,4.5);
    let roofMat = new T.MeshStandardMaterial({map: floorTexture});
    let roofMesh = new T.Mesh(roofGeom,roofMat);
    roofMesh.position.x = -30;
    roofMesh.position.z = -30;
    roofMesh.position.y = 20;


    buildingGroup.add(roofMesh);



    super("skyScraperFrame",buildingGroup);
  }
}

export class skyScraperCloth extends GrObject {
  constructor(params = {}) {
    // add cloths
    let clothGroup = new T.Group();
    let clothTexture = textureLoader.load("../examples/assets/constructionCloth.png");

    let clothGeom = new T.PlaneGeometry(13,18);
    clothTexture.repeat.set(2, 4);
    clothTexture.wrapS = T.RepeatWrapping; 
    clothTexture.wrapT = T.RepeatWrapping; 
    let clothMat = new T.MeshStandardMaterial({map: clothTexture, side: T.DoubleSide,transparent: true,opacity: 0.9});
    let clothMesh1 = new T.Mesh(clothGeom,clothMat);
    clothMesh1.position.x = -30;
    clothMesh1.position.z = -22;
    clothGroup.add(clothMesh1);

    let clothMesh2 = new T.Mesh(clothGeom,clothMat);
    clothMesh2.position.x = -30;
    clothMesh2.position.z = -38;
    clothGroup.add(clothMesh2);


    let clothMesh3 = new T.Mesh(clothGeom,clothMat);
    clothMesh3.position.x = -38;
    clothMesh3.position.z = -30;
    clothMesh3.rotateY(Math.PI/2);
    clothGroup.add(clothMesh3);

    let clothMesh4 = new T.Mesh(clothGeom,clothMat);
    clothMesh4.position.x = -22;
    clothMesh4.position.z = -30;
    clothMesh4.rotateY(Math.PI/2);
    clothGroup.add(clothMesh4);

    clothGroup.position.y = 9.5;
    // add ad
    let boardGeom = new T.PlaneGeometry(10,10);
    let boardTex = textureLoader.load("../examples/assets/constructionAd.png");
    let boardMat = new T.MeshStandardMaterial({map: boardTex});
    let boardMesh = new T.Mesh(boardGeom,boardMat);
    boardMesh.position.x = -30;
    boardMesh.position.z = -21.5;
    clothGroup.add(boardMesh);

    // add ad
    let guideGeom = new T.PlaneGeometry(11,6);
    let guideTex = textureLoader.load("../examples/assets/billboard.png");
    let guideMat = new T.MeshStandardMaterial({map: guideTex});
    let guideMesh = new T.Mesh(guideGeom,guideMat);
    guideMesh.position.x = -21.5;
    guideMesh.position.z = -30;
    guideMesh.rotateY(Math.PI/2);
    
    clothGroup.add(guideMesh);

    super("skyScraperCloth",clothGroup);
  }
}


let VSLight = `
varying vec3 v_Normal;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_Normal = normal;
}`;
let FSLight = `
uniform float speed;
uniform float time; 
uniform vec3 emissive;
void main() {
  gl_FragColor = vec4(clamp(abs(sin(speed*time/400.0)),0.3,2.0),0,0,1);
}
`;

export class skyScraperLight extends GrObject {
  constructor(params = {}) {
    // add pole
    let lightGroup = new T.Group();
    let poleGeom = new T.CylinderGeometry(0.2,0.2,3);
    let poleMat = new T.MeshStandardMaterial({color: "black"});
    let poleMesh = new T.Mesh(poleGeom, poleMat);
    lightGroup.add(poleMesh);

    // add light
    let rLightGeom = new T.SphereGeometry(0.4);
    let rLightMat = new T.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speed: {value: 1.0},
        emissive: {value: new T.Color(0xff0000)}
      },
      vertexShader: VSLight,
      fragmentShader: FSLight
    });

    let rLightMesh = new T.Mesh(rLightGeom,rLightMat);
    rLightMesh.position.y = 1.3;
    lightGroup.add(rLightMesh);

    lightGroup.position.x = -29;
    lightGroup.position.z = -30;
    lightGroup.position.y = 21.5;

    let rLightGlassGeom = new T.SphereGeometry(0.7);
    let rLightGlassMat = new T.MeshStandardMaterial({transparent: true,opacity: 0.3,color: "red"});
    let rLightGlassMesh = new T.Mesh(rLightGlassGeom,rLightGlassMat);
    rLightGlassMesh.position.y = 1.3;
    lightGroup.add(rLightGlassMesh);


    document.onload = function worldControls(){
      let speed = document.getElementById("speed-slider");
      speed.onchange = function() { rLightMat.uniforms.speed.value = speed.value();}
    }


    
    super("skyScraperLight",lightGroup);
    this.rLightMesh = rLightMesh;
    this.rLightMat = rLightMat;
  }

  stepWorld(delta,timeOfDay){
    this.rLightMat.uniforms.time.value += delta;
    this.rLightMat.uniforms.emissive.value[0] *= Math.abs(Math.sin(delta));
  }
}
// the Cottonmouth City Police Department are searching for ONE prison escapee! He is a slippery b*stard, he's posted up on top of the skyscraper hiding from cops!
export class skyScraperSniperSet extends GrObject {
  constructor(params = {}) {

    let sniperSet = new T.Group();
    glftLoader.load("../examples/assets/qbu191/scene.gltf", function(gltf) {

      let qbz191 = gltf.scene; 
      
     
      qbz191.scale.set(0.1, 0.1, 0.1); 
      qbz191.rotation.set(Math.PI/2,Math.PI/2,0); 
      sniperSet.add(qbz191);
    }, undefined, function(error) {
      console.error('An error happened', error);
    });

    let ammoBoxGeom = new T.BoxGeometry(0.2,0.1,0.1);
    let ammoCube3 = [
      new T.MeshStandardMaterial({
        map: textureLoader.load("../examples/assets/191danyaoxiangce.png"),
      }),
      new T.MeshStandardMaterial({
        map: textureLoader.load("../examples/assets/191danyaoxiangce.png"),
      }),
      new T.MeshStandardMaterial({
        map: textureLoader.load("../examples/assets/191danyaoxiangce.png"),
      }),
      new T.MeshStandardMaterial({
        map: textureLoader.load("../examples/assets/191danyaoxiangce.png"),
      }),
      new T.MeshStandardMaterial({
        map: textureLoader.load("../examples/assets/191danyaoxiangzheng.png"),
      }),
      new T.MeshStandardMaterial({
        map: textureLoader.load("../examples/assets/191danyaoxiangzheng.png"),
      }),
    ];
    let ammoBoxMesh = new T.Mesh(ammoBoxGeom,ammoCube3);
    ammoBoxMesh.position.set(0.5,0,-0.3);
    sniperSet.add(ammoBoxMesh);

    let ammosecond = ammoBoxMesh.clone();
    ammosecond.position.set(0.5,0,-0.5);
    sniperSet.add(ammosecond);

    let ammothird = ammoBoxMesh.clone();
    ammothird.position.set(0.7,0.05,-0.4);
    ammothird.rotateZ(Math.PI/2);
    sniperSet.add(ammothird);

            // make the picture
        let entirePicture = new T.Group();
        let pictureNFrame = new T.Group();
        let soldierImage = textureLoader.load("../examples/assets/soldier.png");
        let picGeom = new T.BoxGeometry(3,2,0.01);
        let picMat = new T.MeshStandardMaterial({color:"white", map: soldierImage});
        let picMesh = new T.Mesh(picGeom,picMat);
        pictureNFrame.add(picMesh);
        // make the frame
        let frameImage = textureLoader.load("../examples/assets/frameMaterial.png");
        let frameGeom = new T.BoxGeometry(.25,2,0.25);
        let frameMat = new T.MeshStandardMaterial({color:"white", map: frameImage});

        let frameMesh1 = new T.Mesh(frameGeom,frameMat);
        frameMesh1.translateX(1.5);
        pictureNFrame.add(frameMesh1);
        let frameMesh2 = new T.Mesh(frameGeom,frameMat);
        frameMesh2.translateX(-1.5);
        pictureNFrame.add(frameMesh2);

        let frameMesh3Geom = new T.BoxGeometry(3.25,0.25,0.2501);
        let frameMesh3 = new T.Mesh(frameMesh3Geom,frameMat);
        frameMesh3.translateY(-1.1);
        pictureNFrame.add(frameMesh3);
        let frameMesh4 = new T.Mesh(frameMesh3Geom,frameMat);
        frameMesh4.translateY(1.1);
        pictureNFrame.add(frameMesh4);
        
        let frameMesh5Geom = new T.BoxGeometry(3.24,2.25,0.02);
        let framemesh5 = new T.Mesh(frameMesh5Geom,frameMat);
        framemesh5.translateZ(0.12);
        pictureNFrame.add(framemesh5);
        // make the stand
        let frameMesh6Geom = new T.BoxGeometry(1,1.5,0.1);
        let framemesh6 = new T.Mesh(frameMesh6Geom,frameMat);
        framemesh6.translateZ(0.65);
        framemesh6.translateY(-0.3);
        framemesh6.rotateX(-Math.PI/4);
        pictureNFrame.add(framemesh6);
        // add everything
        entirePicture.add(pictureNFrame)

        entirePicture.translateY(1.2);
        entirePicture.rotateX(Math.PI/8.5);

        entirePicture.scale.set(0.1,0.1,0.1);
        entirePicture.position.y -= 1.14;
        entirePicture.position.z += 0.5;



  sniperSet.add(entirePicture);

    sniperSet.position.set(-24, 18.55, -24);
    super("skyScraperSniperSet",sniperSet);
  }
}






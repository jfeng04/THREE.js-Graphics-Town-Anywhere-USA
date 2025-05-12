/*jshint esversion: 6 */
// @ts-nocheck

/*
 * A file for one-time units
 *
 * for the storage space units 
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { constructionPerimeter , craneMachine, trashTruck, constructionLights} from "./constructionSite.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

/**
 * This is the main building
 */
let textureLoader = new T.TextureLoader();

let roofTexture = textureLoader.load("../examples/assets/rust.png");
let brickWallTexture1 = textureLoader.load("../examples/assets/bricks.png");
let brickWallTextureMain = textureLoader.load("../examples/assets/bricks.png");
let storageDoorTexture = textureLoader.load("../examples/assets/storageDoor.png");
let storageCompanyTexture = textureLoader.load("../examples/assets/storageCompsign.png");

roofTexture.repeat.set(5, 3);
roofTexture.wrapS = T.RepeatWrapping; 
roofTexture.wrapT = T.RepeatWrapping; 

brickWallTexture1.repeat.set(5, 3);
brickWallTexture1.wrapS = T.RepeatWrapping; 
brickWallTexture1.wrapT = T.RepeatWrapping; 

brickWallTextureMain.repeat.set(10, 3);
brickWallTextureMain.wrapS = T.RepeatWrapping; 
brickWallTextureMain.wrapT = T.RepeatWrapping; 
export class storageUnits extends GrObject {
  constructor(params = {}) {
    let fullGroup = new T.Group();

    let storageUnitGeom = new T.BoxGeometry(40,5,15);
    let storageUnitMat = [new T.MeshStandardMaterial({map:brickWallTexture1}), 
        new T.MeshStandardMaterial({map:brickWallTexture1}),
        new T.MeshStandardMaterial({map:brickWallTexture1}),
        new T.MeshStandardMaterial({map:brickWallTexture1}),
        new T.MeshStandardMaterial({map:brickWallTextureMain}),
        new T.MeshStandardMaterial({map:brickWallTextureMain})];
    let storageUnitMesh = new T.Mesh(storageUnitGeom,storageUnitMat)
    fullGroup.add(storageUnitMesh);


    let storageUnitGravGeom = new T.BoxGeometry(44,0.25,16.1);
    let storageUnitGravMat = new T.MeshStandardMaterial({color:"grey",bumpMap: roofTexture, bumpScale: 3});
    let storageUnitGravMesh = new T.Mesh(storageUnitGravGeom,storageUnitGravMat);
    storageUnitGravMesh.position.set(0,-2.5,0.5)
    fullGroup.add(storageUnitGravMesh);

    let storageUnitRoofGeom = new T.BoxGeometry(40.5,0.25,16.1);
    let storageUnitRoofMat = new T.MeshStandardMaterial({color:"grey", bumpMap: roofTexture, bumpScale: 5});
    let storageUnitRoofMesh = new T.Mesh(storageUnitRoofGeom,storageUnitRoofMat);
    storageUnitRoofMesh.position.set(0,2.5,0.5)
    fullGroup.add(storageUnitRoofMesh);


    let storageGroupDoorGeom = new T.BoxGeometry(3,3,0.1);
    let storageGroupDoorMat = new T.MeshStandardMaterial({map: storageDoorTexture});
    for(let i = -15; i < 25; i += 10){
        let storageGroupMesh = new T.Mesh(storageGroupDoorGeom,storageGroupDoorMat);
        storageGroupMesh.position.set(i, -1, 7.5);
        fullGroup.add(storageGroupMesh);
    } 


    let logoGeometry = new T.PlaneGeometry(5,3);
    let logoMat = new T.MeshStandardMaterial({map:storageCompanyTexture});
    let logoMesh = new T.Mesh(logoGeometry,logoMat);
    logoMesh.position.set(0,4.1,8);
    fullGroup.add(logoMesh);


    let signGeometry = new T.BoxGeometry(5,3,0.95);
    let signMat = new T.MeshStandardMaterial({color: "black"});
    let signMesh = new T.Mesh(signGeometry,signMat);
    signMesh.position.set(0,4.2,7.5);
    fullGroup.add(signMesh);

    fullGroup.position.set(15,2.5,-32.5);
    super("storageUnits",fullGroup);
  }
}
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
  gl_FragColor = vec4(tempColor,0.7);
}
`;

let windowMaterialOn = new T.ShaderMaterial({
    vertexShader: VSLight,
    fragmentShader: FSLight,
  });

/**
 * This is the nearby road system (I-75 and neighborhood roads)
 */
let textureLoader = new T.TextureLoader();


// load the textures

let textureHouse = new T.TextureLoader().load("../examples/assets/lvl94wall.png");
let textureDoor = new T.TextureLoader().load("../examples/assets/doorTexture.png");
let textureWindow = new T.TextureLoader().load("../examples/assets/windowTexture.png");
let textureRoof = new T.TextureLoader().load("../examples/assets/redroof.jpeg");
let textureSeperator = new T.TextureLoader().load("../examples/assets/whiteTexture.png");

export class foliageMedian extends GrObject {
  constructor(params = {}) {
    let foliageTexture = textureLoader.load("../examples/assets/foliage.png");
    let allTrees = new T.Group();
    let treeGroup = new T.Group();
    let pine1Geom = new T.ConeGeometry(0.5,0.75);
    let pine1Mat = new T.MeshStandardMaterial({map: foliageTexture, color: "darkgreen"});
    let pine1Mesh = new T.Mesh(pine1Geom,pine1Mat);
    pine1Mesh.position.set(0,2,0);
    treeGroup.add(pine1Mesh);
    let pine2Geom = new T.ConeGeometry(0.5,0.75);
    let pine2Mat = new T.MeshStandardMaterial({map: foliageTexture, color: "darkgreen"});
    let pine2Mesh = new T.Mesh(pine2Geom,pine2Mat);
    pine2Mesh.position.set(0,1.5,0);
    treeGroup.add(pine2Mesh);

    let trunkGeom = new T.CylinderGeometry(0.12,0.12,2);
    let trunkMat = new T.MeshStandardMaterial({color: "brown"});
    let trunkMesh = new T.Mesh(trunkGeom,trunkMat);
    trunkMesh.position.y = 1;
    treeGroup.add(trunkMesh);
    allTrees.add(treeGroup);

    // second tree
    let treeTwo = treeGroup.clone();
    treeTwo.position.set(2,0,0);
    allTrees.add(treeTwo);

    for(let i = 2; i < 12; i+=2){
        for(let j = 0; j < 4; j +=2){
            let cloneTree = treeGroup.clone();
            cloneTree.position.set(j,0,i);
            allTrees.add(cloneTree);
        }
    }

    for(let i = -1; i < 13; i+=2){
        let cloneTree = treeGroup.clone();
        cloneTree.position.set(1,0,i);
        allTrees.add(cloneTree);
    }

    let houseTree = treeGroup.clone();
    houseTree.position.set(-11,0,0);
    allTrees.add(houseTree);
    let houseTree2 = treeGroup.clone();
    houseTree2.position.set(13,0,5);
    allTrees.add(houseTree2);

    let houseTree3 = treeGroup.clone();
    houseTree3.position.set(-11,0,9);
    allTrees.add(houseTree3);
    
    allTrees.scale.set(2.5,3,2.5);
    allTrees.position.set(-2,0,10);
    super("foliageMedian",allTrees);
  }
}
// GOT FROM WB8
export class createHouse extends GrObject{
    constructor(){
        let houses = new T.Group();
        let houseGroup = new T.Group();
        let geometry = new T.BufferGeometry();
        let vertices = new Float32Array([
            // create front
            -1, 0, 1,
            1, 0, 1,
            -1, 2, 1,
            
            -1,2,1,
            1, 2, 1,
            1,0,1,
            // create back
            -1, 0, -1,
            1, 0, -1,
            -1, 2, -1,
            
            -1,2,-1,
            1, 2, -1,
            1,0,-1,
            // left side
            -1, 0, -1,
            -1, 0, 1,
            -1, 2, -1,
            
            -1,2,-1,
            -1, 2, 1,
            -1,0,1,
            // right side
            1, 0, -1,
            1, 0, 1,
            1, 2, -1,
            
            1,2,-1,
            1, 2, 1,
            1,0,1,

            // top side
            -1, 2, 1,
            -1, 2, -1,
            1, 2, 1,
            
            1,2,1,
            1, 2, -1,
            -1,2,-1,
            // bottom side
            1, 0, 1,
            1, 0, -1,
            -1, 0, 1,
            
            -1,0,1,
            -1, 0, -1,
            1,0,-1,
            //roof side 1 
            -1,2,1,
            0,3,1,
            1,2,1,
            //roof side 2 
            -1,2,-1,
            0,3,-1,
            1,2,-1,

        ]);
        
  
        geometry.setAttribute('position',new T.BufferAttribute(vertices, 3));


            
        const uvs = new Float32Array([
            // frontal sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // rear sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
    
            // left sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // right sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // top sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // bottom sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // roof sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            ]);
                
        
        
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        let houseMaterial = new T.MeshStandardMaterial({color: "white", map: textureHouse, side: T.DoubleSide});
        let houseMesh = new T.Mesh(geometry,houseMaterial);
        houseMesh.position.x = -3;
        houseMesh.position.z = -3;
        houseGroup.add(houseMesh);


        let doorGeometry = new T.BoxGeometry(.01,0.75,0.5);
        let doorMaterial = new T.MeshStandardMaterial({map: textureDoor});
        let doorMesh = new T.Mesh(doorGeometry,doorMaterial);
        doorMesh.position.set(-1.99,.375,-3);
        houseGroup.add(doorMesh);
        
        let windowGeometry = new T.BoxGeometry(.3,0.5,0.01);
        let windowMaterial = new T.MeshStandardMaterial({map: textureWindow,transparent: true,opacity: 0.9 });
        let window1Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window1Mesh.position.set(-2.5,.5,-2);
        let window2Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window2Mesh.position.set(-3,.5,-2);
        let window3Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window3Mesh.position.set(-3.5,.5,-2);
        let window4Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window4Mesh.position.set(-3.5,1.5,-2);
        let window5Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window5Mesh.position.set(-2.5,1.5,-2);

        houseGroup.add(window1Mesh);
        houseGroup.add(window2Mesh);
        houseGroup.add(window3Mesh);
        houseGroup.add(window4Mesh);
        houseGroup.add(window5Mesh);

        let window6Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window6Mesh.position.set(-2.5,.5,-4);
        let window7Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window7Mesh.position.set(-3,.5,-4);
        let window8Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window8Mesh.position.set(-3.5,.5,-4);
        let window9Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window9Mesh.position.set(-3.5,1.5,-4);
        let window10Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window10Mesh.position.set(-2.5,1.5,-4);

        houseGroup.add(window6Mesh);
        houseGroup.add(window7Mesh);
        houseGroup.add(window8Mesh);
        houseGroup.add(window9Mesh);
        houseGroup.add(window10Mesh);

        let roofGeometry = new T.BoxGeometry(1.5,0.1,2.2);
        let roofMaterial = new T.MeshStandardMaterial({map: textureRoof});
        let roofMesh = new T.Mesh(roofGeometry,roofMaterial);
        roofMesh.position.set(-2.5,2.5,-3);
        roofMesh.rotateZ(-Math.PI/4);
        houseGroup.add(roofMesh);

        let roofMesh2 = new T.Mesh(roofGeometry,roofMaterial);
        roofMesh2.position.set(-3.5,2.5,-3);
        roofMesh2.rotateZ(Math.PI/4);
        houseGroup.add(roofMesh2);

        let seperatorGeometry = new T.BoxGeometry(2,0.1,2.1);
        let seperatorMaterial = new T.MeshStandardMaterial({map: textureSeperator});
        let seperatorMesh = new T.Mesh(seperatorGeometry,seperatorMaterial);
        seperatorMesh.position.set(-3,2,-3);
        houseGroup.add(seperatorMesh);

        let walkwayGeom = new T.BoxGeometry(1.5,0.01,1);
        let walkwayMat = new T.MeshStandardMaterial({color:"grey"});
        let walkwayMesh = new T.Mesh(walkwayGeom,walkwayMat);
        walkwayMesh.position.set(-1.5,0,-3);
        houseGroup.add(walkwayMesh);


        houses.add(houseGroup);



        let houseGroup2 = houseGroup.clone();
        houseGroup2.rotateY(Math.PI);

        houseGroup2.position.set(6.5,0,1.5);

        houses.add(houseGroup2);
        
        houses.position.set(-10,0.0001,20);

        let houseGroup3 = houseGroup2.clone();
        houseGroup3.position.set(9.5,0,1);
        houseMesh.add(houseGroup3);

        houses.scale.set(3,3,3);
        super("createHouse", houses);
    }
}

export class createHouseRedux extends GrObject{
    constructor(){
        let houses = new T.Group();
        let houseGroup = new T.Group();
        let geometry = new T.BufferGeometry();
        let geometryRoof = new T.BufferGeometry();
        let vertices = new Float32Array([
            // create front
            -1, 0, 1,
            1, 0, 1,
            -1, 2, 1,
            
            -1,2,1,
            1, 2, 1,
            1,0,1,
            // create back
            -1, 0, -1,
            1, 0, -1,
            -1, 2, -1,
            
            -1,2,-1,
            1, 2, -1,
            1,0,-1,
            // left side
            -1, 0, -1,
            -1, 0, 1,
            -1, 2, -1,
            
            -1,2,-1,
            -1, 2, 1,
            -1,0,1,
            // right side
            1, 0, -1,
            1, 0, 1,
            1, 2, -1,
            
            1,2,-1,
            1, 2, 1,
            1,0,1,

            // top side
            -1, 2, 1,
            -1, 2, -1,
            1, 2, 1,
            
            1,2,1,
            1, 2, -1,
            -1,2,-1,
            // bottom side
            1, 0, 1,
            1, 0, -1,
            -1, 0, 1,
            
            -1,0,1,
            -1, 0, -1,
            1,0,-1,


        ]);
    const roofSectorVertices = new Float32Array([
            //roof side 1 
            -1,2,1,
            0,3,0,
            1,2,1,
            //roof side 2 
            -1,2,-1,
            0,3,0,
            1,2,-1,
            //roof side 3 
            -1,2,1,
            0,3,0,
            -1,2,-1,
            //roof side 4 
            1,2,1,
            0,3,0,
            1,2,-1,
    ]);

        
  
        geometry.setAttribute('position',new T.BufferAttribute(vertices, 3));
        geometryRoof.setAttribute('position',new T.BufferAttribute(roofSectorVertices, 3));

            
        const uvs = new Float32Array([
            // frontal sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // rear sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
    
            // left sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // right sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // top sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // bottom sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            ]);

        const uvs2 = new Float32Array([
            // roof sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // roof sector 2 
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
        ])
                
        
        
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        let houseMaterial = new T.MeshStandardMaterial({color: "white", map: textureHouse, side: T.DoubleSide});
        let houseMesh = new T.Mesh(geometry,houseMaterial);
        houseMesh.position.x = -3;
        houseMesh.position.z = -3;
        houseGroup.add(houseMesh);

        geometryRoof.setAttribute('uv',new T.BufferAttribute(uvs2,2));
        let roofMaterial = new T.MeshStandardMaterial({color: "white", map: textureRoof, side: T.DoubleSide});
        let roofMesh = new T.Mesh(geometryRoof,roofMaterial);
        roofMesh.position.x = -3;
        roofMesh.position.z = -3;
        houseGroup.add(roofMesh);
        let doorGeometry = new T.BoxGeometry(.01,0.75,0.5);
        let doorMaterial = new T.MeshStandardMaterial({map: textureDoor});
        let doorMesh = new T.Mesh(doorGeometry,doorMaterial);
        doorMesh.position.set(-1.99,.375,-3);
        houseGroup.add(doorMesh);
        
        let windowGeometry = new T.BoxGeometry(.3,0.5,0.01);
        let windowMaterial = new T.MeshStandardMaterial({map: textureWindow});
        let window1Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window1Mesh.position.set(-2.5,.5,-2);
        let window2Mesh = new T.Mesh(windowGeometry,windowMaterialOn);
        window2Mesh.position.set(-3,.5,-2);
        let window3Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window3Mesh.position.set(-3.5,.5,-2);
        let window4Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window4Mesh.position.set(-3.5,1.5,-2);
        let window5Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window5Mesh.position.set(-2.5,1.5,-2);

        houseGroup.add(window1Mesh);
        houseGroup.add(window2Mesh);
        houseGroup.add(window3Mesh);
        houseGroup.add(window4Mesh);
        houseGroup.add(window5Mesh);

        let window6Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window6Mesh.position.set(-2.5,.5,-4);
        let window7Mesh = new T.Mesh(windowGeometry,windowMaterialOn);
        window7Mesh.position.set(-3,.5,-4);
        let window8Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window8Mesh.position.set(-3.5,.5,-4);
        let window9Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window9Mesh.position.set(-3.5,1.5,-4);
        let window10Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window10Mesh.position.set(-2.5,1.5,-4);

        houseGroup.add(window6Mesh);
        houseGroup.add(window7Mesh);
        houseGroup.add(window8Mesh);
        houseGroup.add(window9Mesh);
        houseGroup.add(window10Mesh);

        let seperatorGeometry = new T.BoxGeometry(2.1,0.1,2.1);
        let seperatorMaterial = new T.MeshStandardMaterial({map: textureSeperator});
        let seperatorMesh = new T.Mesh(seperatorGeometry,seperatorMaterial);
        seperatorMesh.position.set(-3,2,-3);
        houseGroup.add(seperatorMesh);

        let walkwayGeom = new T.BoxGeometry(1.5,0.01,1);
        let walkwayMat = new T.MeshStandardMaterial({color:"grey"});
        let walkwayMesh = new T.Mesh(walkwayGeom,walkwayMat);
        walkwayMesh.position.set(-1.5,0,-3);
        houseGroup.add(walkwayMesh);
        houses.add(houseGroup);

        let houseGroup2 = houseGroup.clone();
        houseGroup2.rotateY(Math.PI);
        houseGroup2.position.set(6.5,0,-13);
        houses.add(houseGroup2);
        houses.scale.set(3,3,3);
        houses.position.set(-10,0,42);
        super("createHouseRedux", houses);
    }
}

export class createHouseExtra extends GrObject{
    constructor(){
        let houseGroup = new T.Group();
        let geometry = new T.BufferGeometry();
        let vertices = new Float32Array([
            // create front
            -1, 0, 1,
            1, 0, 1,
            -1, 2, 1,
            
            -1,2,1,
            1, 2, 1,
            1,0,1,
            // create back
            -1, 0, -1,
            1, 0, -1,
            -1, 2, -1,
            
            -1,2,-1,
            1, 2, -1,
            1,0,-1,
            // left side
            -1, 0, -1,
            -1, 0, 1,
            -1, 2, -1,
            
            -1,2,-1,
            -1, 2, 1,
            -1,0,1,
            // right side
            1, 0, -1,
            1, 0, 1,
            1, 2, -1,
            
            1,2,-1,
            1, 2, 1,
            1,0,1,

            // top side
            -1, 2, 1,
            -1, 2, -1,
            1, 2, 1,
            
            1,2,1,
            1, 2, -1,
            -1,2,-1,
            // bottom side
            1, 0, 1,
            1, 0, -1,
            -1, 0, 1,
            
            -1,0,1,
            -1, 0, -1,
            1,0,-1,
            //roof side 1 
            -1,2,1,
            -1,3,1,
            1,2,1,
            //roof side 2 
            -1,2,-1,
            -1,3,-1,
            1,2,-1,
            // roofside
            -1,2,-1,
            -1,3,-1,
            -1,2,1,

            -1,2,1,
            -1,3,1,
            -1,3,-1,


        ]);
        
  
        geometry.setAttribute('position',new T.BufferAttribute(vertices, 3));


            
        const uvs = new Float32Array([
            // frontal sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // rear sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
    
            // left sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // right sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // top sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // bottom sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // roof sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            // attic sector
            0, 0,
            0, 1,
            1, 0,
    
            1, 0, 
            1, 1,
            0, 1,
            ]);
                
        
        
        geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));
        let houseMaterial = new T.MeshStandardMaterial({color: "white", map: textureHouse, side: T.DoubleSide});
        let houseMesh = new T.Mesh(geometry,houseMaterial);
        houseMesh.position.x = -3;
        houseMesh.position.z = -3;
        houseGroup.add(houseMesh);


        let doorGeometry = new T.BoxGeometry(.01,0.75,0.5);
        let doorMaterial = new T.MeshStandardMaterial({map: textureDoor});
        let doorMesh = new T.Mesh(doorGeometry,doorMaterial);
        doorMesh.position.set(-1.99,.375,-3);
        houseGroup.add(doorMesh);
        
        let windowGeometry = new T.BoxGeometry(.3,0.5,0.01);
        let windowMaterial = new T.MeshStandardMaterial({map: textureWindow});
        let window1Mesh = new T.Mesh(windowGeometry,windowMaterialOn);
        window1Mesh.position.set(-2.5,.5,-2);

        let window3Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window3Mesh.position.set(-3.5,.5,-2);
        let window4Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window4Mesh.position.set(-3.5,1.5,-2);
        let window5Mesh = new T.Mesh(windowGeometry,windowMaterialOn);
        window5Mesh.position.set(-2.5,1.5,-2);

        houseGroup.add(window1Mesh);
        houseGroup.add(window3Mesh);
        houseGroup.add(window4Mesh);
        houseGroup.add(window5Mesh);

        let window6Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window6Mesh.position.set(-2.5,.5,-4);
 
        let window8Mesh = new T.Mesh(windowGeometry,windowMaterialOn);
        window8Mesh.position.set(-3.5,.5,-4);
        let window9Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window9Mesh.position.set(-3.5,1.5,-4);
        let window10Mesh = new T.Mesh(windowGeometry,windowMaterial);
        window10Mesh.position.set(-2.5,1.5,-4);
        // add extra window
        let window11Geometry = new T.BoxGeometry(.01,0.5,0.3);
        let window11Mesh = new T.Mesh(window11Geometry,windowMaterialOn);
        window11Mesh.position.set(-4,2.5,-3);
        let window12Mesh = new T.Mesh(window11Geometry,windowMaterial);
        window12Mesh.position.set(-4,1.5,-3);
        let window13Mesh = new T.Mesh(window11Geometry,windowMaterial);
        window13Mesh.position.set(-4,.5,-3);
        houseGroup.add(window6Mesh);
        houseGroup.add(window8Mesh);
        houseGroup.add(window9Mesh);
        houseGroup.add(window10Mesh);
        houseGroup.add(window11Mesh);
        houseGroup.add(window12Mesh);
        houseGroup.add(window13Mesh);

        let roofGeometry = new T.BoxGeometry(2.5,0.11,2.2);
        let roofMaterial = new T.MeshStandardMaterial({map: textureRoof});
        let roofMesh = new T.Mesh(roofGeometry,roofMaterial);
        roofMesh.position.set(-2.9,2.5,-3);
        roofMesh.rotateZ(-Math.PI/6 + 0.05);
        houseGroup.add(roofMesh);

      

        let seperatorGeometry = new T.BoxGeometry(2.01,0.1,2.1);
        let seperatorMaterial = new T.MeshStandardMaterial({map: textureSeperator});
        let seperatorMesh = new T.Mesh(seperatorGeometry,seperatorMaterial);
        seperatorMesh.position.set(-3,2,-3);
        houseGroup.add(seperatorMesh);
        
        let walkwayGeom = new T.BoxGeometry(1.5,0.01,1);
        let walkwayMat = new T.MeshStandardMaterial({color:"grey"});
        let walkwayMesh = new T.Mesh(walkwayGeom,walkwayMat);
        walkwayMesh.position.set(-1.5,0,-3);
        houseGroup.add(walkwayMesh);

        houseGroup.position.set(-10,0.0001,31);
        houseGroup.scale.set(3,3,3);
        
        super("createHouseExtra", houseGroup);
    }
}

export class neighborhoodFencing extends GrObject{
    constructor(){
        let fenceGroup = new T.Group();
        let fence1 = new T.Group();   
        
        let fence1sideGeom = new T.PlaneGeometry(20,1.5);
        let fence1sideTex = textureLoader.load("../examples/assets/fence.png");
        let fence1sideMat = new T.MeshStandardMaterial({map: fence1sideTex, side: T.DoubleSide})
        fence1sideTex.repeat.set(5, 1);
        fence1sideTex.wrapS = T.RepeatWrapping; 
        fence1sideTex.wrapT = T.RepeatWrapping; 

        let fence1side1Mesh = new T.Mesh(fence1sideGeom,fence1sideMat);
        fence1.add(fence1side1Mesh);
        fence1.position.set(-25,0.75,5)
        let fence1side2Mesh = fence1side1Mesh.clone();
        fence1side2Mesh.position.set(0,0,11);
        let fence1side3Mesh = fence1side1Mesh.clone();
        fence1side3Mesh.position.set(0,0,22);
        let fence1side4Mesh = fence1side1Mesh.clone();
        fence1side4Mesh.position.set(0,0,33);
        fence1.add(fence1side2Mesh);
        fence1.add(fence1side3Mesh);
        fence1.add(fence1side4Mesh);

        let fence1frontTex = textureLoader.load("../examples/assets/fence.png");
        let fence1frontGeom = new T.PlaneGeometry(33,1.5);
        fence1frontTex.repeat.set(10, 1);
        fence1frontTex.wrapS = T.RepeatWrapping; 
        fence1frontTex.wrapT = T.RepeatWrapping; 

        let fence1frontMat = new T.MeshStandardMaterial({map: fence1frontTex, side: T.DoubleSide});

        let fence1frontMesh = new T.Mesh(fence1frontGeom,fence1frontMat);
        fence1frontMesh.rotateY(Math.PI/2);
        fence1frontMesh.position.set(-10,0,16.5);
        fence1.add(fence1frontMesh);
        fenceGroup.add(fence1);
        let fence2 = fence1.clone();
        fence2.rotateY(Math.PI);
        fence2.position.set(25,0.75,38.5);
        fenceGroup.add(fence2);

        super("createHouseExtra", fenceGroup);
    }
}
// make a swimming pool-- from my research project.
export class swimmingPool extends GrObject{
    constructor(){
        
        let poolGroup = new T.Group(); 
        let waveGeometry = new T.BoxGeometry(23,4,24,24,4,24);
    let waveMaterial = new T.ShaderMaterial({
     wireframe: false,
    transparent: true,
    uniforms: {
      time: {
        type: 'f',
        value: 0,
      }},
    vertexShader: `
    uniform float time;
    void main() {
      vec4 result;
      result = vec4(position.x,sin(position.z + time * 0.005) + position.y,position.z,1.0);

      gl_Position = projectionMatrix * modelViewMatrix * result;
    }
    `,
    fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.3, 0.3, 1.0,0.4);
    }
    `,
  });
  let waveMesh = new T.Mesh(waveGeometry,waveMaterial);
  waveMesh.scale.set(0.2,0.05,0.1);
  waveMesh.position.set(7.5,0.25,-8.8);
  waveMesh.rotation.set(0,Math.PI,0);
  poolGroup.add(waveMesh);

  // create poolrooms DEMO
  let poolBox = new T.BoxGeometry(3.2, 0.1, 1.5);
  let poolColor = textureLoader.load("../examples/assets/poolrooms.jpg");
  poolColor.wrapS = T.RepeatWrapping;
  poolColor.wrapT = T.RepeatWrapping;
  poolColor.repeat.set(4,3); 

  let poolMesh = new T.Mesh(
    poolBox,
          // @ts-ignore
          new T.MeshStandardMaterial({ map: poolColor, roughness: 0})
      );
  // @ts-ignore
  poolMesh.position.set(7.5,0.1,-8.75);
  poolMesh.scale.set(1.5,1.5,1.5);

  poolGroup.add(poolMesh);

  let poolColor2 = textureLoader.load("../examples/assets/poolrooms.jpg");
  poolColor2.wrapS = T.RepeatWrapping;
  poolColor2.wrapT = T.RepeatWrapping;
  poolColor2.repeat.set(12,2); 
  let poolBox2 = new T.BoxGeometry(3.2,0.4,0.2);
  let poolguard = new T.Mesh(
    poolBox2,
          // @ts-ignore
          new T.MeshStandardMaterial({ map: poolColor2, roughness: 0})
      );
  poolguard.position.set(7.5,0.1,-7.5);
  poolguard.scale.set(1.5,1.75,1.5);
  poolGroup.add(poolguard);

  let poolGuard2 = poolguard.clone();
  poolGuard2.position.z = -10;
  poolGroup.add(poolGuard2);


    let poolBox3 = new T.BoxGeometry(0.20, 0.7, 2.79); 
    let poolGuard3 = new T.Mesh(poolBox3,new T.MeshStandardMaterial({ map: poolColor2, roughness: 0}))
    poolGuard3.position.set(5.199,0.15,-8.75);
    poolGroup.add(poolGuard3);

    let poolGuard4 = poolGuard3.clone();
    poolGuard4.position.x = 9.801;
    poolGroup.add(poolGuard4);
    poolGroup.rotateY(Math.PI/2);



  poolGroup.position.set(-15,0.2,29.5);
  poolGroup.scale.set(1,1,1.5);
super("swimmingPool", poolGroup);
this.waveMaterial = waveMaterial;
    }

stepWorld(delta,timeOfDay){
    this.waveMaterial.uniforms.time.value += delta;
    }

}






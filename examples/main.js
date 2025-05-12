// main function for graphics town

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { skyScraperCloth, skyScraperFrame, skyScraperLight, skyScraperSniperSet } from "./skyscraper.js";
import { constructionPerimeter , craneMachine, trashTruck, constructionLights} from "./constructionSite.js";
import { highwaySystemRoads, neighborhoodRoads, emptyLot, billBoard} from "./cottonmouthRoad.js";
import { foliageMedian,createHouse, createHouseRedux, createHouseExtra, neighborhoodFencing, swimmingPool} from "./neighborhood.js";
import { stationaryPopo, movingSwatVan} from "./fiveO.js";
import {helicopterFlying} from "./manhunt.js";
import { storageUnits } from "./storageFacility.js";

export function main(world) {

// this is where my skybox is made
  let skyboxImages = [
    '../examples/assets/nx.png',
    '../examples/assets/px.png',
    '../examples/assets/py.png',
    '../examples/assets/ny.png',
    '../examples/assets/nz.png',
    '../examples/assets/pz.png',
];
let skyboxLoader = new T.CubeTextureLoader();
let skybox = skyboxLoader.load(skyboxImages);
world.scene.background = skybox;


// OBJ 1
// add frame on skyscraper
let skyscraperFrame = new skyScraperFrame();
world.add(skyscraperFrame);
// OBJ2 
// add cloth on skyscraper
let skyscraperCloth = new skyScraperCloth();
world.add(skyscraperCloth);
// OBJ 3 
// add red light on skyscraper
let skyscraperLight = new skyScraperLight();
world.add(skyscraperLight);
// OBJ 4 
// added dirt and perimeter on construction site
let constructionperimeter = new constructionPerimeter();
world.add(constructionperimeter);
// OBJ 5
// added truck to the construction site
let constructiontruck = new trashTruck();
world.add(constructiontruck);
// OBJ 6
// added construction site CRANE
let constructionCrane = new craneMachine();
world.add(constructionCrane);
// OBJ 7
// added construction site g-lights
let constructionSiteLights = new constructionLights();
world.add(constructionSiteLights);
// OBJ 8
// added a sniper post (project escapee on pursuit by police)
let siteSniper = new skyScraperSniperSet();
world.add(siteSniper);
// OBJ 9 
// added a highway system
let highwaySys = new highwaySystemRoads();
world.add(highwaySys);
// OBJ 10
// added roads system
let roadSys = new neighborhoodRoads();
world.add(roadSys);
// OBJ 11
// added parking lot and light
let parkingLot = new emptyLot();
world.add(parkingLot);
// OBJ 12
// added foliage in the neighborhood areas
let foliages = new foliageMedian();
world.add(foliages);
// OBJ 13
// added my first type house
let house1 = new createHouse();
world.add(house1);
// OBJ 14
// added my second type house
let house2 = new createHouseRedux();
world.add(house2);
// OBJ 15
// added my third type house
let house3 = new createHouseExtra();
world.add(house3);
// OBJ 16
// added neighborhood fencing
let fenceSystem = new neighborhoodFencing();
world.add(fenceSystem);
// OBJ 17
// added backyard pool
let pool = new swimmingPool();
world.add(pool)
// OBJ 18
// added stationary popocar
let popoStationary = new stationaryPopo();
world.add(popoStationary)
// OBJ 19
// added a moving SWAT van
let popoSWATMoving = new movingSwatVan();
world.add(popoSWATMoving);
// OBJ 20
// added an ARTICULATED MOVING helicopter
let popoHeli = new helicopterFlying();
world.add(popoHeli);
// OBJ 21
// added the storage facility space
let storageFacilitySpace = new storageUnits();
world.add(storageFacilitySpace);
// OBJ 22
// added a billboard
let boardBill = new billBoard();
world.add(boardBill);
}

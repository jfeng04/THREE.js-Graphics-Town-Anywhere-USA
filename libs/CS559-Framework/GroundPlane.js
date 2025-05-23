/*jshint esversion: 11 */
// @ts-nocheck

/**
 * CS559 3D World Framework Code
 *
 * Example Object Type: Ground Plane
 *
 * This object is completely static and simple, so it's good to learn
 * from. It's also convenient to use.
 *
 * There are a few variants of the ground plane. We'll give the simple ones
 * at first, since students will make better ones in later projects.
 * 
 * @Module GroundPlane
 */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";

// a global variable to keep track of how many objects we create
// this allows us to give unique names
let numberOfGrounds = 0;

import * as T from "../CS559-Three/build/three.module.js";

/**
 * This is the simplest - just a solid grey box
 * Mainly for testing
 */
export class SimpleGroundPlane extends GrObject {
  /**
   * The size is in each direction (so X goes from -size to +size)
   * Thickness is because the object is a box (like a table top)
   *
   * @param {Number} size=5
   * @param {Number} thickness=0.2
   * @param {string|Number} [color="white"]
   */
  constructor(size = 5, thickness = 0.2, color = "white") {
    // we need to create the parts before we can call "super"
    const geometry = new T.BoxGeometry(size * 2, thickness, size * 2);
    const material = new T.MeshStandardMaterial({ color: color, roughness: 0.9 });
    const mesh = new T.Mesh(geometry, material);
    numberOfGrounds += 1;

    // set up the base class
    super(`SimpleGroundPlane-${numberOfGrounds}`, mesh);

    // now we can set up "this" - we have to do this after we call super
    this.geom = geometry;
    this.material = material;
    this.mesh = mesh;
    this.size = size;
    this.height = thickness / 2;

    // put the box into the right place
    this.mesh.position.y = -thickness / 2;
  }

  // animation doesn't do anything, but we have it anyway
  stepWorld(delta, timeOfDay) {
    // just sits there
  }

  // parameter changing doesn't do anything, as there are no parameters
  update(values) {}
}

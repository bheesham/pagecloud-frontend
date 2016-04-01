import fs from 'fs'

/**
 * // call me maybe, like so:
 * if(errorhandler(node_id,json)){
 *  return;
 * }
 */

export default function (node_id,json) {

  // const response = JSON.parse(fs.readFileSync()); 
  if(Object.prototype.hasOwnProperty.call(json,"errors")){
   let node = document.getElementById(node_id); 
   $(node).appendChild("1");
   console.log("errorhandler: caught error in json");
   return true;
  }
  return false;

}


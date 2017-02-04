import NameDataStructure from '../../Structure/NameDataStructure';




export type OnActionFoundSync = (NameDataStructure)=>any;
export type OnActionFoundAync = (NameDataStructure)=>Promise<any>;
export type OnActionFound = OnActionFoundAync;


export default OnActionFound;
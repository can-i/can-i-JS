


export function IsFilePathQuery(filepath:string){
    return /\.[A-Z]+$/.test(filepath);
}


export default IsFilePathQuery;
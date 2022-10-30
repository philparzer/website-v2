export function enumToKeyArray(enumObjectValues: string[] | any[]):number[]  {
    let arr:number[] = enumObjectValues.filter((value: any) => typeof(value) === "number")
    return arr;
}

export function enumToValueArray(enumObjectValues: string[] | any[]):string[]  {
    let arr:string[] = enumObjectValues.filter((value: any) => typeof(value) === "string")
    return arr;
}
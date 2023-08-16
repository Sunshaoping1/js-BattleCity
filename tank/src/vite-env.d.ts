/// <reference types="vite/client" />


interface IModelConstructor {
    //相当于constructor(x:number,y:number):IModel
    new(x:number,y:number):IModel
}

interface IModel {
    render():void
    getImg():HTMLImageElement
    x:number
    y:number
    tank?:IModel
    direction?:string
    bulletWidth?:number
    bulletHeight?:number
    life?:number
}


interface TouchInstance {
    models:IModel[]
    modelTouchFun(x:number,y:number):(model: IModel) => boolean
}

interface ModelInstance {
    models:IModel[]
    render():void
}

interface ICanvas{
    stop?:()=>void
}

export default abstract class Model {
    abstract render():void
    abstract getImg():HTMLImageElement
    constructor(public x:number,public y:number){
    }

}
import config from "../config"
import position from "../service/position"

export abstract class canvasAbstract {
    
    //存储模型实例
    public models:IModel[] = []

    //抽象类，用于调用私有方法
    abstract render():void


    constructor(
        protected el:HTMLCanvasElement = document.createElement("canvas"),
        protected ctx:CanvasRenderingContext2D = el.getContext("2d")!
    ){

        this.createCanvas()
    }

    // 创建画布canvas
    protected createCanvas(){
        this.el.width = config.canvas.width
        this.el.height = config.canvas.height
        this.el.style.position = "absolute"
        //为canvas元素命名
        this.el.setAttribute('name',this.constructor.name.toLowerCase())

        const app = document.querySelector("#app")!
        app.append(this.el)
    }

    //获取贴图模型类，生成模型实例
    protected createModels(num:number,model:IModelConstructor){

        const arr = position.positionCoordinates(num)
        
        
        arr.forEach(position=>{
            const instance =  new model(position.x,position.y)
            this.models.push(instance)
        })
        
    }

    //循环贴图实例，在画布上渲染贴图
    protected renderModel(){
        this.ctx.clearRect(0,0,config.canvas.width,config.canvas.height)
        this.models.forEach(instance=>{
            this.ctx.drawImage(instance.getImg(),instance.x,instance.y,config.model.width,config.model.height)
        })
    }

    
    
}
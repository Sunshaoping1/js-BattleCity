import { canvasAbstract } from "./canvas";
import tank from "../model/tank"
import config from "../config";

class Tank extends canvasAbstract implements ICanvas{
    public isSetTime:boolean = false;
    public timerId:number = 0
    constructor(){
        super()
        //传递要渲染的贴图模型的数量和贴图模型类
        this.createModels(config.tank.num,tank)
    }
    
    render(): void {
       //在画布上渲染模型贴图
       this.renderModel()

       
       if(this.isSetTime === false){//防止多次设置定时器
        this.isSetTime = true
        this.timerId = setInterval(()=>{
            this.renderModel()
        },config.tankTimeout) as unknown as number
       }
       
    }

    stop():void{
        clearInterval(this.timerId)
    }

    //获取贴图模型类，生成模型实例
    protected createModels(num:number,model:IModelConstructor){

        for(let i=0;i<num;i++){
            const position = {
                x:Math.floor(Math.random()*config.canvas.width/config.model.width)*config.model.width,
                y:Math.floor(Math.random()*2)*config.model.height
            }
            const instance =  new model(position.x,position.y)
            this.models.push(instance)
        }
        
    }

    //循环贴图实例，在画布上渲染贴图
    protected renderModel(){
        //将坦克画布上的坦克贴图全部清除
        this.ctx.clearRect(0,0,config.canvas.width,config.canvas.height)
        
        this.models.forEach(instance=>{
            instance.render() //渲染坦克移动效果

            this.ctx.drawImage(instance.getImg(),instance.x,instance.y,config.model.width,config.model.height)
        })
    }
    
}

export default new Tank()
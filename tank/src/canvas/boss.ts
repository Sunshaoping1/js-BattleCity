
import { canvasAbstract } from "./canvas"

//返回class类
import boss from "../model/boss"

import config from "../config"

class Boss extends canvasAbstract{
    constructor(){
        super()
        //传递要渲染的贴图模型的数量和贴图模型类
        this.createModels(config.boss.num,boss)
    }
    render(): void {
        
        //在画布上渲染模型贴图
        this.renderModel()
    }
    
    //获取贴图模型类，生成模型实例
    protected createModels(num:number,model:IModelConstructor){


       const position = {x:config.canvas.width/2-2*config.model.width,y:config.canvas.height-config.model.height}
        
        for(let i=0;i<num;i++){
            const instance =  new model(position.x,position.y)
            this.models.push(instance)
        }
        
        
    }

    // //循环贴图实例，在画布上渲染贴图
    // protected renderModel(){
    //     this.ctx.clearRect(0,0,config.canvas.width,config.canvas.height)

    //     this.models.forEach(instance=>{
    //         this.ctx.drawImage(instance.getImg(),instance.x,instance.y,config.model.width,config.model.height)
    //     })
    // }
}

export default new Boss()
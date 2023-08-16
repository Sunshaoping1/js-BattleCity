
import { canvasAbstract } from "./canvas"

//返回class类
import wall from "../model/wall"

import config from "../config"

class Wall extends canvasAbstract{
    constructor(){
        super()
        //传递要渲染的贴图模型的数量和贴图模型类
        super.createModels(config.wall.num,wall)
        this.createBossWallModels(wall)
    }
    render(): void {
        
        //在画布上渲染模型贴图
        super.renderModel()
    }

    // //循环贴图实例，在画布上渲染贴图
    // protected renderModel(){
    //     this.ctx.clearRect(0,0,config.canvas.width,config.canvas.height)
    //     this.models.forEach(instance=>{
    //         this.ctx.drawImage(instance.getImg(),instance.x,instance.y,config.model.width,config.model.height)
    //     })
    // }
    
    private createBossWallModels(model:IModelConstructor){
        const cw = config.canvas.width
        const ch = config.canvas.height
        const mw = config.model.width
        const mh = config.model.height

        const positions = [
            {x:cw/2-4*mw,y:ch-mh},
            {x:cw/2-3*mw,y:ch-mh},
            {x:cw/2+mw,y:ch-mh},
            {x:cw/2+2*mw,y:ch-mh},
            {x:cw/2-4*mw,y:ch-2*mh},
            {x:cw/2-3*mw,y:ch-2*mh},
            {x:cw/2+mw,y:ch-2*mh},
            {x:cw/2+2*mw,y:ch-2*mh},
            {x:cw/2-4*mw,y:ch-3*mh},
            {x:cw/2-3*mw,y:ch-3*mh},
            {x:cw/2+mw,y:ch-3*mh},
            {x:cw/2+2*mw,y:ch-3*mh},
            {x:cw/2-2*mw,y:ch-3*mh},
            {x:cw/2-mw,y:ch-3*mh},
            {x:cw/2,y:ch-3*mh},
            {x:cw/2-4*mw,y:ch-4*mh},
            {x:cw/2-3*mw,y:ch-4*mh},
            {x:cw/2-2*mw,y:ch-4*mh},
            {x:cw/2-mw,y:ch-4*mh},
            {x:cw/2,y:ch-4*mh},
            {x:cw/2+mw,y:ch-4*mh},
            {x:cw/2+2*mw,y:ch-4*mh},

        ]

        positions.forEach(position=>{
            const instance = new model(position.x,position.y)
            this.models.push(instance)
        })
    }
    
}

export default new Wall()
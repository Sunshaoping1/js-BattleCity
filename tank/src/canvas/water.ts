
import { canvasAbstract } from "./canvas"

//返回class类
import water from "../model/water"

import config from "../config"

class Water extends canvasAbstract{
    constructor(){
        super()
        //传递要渲染的贴图模型的数量和贴图模型类
        super.createModels(config.water.num,water)
    }
    render(): void {
        
        //在画布上渲染模型贴图
        super.renderModel()
    }
    
}

export default new Water()
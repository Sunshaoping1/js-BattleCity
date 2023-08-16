
import { canvasAbstract } from "./canvas"

//返回class类
import play from "../model/play"

import config from "../config"

class Play extends canvasAbstract{
    constructor(){
        super()
        //传递要渲染的贴图模型的数量和贴图模型类
        super.createModels(config.play.num,play)
    }
    render(): void {
        
        //在画布上渲染模型贴图
        super.renderModel()

       

    }


}

export default new Play()
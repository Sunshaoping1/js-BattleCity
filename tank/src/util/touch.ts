import steels from "../canvas/steels"
import wall from "../canvas/wall"
import water from "../canvas/water"
import boss from "../canvas/boss"
import config from "../config"
import play from "../canvas/play"

export class Touch{
    constructor(public models:IModel[]=[...steels.models,...wall.models,...water.models,...boss.models,...play.models],public width:number=config.model.width,public height:number=config.model.height){
        
    }

    //画布碰撞检测
    public isCanvasTouch(x:number,y:number):boolean{
        

        
        if(x< 0 || x + this.width > config.canvas.width ||
            y < 0 || y+this.height > config.canvas.height){//子弹超出画布则销毁
            return true
        }

       return false

    }

    public modelTouchFun(x:number,y:number){
        return (model:IModel)=>{//触碰到不可穿越的模型上也要被销毁
            const state = x + this.width <= model.x || x  >= model.x + config.model.width
            || y + this.height <= model.y || y >= model.y + config.model.height

            return !state
        }
    }

    // 模型碰撞检测
    public isModelTouch(x:number,y:number){
        
        
        return this.models.some(this.modelTouchFun(x,y))
    }

    //删除不需要的模型(models数组中被子弹击中的wall模型)，其作用是：更新模型检测方法
    public repairIsModelTouch(delArr:IModel[]){
        this.models = this.models.filter(model=>!delArr.includes(model))
    }

    
}
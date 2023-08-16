import wall from "../canvas/wall";
import boss from "../canvas/boss";
import play from "../canvas/play";
import tank from "../canvas/tank";

export class wallModel{

    constructor(public touch:TouchInstance){ 
    }

    //被子弹击中的wall模型
    public hitWallModels(x:number,y:number){
        return this.touch.models.filter(this.touch.modelTouchFun(x,y))

    }

    //要摧毁的wall模型
    public delWallModels(x:number,y:number){
        
        this.hitWallModels(x,y).forEach(model=>{
            if(model.life === undefined) return 
            else model.life--
        })

        //undefined != 0
        //当生命值为0时，即摧毁
        return this.touch.models.filter(model=>model.life === 0)
    }

    //更新并重新渲染模型
    public changeWallModels(delArr:IModel[]){
        const arr = [wall,boss,play,tank]

        arr.forEach(model=>{
            this.changemodels(model,delArr)
        })

    }

    
    private changemodels(instance:ModelInstance,delArr:IModel[]){
        const ord = [...instance.models].length

        // 改变存放wall的数组，并在画布上重新渲染它
        instance.models = instance.models.filter(model=>!delArr.includes(model))
        
        const current = instance.models.length
        if(ord !== current){

            instance.render()
        }

    }
}
import { DirectionEnum } from "../../enum/directionEnum";
import steels from "../canvas/steels";
import wall from "../canvas/wall";
import bullet from "../canvas/bullet";
import boss from "../canvas/boss";
import config from "../config"
import { image } from "../service/image"


import Model from "./model"

import {delModels} from "../util/delModels";
import { wallModel } from "../util/wallModel";
import { Touch } from "../util/touch";
import play from "../canvas/play";
import tank from "../canvas/tank";

import audio from "../service/audio";




export default class Bullet extends Model implements IModel {
    public direction:DirectionEnum;
    


    constructor(public tank:IModel){//tank属性：标识子弹实例是哪个坦克创建的
        super(tank.x+config.model.width/2,tank.y+config.model.height/2)

        this.direction = this.tank.direction as unknown as DirectionEnum
        
    }
    //获取贴图
    getImg(): HTMLImageElement {
        return image.get("bullet")!
    }
    //子弹移动渲染
    render(): void {

        this.bulletMove()
        // const img = image.get("bullet")!
        // super.renderImg(img)
    }

    //子弹运动轨迹
    private bulletMove(){
        let touch:any;
        if(tank.models.includes(this.tank)){
            touch = new Touch([...steels.models,...wall.models,...boss.models,...play.models],2,2)
        }else{
            touch = new Touch([...steels.models,...wall.models,...tank.models],2,2)
        }
        const wallmodel = new wallModel(touch)
        let x = this.x;
        let y = this.y;
        switch(this.direction){
            case DirectionEnum.top:
                y-=10;
                break;
            case DirectionEnum.bottom:
                y+=10;
                break;
            case DirectionEnum.left:
                x-=10;
                break;
            case DirectionEnum.right:
                x+=10;
                break; 
            default:
                break;
        }

        //获取要删除的wall模型
        const arr = wallmodel.delWallModels(x,y)

        //传递给tank实例，其作用是：更新坦克碰撞检测
        delModels.push(...arr)
        
        //监测子弹是否需要销毁
        if(touch.isCanvasTouch(x,y) === true || touch.isModelTouch(x,y) === true){

            //在子弹模型数组中删除要销毁的模型
            bullet.models = bullet.models.filter(model => model != this)

            if(arr.length){//有需要删除的模型
                // 更新并重新渲染wall模型
                wallmodel.changeWallModels(arr)

                
                arr.forEach(model=>{
                    //在销毁的模型的位置上渲染子弹爆炸效果
                    bullet.blast(model)

                    //设置爆炸的声音
                    audio.blast()
                })

                // 为子弹更新碰撞检测
                touch.repairIsModelTouch(arr)
            }

            return

        }
        this.x = x;
        this.y = y
        
    }

    
    
    

    
}


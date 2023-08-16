import { DirectionEnum } from './../../enum/directionEnum';
import { T, image } from "../service/image"
import Model from "./model"
// import config from '../config';

// import steels from '../canvas/steels';
// import wall from '../canvas/wall';
// import water from '../canvas/water';

import { Touch } from '../util/touch';
import {delModels} from '../util/delModels';

const touch = new Touch()

export default class tank extends Model implements IModel {
    //坦克的随机方向
    public direction:DirectionEnum = DirectionEnum.bottom

    //敌方坦克生命
    public life:number = 2

    //渲染贴图
    render(): void {
        this.move()

        if(delModels.length > 0){
            //为坦克更新碰撞检测
            touch.repairIsModelTouch(delModels)
        }

    }

    constructor( x:number, y:number){
        super(x,y)

        this.randomDirection()
    }

    //坦克移动
    private move(){
        
        let x = this.x
        let y = this.y
        switch(this.direction){
            case DirectionEnum.top:
                y-=1;
                break;
            case DirectionEnum.bottom:
                y+=1;
                break;
            case DirectionEnum.left:
                x-=1;
                break;
            case DirectionEnum.right:
                x+=1;
                break;
        }
        if(touch.isCanvasTouch(x,y) === true ||  touch.isModelTouch(x,y)=== true){
            this.randomDirection()
        }else{
            this.x = x
            this.y = y
        }
    }

    
    //决定坦克的随机方向
    private randomDirection(){
        const arr = Object.keys(DirectionEnum).sort()
        const firstItem = arr.shift()! as DirectionEnum
        // console.log(arr)
        const index = Math.floor(Math.random()*arr.length)
        this.direction = Math.random() <= 0.4 ? firstItem : arr[index] as DirectionEnum
    }

    //根据随机方向生成相应的坦克贴图
    public getImg(){
       
        const key = "tank_" + this.direction as T
        
        return image.get(key)!
    }
}
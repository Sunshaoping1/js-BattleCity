import { DirectionEnum } from './../../enum/directionEnum';

import { T,image } from "../service/image"

import Model from "./model"

import play from "../canvas/play"

import { Touch } from '../util/touch';
import config from '../config';
import steels from '../canvas/steels';
import wall from '../canvas/wall';
import water from '../canvas/water';
import tank from '../canvas/tank';
import boss from '../canvas/boss';

import bullet from '../canvas/bullet';

export default class Play extends Model implements IModel {
    public life:number = 3

    public direction:DirectionEnum = DirectionEnum.bottom

    // public isBindEvent:boolean = false
    constructor(x:number,y:number){
        super(x,y)

        //绑定事件，作用是改变玩家坦克的方向
        this.bindEvent()
        
    }

    //获取图片
    getImg(): HTMLImageElement {
        const playDirection = "play_" + this.direction  as T
        return image.get(playDirection)!
    }

    render(): void {
    }

    
    //绑定键盘事件，作用是坦克移动和改变玩家坦克的方向
    private bindEvent(){
        // if(this.isBindEvent === false){
        //     this.isBindEvent = true
        //     document.addEventListener("keydown",(event)=>{
        //         switch(event.code){
        //             case "ArrowUp":
        //                 this.direction = DirectionEnum.top
                        
        //                 break;
        //             case "ArrowDown":
        //                 this.direction = DirectionEnum.bottom
        //                 break;
        //             case "ArrowRight":
        //                 this.direction = DirectionEnum.right
        //                 break;
        //             case "ArrowLeft":
        //                 this.direction = DirectionEnum.left
        //                 break
        //             default:
        //                 break;
        //         }
        //         play.render()
        //     })
        //     document.addEventListener("keydown",this.move.bind(this))
    
        //     document.addEventListener("keydown",(event:KeyboardEvent)=>{
        //         if(event.code === "Space"){
        //             console.log(999)
        //             bullet.addPlayBullet()
        //         }
        //     })

        // }

        document.addEventListener("keydown",(event)=>{
            // console.log(1)
            switch(event.code){
                case "ArrowUp":
                    this.direction = DirectionEnum.top
                    
                    break;
                case "ArrowDown":
                    this.direction = DirectionEnum.bottom
                    break;
                case "ArrowRight":
                    this.direction = DirectionEnum.right
                    break;
                case "ArrowLeft":
                    this.direction = DirectionEnum.left
                    break
                default:
                    break;
            }
            play.render()
        })
        document.addEventListener("keydown",this.move.bind(this))

        document.addEventListener("keydown",(event:KeyboardEvent)=>{
            // console.log(3)

            if(event.code === "Space"){
                bullet.addPlayBullet()
            }
        }) 

    }

    //坦克移动
    private move(event:KeyboardEvent){
        const touch = new Touch([...steels.models,...wall.models,...water.models,...boss.models,...tank.models],config.model.width,config.model.height)
 
        
        let x = this.x
        let y = this.y
        switch(event.code){
            case "ArrowUp":
                y-=10;
                break;
            case "ArrowDown":
                y+=10;
                break;
            case "ArrowLeft":
                x-=10;
                break;
            case "ArrowRight":
                x+=10;
                break;
        }
        if(touch.isCanvasTouch(x,y) === true ||  touch.isModelTouch(x,y)=== true){
            return
        }
        this.x = x
        this.y = y
        
        play.render()
    }

    
}


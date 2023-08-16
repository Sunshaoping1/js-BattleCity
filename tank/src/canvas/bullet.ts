
import { canvasAbstract } from "./canvas"

//返回class类
import bullet from "../model/bullet"

import tank from "./tank"
import play from "./play"
import config from "../config"

import audio from "../service/audio"


class Bullet extends canvasAbstract implements ICanvas{
    public timerId:number = 0;
    constructor(){
        super()
        
    }
    render(): void {
        
        

        // setTimeout(this.createBullets.bind(this),500)

        this.timerId = setInterval(()=>{
            this.createBullets()
            this.renderBullets()
        },config.bulletTimeout) as unknown as number

    }

    stop(): void {
        clearInterval(this.timerId)
    }

    //创建敌方坦克子弹贴图实例
    private createBullets(){
        
        tank.models.forEach(instance=>{

            const isExists = this.models.some(model=>model.tank == instance)

            //检测坦克创建的子弹是否存在
            if(!isExists){
                const model = new bullet(instance)//不存在则创建
                this.models.push(model)
            }

            
        })
        
    }

    //玩家坦克的子弹
    public addPlayBullet(){
        play.models.forEach(instance=>{
            const model = new bullet(instance)
            this.models.push(model)

            //设置玩家坦克发射子弹的声音
            audio.fire()
        })
        
    }

    //渲染子弹
    private renderBullets(){
        this.ctx.clearRect(0,0,config.canvas.width,config.canvas.height)
        this.models.forEach(model=>{
            model.render()//子弹运动
            this.ctx.drawImage(model.getImg(),model.x,model.y,2,2)
        })
    }

    //在子弹画布上渲染子弹爆炸效果
    public blast(model:IModel){

        Array(...Array(8).keys()).reduce((promise,index)=>{
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    const img = new Image()
                    img.src = `/src/static/images/blasts/blast${index}.gif`
                    img.onload = ()=>{
                        this.ctx.drawImage(img,model.x,model.y,config.model.width,config.model.height)

                        resolve(promise)
                    }
                },20*index)
            })
        },Promise.resolve())
    }
    
    
    
}

export default new  Bullet()
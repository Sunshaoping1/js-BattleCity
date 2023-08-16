import config from './config';
import './style.scss'
//绘制草地的画布
import straw from "./canvas/straw"

import wall from './canvas/wall';

import steels from './canvas/steels';


import water from './canvas/water';


//绘制坦克的画布
import tank from "./canvas/tank"

import bullet from './canvas/bullet';

import boss from "./canvas/boss"

import play from "./canvas/play"

import {promises} from './service/image';

import audio from './service/audio';


const app = document.querySelector<HTMLDivElement>("#app")!;

app.style.width = config.canvas.width + "px"
app.style.height = config.canvas.height + "px"
app.style.position = "relative"


export default {
    state:9,
    timerId:0,
    bootstrap(){
        let isExecuted:boolean = false;
        app.addEventListener("click",async ()=>{
            if(isExecuted === false){
                isExecuted = true
                app.style.backgroundImage = "none"
                await this.start()
                this.timerId = setInterval(()=>{
                    if(play.models.length === 0 || boss.models.length === 0) this.state = 0
                    if(tank.models.length === 0) this.state = 1
                    if(this.state !== 9) this.stop()
                },100) as unknown as number
            }
            
        })
        
    },
    stop(){
        clearInterval(this.timerId)

        //暂停坦克和子弹
        tank.stop()
        bullet.stop()

        this.text()
        console.log("游戏结束")
    },
    text(){
        const el = document.createElement("canvas")
        el.width = config.canvas.width
        el.height = config.canvas.height
        el.style.position = "absolute"
        app.append(el)
        const ctx = el.getContext("2d")!;
        ctx.font = "80px CascadiaMono"
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.strokeText("胜利",config.canvas.width/2,config.canvas.height/2)
    },
    async start(){
        //预先加载贴图
        await Promise.all(promises)

        //播放游戏开始开始的声音
        audio.start()
    
        //抽象方法，绘制贴图
        straw.render()
        steels.render()
        wall.render()
        water.render()
    
    
        tank.render()
    
    
        bullet.render()
        
        boss.render()
    
        play.render()
    
    
    }
}

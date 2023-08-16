import straw from "./static/images/straw/straw.png"
import wall from "./static/images/wall/wall.gif"
import water from "./static/images/water/water.gif"
import steels from "./static/images/wall/steels.gif"

import tank_bottom from "./static/images/tank/bottom.gif"
import tank_top from "./static/images/tank/top.gif"
import tank_left from "./static/images/tank/left.gif"
import tank_right from "./static/images/tank/right.gif"

import bullet from "./static/images/bullet/bullet.jpg";
import boss from "./static/images/boss/boss.png"

import play_bottom from "./static/images/player/bottom.gif"
import play_top from "./static/images/player/top.gif"
import play_left from "./static/images/player/left.gif"
import play_right from "./static/images/player/right.gif"



//全局配置项
export default {
    //画布集合
    canvas:{
        width:900,
        height:600
    },
    // 坦克的状态集合
    //
    model:{
        width: 30,
        height: 30
    },
    images:{
        straw,
        wall,
        water,
        steels,
        tank_bottom,
        tank_top,
        tank_left,
        tank_right,
        bullet,
        boss,
        play_bottom,
        play_left,
        play_right,
        play_top        
    },
    straw:{
        num:40,
    },
    wall:{
        num:50,
    },
    steels:{
        num:30
    },
    water:{
        num:20
    },
    tank:{
        num:6
    },
    boss:{
        num:1
    },
    play:{
        num:1
    },
    tankTimeout:20,
    bulletTimeout:100
    
}
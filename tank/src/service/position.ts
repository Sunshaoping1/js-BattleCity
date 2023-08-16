import config from "../config";

class Position {
    //存储 除坦克贴图外 所有贴图坐标的数组
    public coordinates:{x:number,y:number}[] = []
    //去掉重复的坐标，为所有贴图生成唯一的坐标
    public positionCoordinates(num:number){
        // 存储某一类贴图坐标的数组
        const collection:{x:number,y:number}[] = []
        
        for(let i=0;i<num;i++){
            
            while(true){
                const cood = this.position()
            
                //当数组this.coordinates长度为0时，直接返回fasle
                const result = this.coordinates.some(item=>item.x == cood.x && item.y == cood.y);

                if(!result){
                    collection.push(cood)
                    this.coordinates.push(cood)
                    break
                }
            }
        }

        // this.coordinates.push(...collection)

        return collection
        
    }

    //生成随机坐标
    protected position(){
        return {
            x: Math.floor(Math.random() * config.canvas.width/config.model.width) * config.model.width,
            y: Math.floor(Math.random() * (config.canvas.height/config.model.height - 6)) * config.model.height
            + config.model.height*2
        }
    }
}

export default new Position();
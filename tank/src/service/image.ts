import config from "../config"


export type T = keyof typeof config.images
export const image = new Map<T,HTMLImageElement>()


//使用promise异步加载图片
//返回promise项的数组
export const promises = Object.entries(config.images).map(([key,value])=>{
    return new Promise((resolve,reject)=>{
        const img = new Image()
        img.src = value
        img.onload = function(){
            image.set(key as T,img)
            
            resolve(img)
        }
        img.onerror = function(){
            reject(`${img} is not find`)
        }
    })
    
})

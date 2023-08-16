import { image } from "../service/image"

import Model from "./model"
export default class wall extends Model implements IModel {
    public life:number = 3

    getImg(): HTMLImageElement {
        return image.get("wall")!
    }
    //传递贴图
    render(): void {
        
        // const img = image.get("wall")!
        // super.renderImg(img)
    }
}


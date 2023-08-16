import { image } from "../service/image"

import Model from "./model"
export default class straw extends Model implements IModel {
    getImg(): HTMLImageElement {
        return image.get("straw")!
    }
    //传递贴图
    render(): void {
        
        // const img = image.get("straw")!
        // super.renderImg(img)

        
    }
}


import { image } from "../service/image"

import Model from "./model"
export default class water extends Model implements IModel {
    getImg(): HTMLImageElement {
        return image.get("water")!
    }
    //传递贴图
    render(): void {
        
        // const img = image.get("water")!
        // super.renderImg(img)
    }
}


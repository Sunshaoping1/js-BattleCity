import { image } from "../service/image"

import Model from "./model"
export default class steels extends Model implements IModel {
    getImg(): HTMLImageElement {
        return image.get("steels")!
    }
    //传递贴图
    render(): void {
        // const img = image.get("steels")!
        // super.renderImg(img)
    }

    
}


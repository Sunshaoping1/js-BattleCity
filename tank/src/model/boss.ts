import { image } from "../service/image"

import Model from "./model"
export default class boss extends Model implements IModel {
    public life:number = 6;
    getImg(): HTMLImageElement {
        return image.get("boss")!
    }
    //传递贴图
    render(): void {
        
        // const img = image.get("boss")!
        // super.renderImg(img)

        
    }
}


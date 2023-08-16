import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

class BlockBoard{
  constructor(
    public height:number = 300,
    public width:number = 500,
    private el = document.querySelector<HTMLCanvasElement>("#canvas")!,
    private ctx = el.getContext("2d")!,
    private btn:HTMLDivElement = document.createElement("div"),
    private bgc = "#000",
    private linec = "#fff"
  ){
    
    
    this.initCanvas()

    this.bindEvent()

    this.addDiv()
  }

  // canvas元素初始化
  private initCanvas(){
    this.el.width = this.width;
    this.el.height = this.height;

    this.ctx.fillStyle = this.bgc
    this.ctx.fillRect(0,0,this.el.width,this.el.height)

    
  }

  // 绑定鼠标相关事件
  private bindEvent(){
    const callback = this.drawLine.bind(this)

    this.el.addEventListener("mousedown",()=>{
      this.ctx.beginPath()
      this.el.addEventListener("mousemove",callback)

    })

    document.addEventListener("mouseup",()=>{
      this.el.removeEventListener("mousemove",callback)
    })
  }
  
  //绘制粉笔效果
  private drawLine(event:MouseEvent){
    this.ctx.strokeStyle = this.linec
    this.ctx.lineTo(event.offsetX,event.offsetY)
    this.ctx.stroke()
    
  }

  //添加canvas同级元素div
  private addDiv(){
    this.btn.id = "btn"
    this.btn.style.display = "flex"
    this.btn.style.margin = "10px "
    this.btn.style.alignItems = "center"
    this.btn.style.justifyContent = "space-between"
    this.el.after(this.btn)
  }

  

  //清屏
  public clear(){
    const button = document.createElement("button")
    button.innerHTML = "清屏"
    button.style.padding = "3px 10px"
    this.btn.append(button)

    button.addEventListener("click",()=>{
      
      //清屏效果
      this.ctx.fillStyle = this.bgc
      this.ctx.fillRect(0,0,this.el.width,this.el.height)
    })

    return this
    
  }

  //设置canvas画布的背景颜色
  public setBgColor(color:string){
    this.bgc = color
    return this
  }

  // 渲染粉笔颜色板
  public setLineColor(){
    const colors = ["#fff","#e74c3c","#f1c40f","#27ae60","#8e44ad"]

    const colorBoard = document.createElement("div");
    colorBoard.id = "bgcolor"
    colorBoard.style.display = "flex"
    for(let color of colors){
      colorBoard.innerHTML += `<div style="background-color:${color};width:50px;height:20px"></div>`
    }

    this.btn.append(colorBoard)
    this.CPLinecolor()

    return this
  }

  //点击选择粉笔颜色
  private CPLinecolor(){
    document.querySelector("#bgcolor")?.querySelectorAll("div")?.forEach(item=>{
      const tipText = item.style.backgroundColor;
      item.addEventListener("click",()=>{
        console.log(tipText)
        this.linec = tipText
        console.log("颜色复制成功")
      })
    })
  }

  //橡皮擦
  public erase(){
    const button = document.createElement("button")
    button.innerHTML = "橡皮"
    button.style.padding = "3px 10px"
    this.btn.prepend(button)

    button.addEventListener("click",()=>{
      
      //橡皮效果
      this.linec = this.bgc
      this.ctx.lineWidth = 30
    })

    return this
  }

  //写字
  public draw(){
    const button = document.createElement("button")
    button.innerHTML = "写字"
    button.style.padding = "3px 10px"
    this.btn.prepend(button)

    button.addEventListener("click",()=>{
      
      
      this.linec = "#fff"
      this.ctx.lineWidth = 1
    })

    return this
  }

  //画布截图
  public short(){
    const button = document.createElement("button")
    button.innerHTML = "截图"
    button.style.padding = "3px 10px"
    this.btn.prepend(button)

    const img = document.createElement("img");

    button.addEventListener("click",()=>{
      
      img.src = this.el.toDataURL("image/jpeg")
      img.classList.add("img-short")
    })
    this.btn.after(img)

    return this
  }
}

const instance = new BlockBoard()

instance.clear().short().setLineColor().draw().erase()
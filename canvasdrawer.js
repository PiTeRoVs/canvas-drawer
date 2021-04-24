class CanvasDrawer{
    constructor(node, width, height, style, params = {lineWidth: 2, lineCap: "round", strokeStyle: "black"}) {
        this.node = node;
        this.context = node.getContext('2d');
        this.node.width = width;
        this.node.height = height;
        this.node.style = style;
        this.drawing = false;
        this.node.addEventListener("pointerdown", this.penDown.bind(this));
        this.node.addEventListener("pointerout", this.penUp.bind(this));
        this.node.addEventListener("pointerup", this.penUp.bind(this));
        this.node.addEventListener("pointermove", this.draw.bind(this));
        this.context.lineWidth = params.lineWidth;
        this.context.lineCap = params.lineCap;
        this.context.strokeStyle = params.strokeStyle;
    }
    penDown(e){
        this.drawing = true;
        this.draw(e);
    }
    penUp(){
        this.drawing = false;
        this.context.beginPath();
    }
    draw(e){
        if(!this.drawing)
            return;
        this.context.lineTo(e.clientX, e.clientY);
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(e.clientX, e.clientY);
    }
    convertToImage(){
        this.img = this.node.toDataURL("image/png").replace("image/png", "image/octet-stream");
        return this;
    }
    downloadImage(){
        window.location.href = this.img;
    }
}
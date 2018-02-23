class RasterLayer extends Layer {
    constructor(name, width, height) {
        super(name, width, height)
    }
    render(ctx) {
        ctx.drawImage(this.layerCtx.canvas, 0, 0, this.width, this.height)
    }
}
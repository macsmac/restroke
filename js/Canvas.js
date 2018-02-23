class Canvas {
    constructor(layers, canvasElement, width, height) {
        this.layers = layers
        this.canvasElement = canvasElement
        this.width = width
        this.height = height
        this.scale = 1

        this.ctx = canvasElement.getContext('2d')
    }

    addScale(d) {
        this.scale *= d
    }
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height)

        for (let layer of this.layers) {
            layer.render(this.ctx)
        }
    }
}

// Helper

Canvas.createCtx = (width, height) => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    canvas.width  = width
    canvas.height = height 

    ctx.canvas = canvas

    return ctx
}

function rgba(r, g, b, a) {
    return `rgba(${r},${g},${b},${a})`
}

CanvasRenderingContext2D.prototype.line = function(startX, startY, endX, endY) {
    this.moveTo(startX, startY)
    this.lineTo(endX, endY)
    this.stroke()
}
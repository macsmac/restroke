class Layer extends EventEmitter {
    constructor(name, width, height) {
        super()

        this.name = name
        this.width = width
        this.height = height

        this.layerCtx = Canvas.createCtx(this.width, this.height)
    }
}
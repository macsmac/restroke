class Tool extends IntrestedObject {
    constructor(name, init, settings) {
        super()

        this.name = name
        this.init = init 
        this.settings = settings

        this.init(this)
    }
    applySettings(ctx) {
        for (let key in this.settings) {
            if (key in CanvasRenderingContext2D.prototype) 
                ctx[key] = this.settings[key]
        }
    }
}
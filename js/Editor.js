class Editor extends EventEmitter {
    constructor(canvasElement, width, height) {
        super()

        canvasElement.width = width
        canvasElement.height = height

        this.canvasElement = canvasElement
        this.width = width
        this.height = height
        
        this.DOMEventBus = new EventEmitter()

        this.layers = []
        this.tools  = []
        this.canvas = null

        this.currentLayer = null
        this.currentTool  = null
    }

    registerEvent(name) {
        this.canvasElement.addEventListener(name, (event) => {
            event.canvasX = event.layerX
            event.canvasY = event.layerY

            this.DOMEventBus.emit('event', event)
        })
    }
    init() {
        this.layers.push(new RasterLayer('Main layer', this.width, this.height))
        this.currentLayer = this.layers[0]

        this.canvas = new Canvas(this.layers, this.canvasElement, this.width, this.height)

        this.DOMEventBus.on('event', (event) => {
            // dispatch event to tools
            for (let tool of this.tools) {
                if (tool.intrested(event.type)) {
                    tool.emit(event.type, event)
                }
            }

            // dispatch event to objects
            if (this.currentLayer instanceof VectorLayer) {
                // TODO
            }

            this.emit(event.type, event)
        })

        this.registerEvent('mousemove')
        this.registerEvent('mouseup')
        this.registerEvent('mousedown')
        this.registerEvent('click')

        this.emit('init')
    }
    selectTool(name) {
        for (let tool of this.tools) {
            if (tool.name === name) {
                if (this.currentTool) {
                    this.currentLayer.layerCtx.restore()
                    this.currentTool.emit('toolUnselected')
                    this.emit('toolUnselected', tool)
                }

                this.currentLayer.layerCtx.save()
                this.currentTool = tool
                tool.emit('toolSelected')

                this.emit('toolSelected', tool)

                break
            }
        }
    }
}
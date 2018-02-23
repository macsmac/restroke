RestrokeEditor.tools.push(new Tool('rect', (self) => {
    self.on('toolSelected', () => {
        self.setIntrested(['mousemove', 'mousedown', 'mouseup'])
    })
    self.on('toolUnselected', () => {
        self.removeIntrested(['mousemove', 'mousedown', 'mouseup'])
    })

    let start = {}, end = {}

    function draw(ctx) {
        ctx.beginPath()

        self.applySettings(ctx)
        
        switch (self.settings.type) {
            case 'rect': 
                ctx.rect(start.x, start.y, end.w, end.h)
                break
            case 'ellipse':
                ctx.ellipse(
                    Math.min(start.x, end.x) + Math.abs(end.w / 2),
                    Math.min(start.y, end.y) + Math.abs(end.h / 2),
                    Math.abs(end.w / 2), Math.abs(end.h / 2), 
                    Math.PI * 180, 0, Math.PI * 2
                )
                break
        }

        ctx.stroke()
        ctx.fill()
        ctx.closePath()
    }

    self.on('mousedown', (event) => {
        start.x = event.canvasX
        start.y = event.canvasY
    })
    self.on('mousemove', (event) => {
        if (event.buttons === 1) {
            end.w = event.canvasX - start.x 
            end.h = event.canvasY - start.y
            end.x = event.canvasX
            end.y = event.canvasY

            let ctx = RestrokeEditor.canvas.ctx

            RestrokeEditor.canvas.render()

            ctx.save()

            ctx.strokeStyle = rgba(0, 0, 0, .5)
            ctx.lineWidth = 2
            ctx.setLineDash([5, 5])
            ctx.strokeRect(start.x, start.y, end.w, end.h)

            ctx.strokeStyle = rgba(0, 0, 0, .2)

            ctx.line(0, end.y, RestrokeEditor.currentLayer.width, end.y)
            ctx.line(end.x, 0, end.x, RestrokeEditor.currentLayer.height)

            ctx.restore()

            draw(ctx)
        }
    })
    self.on('mouseup', (event) => {
        draw(RestrokeEditor.currentLayer.layerCtx)
        RestrokeEditor.canvas.render()
    })
}, {
    lineWidth: 2,
    fillStyle: '#000',
    type: 'ellipse'
}))
RestrokeEditor.tools.push(new Tool('brush', (self) => {
    self.on('toolSelected', () => {
        self.setIntrested(['mousemove', 'mousedown', 'mouseup'])
    })
    self.on('toolUnselected', () => {
        self.removeIntrested(['mousemove', 'mousedown', 'mouseup'])
    })

    let points = []

    function draw(ctx) {
        ctx.beginPath()

        ctx.moveTo(points[0].x, points[0].y)

        self.applySettings(ctx)

        for (let point of points) {
            ctx.lineTo(point.x, point.y)
        }

        ctx.stroke()
        ctx.closePath()
    }

    self.on('mousedown', (event) => {
        points = []

        points.push({
            x: event.canvasX,
            y: event.canvasY
        })

        RestrokeEditor.canvas.render()
        draw(RestrokeEditor.canvas.ctx)
    })
    self.on('mousemove', (event) => {
        if (event.buttons === 1) {
            points.push({
                x: event.canvasX,
                y: event.canvasY
            })

            RestrokeEditor.canvas.render()
            draw(RestrokeEditor.canvas.ctx)
        }
    })
    self.on('mouseup', (event) => {
        points.push({
            x: event.canvasX,
            y: event.canvasY
        })

        draw(RestrokeEditor.currentLayer.layerCtx)
        RestrokeEditor.canvas.render()
    })
}, {
    lineWidth: 5,
    lineCap: 'round',
    lineJoin: 'round'
}))
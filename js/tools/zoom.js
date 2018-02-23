RestrokeEditor.tools.push(new Tool('zoom', (self) => {
    self.on('toolSelected', () => {
        self.setIntrested(['click'])
    })
    self.on('toolUnselected', () => {
        self.removeIntrested(['click'])
    })

    self.on('click', (event) => {
        if (event.button === 0) {
            RestrokeEditor.canvas.ctx.scale(1.2, 1.2)
            RestrokeEditor.canvas.addScale(1.2)
        } else if (event.button === 2) {
            RestrokeEditor.canvas.ctx.scale(0.6, 0.6)
            RestrokeEditor.canvas.addScale(0.6)
        }

        RestrokeEditor.canvas.render()
    })
}, {}))
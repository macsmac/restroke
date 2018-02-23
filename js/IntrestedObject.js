class IntrestedObject extends EventEmitter {
    constructor() {
        super()

        this._intrested = []
    }

    intrested(event) {
        return this._intrested.includes(event)
    }
    setIntrested(events) {
        if (!Array.isArray(events)) events = [events]

        for (let event of events) {
            if (!this.intrested(event)) 
                this._intrested.push(event)
        }
    }
    removeIntrested(events) {
        if (!Array.isArray(events)) events = [events]

        for (let event of events) {
            this._intrested.splice(this._intrested.indexOf(event), 1)
        }
    }
}
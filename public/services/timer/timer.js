class Timer {
    constructor() {
        this._time = 0;
    }
    stop() {
        clearInterval(this._interval);
        return this;
    }
    // resets timer
    reset() {
        this._time = 0;
        return this;
    }
    // continues timer from where it stopped
    start(cb) {
        this._interval = setInterval(() => {
            this._time += 1;
            cb === null || cb === void 0 ? void 0 : cb(this._time);
        }, 1000);
        return this;
    }
    get time() {
        return this._time;
    }
}
const timer = new Timer();
export { timer, Timer };

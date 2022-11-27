type OnTImerTickCb = (time: number) => void;

class Timer {
  private _interval?: number;
  private _time: number = 0;

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
  start(cb?: OnTImerTickCb) {
    this._interval = setInterval(() => {
      this._time += 1;
      cb?.(this._time);
    }, 1000);
    return this;
  }

  public get time() {
    return this._time;
  }
}

const timer = new Timer();

export { timer, Timer };

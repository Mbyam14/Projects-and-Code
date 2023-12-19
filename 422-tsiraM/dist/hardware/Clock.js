"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
const hardware_1 = require("./hardware");
class Clock extends hardware_1.Hardware {
    constructor(cpu, memory, interruptController) {
        super(0, "CLK", true);
        this.CLKListeners = [];
        this.setListeners(cpu);
        this.setListeners(memory);
        this.setListeners(interruptController);
    }
    /**
     * sets the listeners and adds them to storage
     */
    setListeners(listener) {
        this.CLKListeners.push(listener);
    }
    /**
     * Sends the pulse
     */
    sendpulse() {
        this.debuglog("clock pulse initialized");
        this.CLKListeners.forEach((listener) => listener.pulse());
    }
    /**
     * Initializes the clock
     */
    initClock(int) {
        let start = false;
        if (this.runningClock == null) {
            this.runningClock == setInterval(this.sendpulse.bind(this), int);
            start = true;
        }
        else {
            start = false;
        }
        return start;
    }
    /**
     * ends the clock
     */
    endClock() {
        clearInterval(this.runningClock);
        return true;
    }
}
exports.Clock = Clock;
//# sourceMappingURL=Clock.js.map
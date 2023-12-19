"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
// import statements for hardware
const Cpu_1 = require("./hardware/Cpu");
const Hardware_1 = require("./hardware/Hardware");
const Memory_1 = require("./hardware/Memory");
const Clock_1 = require("./hardware/Clock");
const MMU_1 = require("./hardware/MMU");
const InterruptController_1 = require("./hardware/InterruptController");
// Clock cycle interval
const CLOCK_INTERVAL = 200; // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
// A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
// .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
// small, I recommend a setting of 100, if you want to slow things down
// make it larger.
/*
    System Class is extension of Parent Hardware Class and handles Systems
*/
class System extends Hardware_1.Hardware {
    constructor() {
        super(0, "System", true);
        this._CPU = null;
        this._Memory = null;
        this._Clock = null;
        this._MMU = null;
        this._InterruptController = null;
        this.running = false;
        this._Memory = new Memory_1.Memory();
        this._MMU = new MMU_1.MMU(this._Memory);
        this._CPU = new Cpu_1.Cpu(this._MMU);
        this._InterruptController = new InterruptController_1.InterruptController(this._CPU);
        this._Clock = new Clock_1.Clock(this._CPU, this._Memory, this._InterruptController);
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */
        this.startSystem();
    }
    /**
     *  will call different system functions on start
     */
    startSystem() {
        this._Memory.initMemory();
        this._CPU.debuglog("Created");
        super.debuglog("Created");
        this._MMU.debuglog("Created");
        this._Clock.debuglog("Created");
        this._Clock.initClock(CLOCK_INTERVAL);
        this._MMU.WriteImmediate();
        // Hard Code Testers 
        // this._Memory.displayMemory(0x14);         
        // this._Memory.MemoryDump(0x0000,0x000F);
        // this._Memory.displayMemory(0x10000);
        this._CPU.cpuClockCount = 0;
        // Can pass through class or pass through start method
        //this._Clock.setListeners(this._Memory);
        //this._Clock.setListeners(this._CPU);
        return true;
    }
    stopSystem() {
        return false;
    }
}
exports.System = System;
let system = new System();
//# sourceMappingURL=System.js.map
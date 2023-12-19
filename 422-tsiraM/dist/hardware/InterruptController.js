"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterruptController = void 0;
const Hardware_1 = require("./Hardware");
class InterruptController extends Hardware_1.Hardware {
    constructor(cpu) {
        super(0, "IRC", true);
        this.irqHardware = [];
        this.irqRequests = [];
        this.cpu = cpu;
        this.interrupt = null;
    }
    /*
    *   Pulse Method
    */
    pulse() {
        this.debuglog("received clock pulse - Current Queue: " + this.irqRequests.length);
        this.Removequeue();
    }
    /*
    *  Adds Interrupt to the IRQ queue
    */
    addIrq(irqHardware) {
        irqHardware.irq = this.irqHardware.length; // sets the irq to the new index 
        this.irqHardware.push(irqHardware);
        this.debuglog("IRQ " + irqHardware.irq + " Assigned: " + irqHardware.name + " Priority: " + irqHardware.priority); // print confirmation
    }
    /*
    *   Accepts Interrupt and adds it to the queue
    */
    acceptInterrupt(interrupt) {
        this.irqRequests.push(interrupt);
        this.sortInterrupt(this.irqRequests); // will sort interrupts after pushing new one into the queue
    }
    /*
    * Goes through interrupts and uses a swap sort to organize
    */
    sortInterrupt(interrupt) {
        let instance;
        for (let i = 0; i < interrupt.length; i++) {
            for (let j = i; j > 0; j--) {
                if (interrupt[j].priority > interrupt[j - 1].priority) {
                    instance = interrupt[j - 1];
                    interrupt[j - 1] = interrupt[j];
                    interrupt[j] = instance;
                }
            }
        }
    }
    /*
    *   Removes Interrupt from queue
    */
    Removequeue() {
        this.irqRequests.shift();
    }
}
exports.InterruptController = InterruptController;
//# sourceMappingURL=InterruptController.js.map
import {Hardware} from "./Hardware";
import {Cpu} from "./Cpu";
import { Interrupt } from "./Imp/Interrupt";
import { ClockListener } from "./Imp/ClockListener";

export class InterruptController extends Hardware implements ClockListener {
    private irqHardware: Interrupt[];
    public irqRequests: Interrupt[];
    private cpu: Cpu;
    private interrupt: Interrupt;

    constructor(cpu: Cpu) {
        super(0, "IRC", true);
        this.irqHardware = [];
        this.irqRequests = [];
        this.cpu = cpu;
        this.interrupt = null;

    }

    /*
    *   Pulse Method 
    */
    pulse(): void {
        this.debuglog("received clock pulse - Current Queue: " + this.irqRequests.length);
        this.Removequeue();
    }

    /*
    *  Adds Interrupt to the IRQ queue
    */
    public addIrq(irqHardware: Interrupt) {
        irqHardware.irq = this.irqHardware.length; // sets the irq to the new index 
        this.irqHardware.push(irqHardware);
        this.debuglog("IRQ " + irqHardware.irq + " Assigned: " + irqHardware.name + " Priority: " + irqHardware.priority) // print confirmation
    } 

    /*
    *   Accepts Interrupt and adds it to the queue
    */
    public acceptInterrupt(interrupt: Interrupt) {
        this.irqRequests.push(interrupt);
        this.sortInterrupt(this.irqRequests);  // will sort interrupts after pushing new one into the queue
    }

    /*
    * Goes through interrupts and uses a swap sort to organize 
    */
    private sortInterrupt(interrupt: Interrupt[]){
            let instance : Interrupt;
            for (let i = 0 ; i<interrupt.length ; i++){
                for(let j = i ; j > 0 ; j--){
                    if(interrupt[j].priority > interrupt[j-1].priority){
                        instance = interrupt[j-1];
                        interrupt[j-1] = interrupt[j];
                        interrupt[j] = instance;
                }
            }
        }
    }
    /*
    *   Removes Interrupt from queue
    */
    public Removequeue(){
        this.irqRequests.shift();
    }
} 
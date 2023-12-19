import { Hardware } from "./hardware";
import { System } from "../System";
import { Cpu } from "./Cpu";
import { Memory } from "./Memory";
import { ClockListener } from "./Imp/ClockListener";
import { Interrupt } from "./Imp/Interrupt";
import { InterruptController } from "./InterruptController";

export class Clock extends Hardware{

    public runningClock : NodeJS.Timeout;
    private CLKListeners: object[];

    constructor(cpu: Cpu, memory: Memory, interruptController: InterruptController){
        super(0, "CLK", true);
        this.CLKListeners = [ ];

        this.setListeners(cpu);
        this.setListeners(memory);
        this.setListeners(interruptController);
    }

    /**
     * sets the listeners and adds them to storage
     */
    public setListeners(listener: object){
        this.CLKListeners.push(listener);
    }

    /**
     * Sends the pulse
     */
    public sendpulse(){
        this.debuglog("clock pulse initialized");
        this.CLKListeners.forEach((listener:ClockListener) => listener.pulse());
    }

    /**
     * Initializes the clock
     */
    public initClock(int: number) : boolean{
        let start: boolean = false;
        if(this.runningClock == null){
            this.runningClock == setInterval(this.sendpulse.bind(this), int)
            start = true;
        }
        else{
            start = false;
        }
        return start;
    }

    /**
     * ends the clock
     */
    public endClock() :boolean{
        clearInterval(this.runningClock);
        return true;
    }
}
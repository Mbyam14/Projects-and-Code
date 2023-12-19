// import statements for Hardware
import {System} from "../System";
import {Hardware} from "./hardware";
import {MMU} from "./mmu";
import {ClockListener} from "./Imp/ClockListener";

export class Memory extends Hardware implements ClockListener{
    private addMem: number[] = Array(0xFFFF); 
    private MAR: number = 0x0000;
    private MDR: number  = 0x00;

    constructor(){
        super(0, "RAM", true);
        this.debuglog("Created - Addressable Space : " + 0xFFFF)
    }
    
    /**
    * MDR & MAR getters and setters
    */
    public getMDR(): number {
         return this.MDR;
    }
    public setMDR(MDRVal: number){
        this.MDR = MDRVal;
    }
    public getMAR(): number{
        return this.MAR;
    }

    public setMAR(MARVal: number){
        this.MAR = MARVal;
    }

    /**
     * Read & Write Functions for MAR and MDR
     */
    public read(address:number):number {
        this.setMDR(this.addMem[address])
        return this.getMDR();
    }
    public write(address, data){
        this.MAR = address;
        this.MDR = data;
        this.addMem[this.MAR] = this.MDR;
    }

    /**
     * Reset method
     */
    public Reset(){
        this.MDR = 0x0000;
        this.MDR = 0x00;
        this.addMem = new Array(0xFFFF);
    }

    /**
     * Pulse method
     */
    public pulse() {
        this.debuglog("received clock pulse");
    }

    /**
     * initMemory is populating the memory array with 64k space and each spot is 0 in Hex
     */
    public initMemory() {
        //var addMem: number[] = Array(0x10000) // not sure if he wants it inside or outside function
        for(let i = 0x00; i < this.addMem.length; i++){
            this.addMem[i] = 0x00;
         }
    }

    /**
     * memDisplay: displays hexlog from 0x00 -> 0x14, error if >= 0x10000 or <= 0x0
     */
    public displayMemory(hexnum:number){
        if (hexnum > 0xFFFF){
            this.debuglog("Address : "+super.hexlog(hexnum,4)+" Contains: ERR [ Undefined position in array ]: number undefined");
        }
        else {
            for(let i = 0x00; i<hexnum; i++){
                super.hexlog(this.addMem[i],2);
                this.debuglog("Address : "+super.hexlog(i,4)+ " Contains: "+ super.hexlog(this.addMem[i],2))
            }
        }
    }

    /*
    * Memory Dump function prints out a range of memory addresses dertermined
    * by the numbers that are passed in
    */
    public MemoryDump(hexnum1:number, hexnum2:number){
        if (hexnum1 > 0xFFFF ){
            this.debuglog("Address : "+super.hexlog(hexnum1,4)+" Contains: ERR [ Undefined position in array ]: number undefined");
        }
        else {
            this.debuglog("Memory Dump: Debug");
            this.debuglog("-------------------");
            for(let i = hexnum1; i<hexnum2; i++){
                super.hexlog(this.addMem[i],2);
                this.debuglog("Addr "+super.hexlog(i,4)+ ":   | "+ super.hexlog(this.addMem[i],2))
            }
            this.debuglog("-------------------");
            this.debuglog("Memory Dump: Complete");
        }
    }
}


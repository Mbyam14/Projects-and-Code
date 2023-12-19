"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
const hardware_1 = require("./hardware");
class Memory extends hardware_1.Hardware {
    constructor() {
        super(0, "RAM", true);
        this.addMem = Array(0xFFFF);
        this.MAR = 0x0000;
        this.MDR = 0x00;
        this.debuglog("Created - Addressable Space : " + 0xFFFF);
    }
    /**
    * MDR & MAR getters and setters
    */
    getMDR() {
        return this.MDR;
    }
    setMDR(MDRVal) {
        this.MDR = MDRVal;
    }
    getMAR() {
        return this.MAR;
    }
    setMAR(MARVal) {
        this.MAR = MARVal;
    }
    /**
     * Read & Write Functions for MAR and MDR
     */
    read(address) {
        this.setMDR(this.addMem[address]);
        return this.getMDR();
    }
    write(address, data) {
        this.MAR = address;
        this.MDR = data;
        this.addMem[this.MAR] = this.MDR;
    }
    /**
     * Reset method
     */
    Reset() {
        this.MDR = 0x0000;
        this.MDR = 0x00;
        this.addMem = new Array(0xFFFF);
    }
    /**
     * Pulse method
     */
    pulse() {
        this.debuglog("received clock pulse");
    }
    /**
     * initMemory is populating the memory array with 64k space and each spot is 0 in Hex
     */
    initMemory() {
        //var addMem: number[] = Array(0x10000) // not sure if he wants it inside or outside function
        for (let i = 0x00; i < this.addMem.length; i++) {
            this.addMem[i] = 0x00;
        }
    }
    /**
     * memDisplay: displays hexlog from 0x00 -> 0x14, error if >= 0x10000 or <= 0x0
     */
    displayMemory(hexnum) {
        if (hexnum > 0xFFFF) {
            this.debuglog("Address : " + super.hexlog(hexnum, 4) + " Contains: ERR [ Undefined position in array ]: number undefined");
        }
        else {
            for (let i = 0x00; i < hexnum; i++) {
                super.hexlog(this.addMem[i], 2);
                this.debuglog("Address : " + super.hexlog(i, 4) + " Contains: " + super.hexlog(this.addMem[i], 2));
            }
        }
    }
    /*
    * Memory Dump function prints out a range of memory addresses dertermined
    * by the numbers that are passed in
    */
    MemoryDump(hexnum1, hexnum2) {
        if (hexnum1 > 0xFFFF) {
            this.debuglog("Address : " + super.hexlog(hexnum1, 4) + " Contains: ERR [ Undefined position in array ]: number undefined");
        }
        else {
            this.debuglog("Memory Dump: Debug");
            this.debuglog("-------------------");
            for (let i = hexnum1; i < hexnum2; i++) {
                super.hexlog(this.addMem[i], 2);
                this.debuglog("Addr " + super.hexlog(i, 4) + ":   | " + super.hexlog(this.addMem[i], 2));
            }
            this.debuglog("-------------------");
            this.debuglog("Memory Dump: Complete");
        }
    }
}
exports.Memory = Memory;
//# sourceMappingURL=Memory.js.map
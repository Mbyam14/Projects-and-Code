"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpu = void 0;
// import statements for Hardware
//import {System} from "../System";
const hardware_1 = require("./hardware");
const ASCII_1 = require("../ASCII");
/*
*   CPU Class is an extention of the parent Hardware class and handles the Cpu system
*/
class Cpu extends hardware_1.Hardware {
    constructor(Mmu) {
        super(0, "Cpu", true);
        this.cpuClockCount = 0x00;
        this.IR = 0x00;
        this.PC = 0x0000;
        this.Step = 0x00;
        this.Acc = 0x00;
        this.x = 0x00;
        this.y = 0x00;
        this.z = 0x00;
        this.FFsingle = null;
        this.interrupt = null;
        this.mmu = Mmu;
        this.ascii = new ASCII_1.ASCII();
    }
    /**
     * Pulse Method
     */
    pulse() {
        this.cpuClockCount++;
        this.debuglog("received clock pulse - CPU Clock Count: " + this.cpuClockCount);
        this.debuglog("CPU State | Mode: 0 PC: " + this.PC + " IR: " + this.hexlog(this.IR, 2) + " Acc: " + this.Acc + " xReg: " + this.x + " yReg: " + this.y + " zFlag: " + this.z + " Step: " + this.Step);
        /*
        * Switch Case architecture will determine which step the CPU will follow
        */
        switch (this.Step) {
            case 0x00: { // Fetch
                this.IR = this.mmu.ReadImmediate(this.PC); // reading data from PC counter memory address
                this.Step = 0x01;
                this.PC++;
                break;
            }
            case 0x01: { // decode 1
                if (this.IR == 0x8D) { // 
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.LowOrder(this.compare);
                    this.Step = 0x02;
                    this.PC++;
                }
                else if (this.IR == 0xAD) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.LowOrder(this.compare);
                    this.Step = 0x02;
                    this.PC++;
                }
                else if (this.IR == 0xA9) { // Done
                    this.Acc = this.mmu.ReadImmediate(this.PC);
                    this.Step = 0x06;
                }
                else if (this.IR == 0x8A) { // Done
                    this.Acc = this.x;
                    this.Step = 0x06;
                }
                else if (this.IR == 0x98) { // Done
                    this.Acc = this.y;
                    this.Step = 0x06;
                }
                else if (this.IR == 0x6D) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.LowOrder(this.compare);
                    this.Step = 0x02;
                    this.PC++;
                }
                else if (this.IR == 0xA2) { // Done
                    this.x = this.mmu.ReadImmediate(this.PC);
                    this.Step = 0x06;
                }
                else if (this.IR == 0xAE) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.LowOrder(this.compare);
                    this.Step = 0x02;
                    this.PC++;
                }
                else if (this.IR == 0xAA) { // Done
                    this.x = this.Acc;
                    this.Step = 0x06;
                }
                else if (this.IR == 0xA0) { // Done
                    this.y = this.mmu.ReadImmediate(this.PC);
                    this.Step = 0x06;
                }
                else if (this.IR == 0xAC) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.LowOrder(this.compare);
                    this.Step = 0x02;
                    this.PC++;
                }
                else if (this.IR == 0xA8) { // Done
                    this.y = this.Acc;
                    this.Step = 0x06;
                }
                else if (this.IR == 0xEA) { // Done
                    // No Operation
                    this.Step = 0x06;
                }
                else if (this.IR == 0x00) { // Done
                    process.exit();
                }
                else if (this.IR == 0xEC) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.LowOrder(this.compare);
                    this.Step = 0x02;
                    this.PC++;
                }
                else if (this.IR == 0xD0) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.Step = 0x03;
                }
                else if (this.IR == 0xEE) { // Done
                    var LOB = this.mmu.ReadImmediate(this.PC);
                    this.mmu.LowOrder(LOB);
                    this.Step = 0x02;
                    this.PC++;
                }
                else if (this.IR == 0xFF) {
                    if (this.x == 0x01) {
                        console.log("SYSTEM CALL 1");
                        console.log(this.y + "");
                        this.FFsingle = 0x01;
                        this.Step = 0x06;
                    }
                    else if (this.x == 2) {
                        console.log("SYSTEM CALL 2");
                        // TO BE CONSTRUCTED
                    }
                    else if (this.x == 3) { // 2 operands 
                        console.log("SYSTEM CALL 3");
                        this.compare = this.mmu.ReadImmediate(this.PC);
                        this.mmu.LowOrder(this.compare);
                        this.Step = 0x02;
                        this.PC++;
                    }
                    else {
                        console.log("Error===================");
                        this.Step = 0x00;
                        this.PC++;
                    }
                }
                break;
            }
            case 0x02: { // decode 2
                if (this.IR == 0x8D) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.HighOrder(this.compare);
                    this.Step = 0x03;
                }
                else if (this.IR == 0xAD) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.HighOrder(this.compare);
                    this.Step = 0x06;
                }
                else if (this.IR == 0x6D) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.HighOrder(this.compare);
                    this.Step = 0x03;
                }
                else if (this.IR == 0xAE) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.HighOrder(this.compare);
                    this.Step = 0x03;
                }
                else if (this.IR == 0xAC) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.HighOrder(this.compare);
                    this.Step = 0x03;
                }
                else if (this.IR == 0xEC) { // Done
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.HighOrder(this.compare);
                    this.Step = 0x03;
                }
                else if (this.IR == 0xEE) { // Done
                    var HOB = this.mmu.ReadImmediate(this.PC);
                    this.mmu.HighOrder(HOB);
                    this.Step = 0x03;
                }
                else if (this.IR = 0xFF) {
                    this.compare = this.mmu.ReadImmediate(this.PC);
                    this.mmu.HighOrder(this.compare);
                    this.Step = 0x03;
                }
                break;
            }
            case 0x03: { // execute 1
                if (this.IR == 0x8D) { // Done
                    this.compare = this.mmu.littleEndian();
                    this.mmu.Write(this.compare, this.Acc);
                    this.Step = 0x06;
                }
                else if (this.IR == 0xAD) { // Done
                    this.compare = this.mmu.littleEndian();
                    this.Acc = this.mmu.ReadImmediate(this.compare);
                    this.Step = 0x06;
                }
                else if (this.IR == 0x6D) { // Done
                    this.compare = this.mmu.littleEndian();
                    this.compare = this.mmu.ReadImmediate(this.compare);
                    this.Acc = this.Acc + this.compare;
                    this.carryFlag = 0x01;
                    this.Step = 0x06;
                }
                else if (this.IR == 0xAE) { // Done
                    this.compare = this.mmu.littleEndian();
                    this.x = this.mmu.ReadImmediate(this.compare);
                    this.Step = 0x06;
                }
                else if (this.IR == 0xAC) { // Done
                    this.compare = this.mmu.littleEndian();
                    this.y = this.mmu.ReadImmediate(this.compare);
                    this.Step = 0x06;
                }
                else if (this.IR == 0xEC) { // Done
                    if (this.compare == this.x) {
                        this.z = 0x00;
                    }
                    this.Step = 0x06;
                }
                else if (this.IR == 0xD0) { // Branching
                    if (this.z == 0x00) {
                        this.compare = this.mmu.ReadImmediate(this.PC);
                        if (this.compare < 0x80) { // if Positive
                            this.PC = this.PC + this.compare;
                        }
                        else { // if negative
                            this.PC = this.PC - ((~this.compare + 1) + 0x100);
                        }
                        if (this.PC > 0xFF || this.PC < 0xFF) {
                            this.PC - 0x100;
                        }
                    }
                    else {
                    }
                    this.Step = 0x06;
                }
                else if (this.IR == 0xEE) { // Done
                    this.compare = this.mmu.littleEndian();
                    this.Acc = this.mmu.ReadImmediate(this.compare);
                    this.Step = 0x04;
                }
                else if (this.IR == 0xFF) { // System call 3
                    this.compare = this.mmu.littleEndian();
                    var loop = false;
                    while (!loop) {
                        var data;
                        data = this.mmu.ReadImmediate(this.compare);
                        if (data != 0x00) {
                            var dataDecoded;
                            dataDecoded = this.ascii.decoding(data); // calls ascii utility library to decode hex
                            console.log(dataDecoded + "");
                            this.compare++;
                        }
                        else {
                            loop = true;
                            break;
                        }
                    }
                    this.Step = 0x06;
                }
                break;
            }
            case 0x04: { // execute 2
                if (this.IR == 0xEE) { // Done
                    this.Acc++;
                    this.Step = 0x05;
                }
                else if (this.IR == 0x6D) { // Done
                    this.Acc = this.Acc + this.carryFlag;
                    this.Step = 0x06;
                }
                break;
            }
            case 0x05: { // writeback 
                if (this.IR == 0xEE) { // Done
                    this.mmu.Write(this.compare, this.Acc);
                    this.Step = 0x06;
                }
                break;
            }
            case 0x06: { // interupt check
                if (this.interrupt) {
                    if (this.interrupt.outputBuffer.Length() != 0) {
                        // printing Interrupts the cpu can view
                        this.debuglog("CPU acting on Interrupt - IRQ: " + this.interrupt.irq + " from: " + this.interrupt.name);
                        this.debuglog("CPU Buffer contains: " + this.interrupt.outputBuffer.toString());
                    }
                    this.interrupt.outputBuffer.REMOVEqueue();
                }
                if (this.IR == 0x8A || this.IR == 0x98 || this.IR == 0xAA || this.IR == 0xA8 || this.IR == 0xEA) {
                    this.Step = 0x00;
                }
                else if (this.IR == 0xFF && this.FFsingle == 0x01) { // weeds out FF calls 1 & 2 with out operands
                    this.Step = 0x00;
                }
                else {
                    this.Step = 0x00;
                    this.PC++;
                }
                break;
            }
            default: {
                console.log("ERROR WRONG INSTRUCTION RECEIVED"); // Error Message if wrong instuction received
                break;
            }
        }
    }
}
exports.Cpu = Cpu;
//# sourceMappingURL=Cpu.js.map
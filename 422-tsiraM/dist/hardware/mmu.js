"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MMU = void 0;
const hardware_1 = require("./hardware");
class MMU extends hardware_1.Hardware {
    constructor(memory) {
        super(0, "MMU", true);
        this.HB = 0x00;
        this.LB = 0x00;
        this.Mem = memory;
        this.debuglog("Initalized Memory");
    }
    /**
     * Functon used to flash a program into Memory
     */
    WriteImmediate() {
        this.Mem.write(0x0000, 0xA9);
        this.Mem.write(0x0001, 0x00);
        this.Mem.write(0x0002, 0x8D);
        this.Mem.write(0x0003, 0x40);
        this.Mem.write(0x0004, 0x00);
        this.Mem.write(0x0005, 0xA9);
        this.Mem.write(0x0006, 0x01);
        this.Mem.write(0x0007, 0x8D);
        this.Mem.write(0x0008, 0x41);
        this.Mem.write(0x0009, 0x00);
        this.Mem.write(0x000A, 0xA9);
        this.Mem.write(0x000B, 0x06);
        this.Mem.write(0x000C, 0x8D);
        this.Mem.write(0x000D, 0x42);
        this.Mem.write(0x000E, 0x00);
        this.Mem.write(0x000F, 0xA0);
        this.Mem.write(0x0010, 0x00);
        this.Mem.write(0x0011, 0xA2);
        this.Mem.write(0x0012, 0x01);
        this.Mem.write(0x0013, 0xFF);
        this.Mem.write(0x0014, 0xA0);
        this.Mem.write(0x0015, 0x01);
        this.Mem.write(0x0016, 0xFF);
        this.Mem.write(0x0017, 0xA9);
        this.Mem.write(0x0018, 0x00);
        this.Mem.write(0x0019, 0xA2);
        this.Mem.write(0x001A, 0x01);
        this.Mem.write(0x001B, 0x6D);
        this.Mem.write(0x001C, 0x40);
        this.Mem.write(0x001D, 0x00);
        this.Mem.write(0x001E, 0x6D);
        this.Mem.write(0x001F, 0x41);
        this.Mem.write(0x0020, 0x00);
        this.Mem.write(0x0021, 0x8D);
        this.Mem.write(0x0022, 0x40);
        this.Mem.write(0x0023, 0x00);
        this.Mem.write(0x0024, 0xA8);
        this.Mem.write(0x0025, 0xFF);
        this.Mem.write(0x0026, 0x6D);
        this.Mem.write(0x0027, 0x41);
        this.Mem.write(0x0028, 0x00);
        this.Mem.write(0x0029, 0x8D);
        this.Mem.write(0x002A, 0x41);
        this.Mem.write(0x002B, 0x00);
        this.Mem.write(0x002C, 0xA8);
        this.Mem.write(0x002D, 0xFF);
        this.Mem.write(0x002E, 0xAA);
        this.Mem.write(0x002F, 0xEC);
        this.Mem.write(0x0030, 0x42);
        this.Mem.write(0x0031, 0x00);
        this.Mem.write(0x0032, 0xD0);
        this.Mem.write(0x0033, 0xE3);
        this.Mem.write(0x0034, 0x00);
        this.Mem.MemoryDump(0x0000, 0x001C);
        console.log("---------------------------");
        this.Mem.MemoryDump(0x0050, 0x0058);
    }
    // pulls data from passed address into memory
    ReadImmediate(address) {
        return this.Mem.read(address);
    }
    // write function that flashes address and data into memory
    Write(address, data) {
        this.Mem.setMDR(data);
        this.Mem.setMAR(address);
        this.Mem.write(address, data);
    }
    // Endian function that flips the high and low order bytes
    littleEndian() {
        return (this.HB << 8 | this.LB);
    }
    /**
     * This function will accept from memory and split the MAR into a high and low order bit
     *      Need to work on this for CPU lab
     */
    HighOrder(HOB) {
        this.HB = HOB.toString();
        return this.HB;
    }
    LowOrder(LOB) {
        this.LB = LOB;
        return this.LB;
    }
}
exports.MMU = MMU;
//# sourceMappingURL=mmu.js.map
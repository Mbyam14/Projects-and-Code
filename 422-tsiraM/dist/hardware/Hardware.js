"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hardware = void 0;
/*
    Hardware Class is the Parent/Super class
*/
class Hardware {
    // Parent constructor 
    constructor(theId, theName, theDebug) {
        this.debug = true; // default debug to true
        this.id = theId;
        this.name = theName;
        this.debug = theDebug;
    }
    /**
     * Log Function: prints Name, ID, and Date of the System with a message
     */
    debuglog(message) {
        if (this.debug) {
            console.log("[HW - " + this.name + " id: " + this.id + " - " + Date.now() + "]: " + message);
        }
    }
    /**
     * Hexlog function: converts number to hexadecimal
     */
    hexlog(num, numLength) {
        var hex = (num).toString(16).toUpperCase();
        while (hex.length < numLength) {
            hex = 0 + hex;
        }
        return hex;
    }
}
exports.Hardware = Hardware;
//# sourceMappingURL=hardware.js.map
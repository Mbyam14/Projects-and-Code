"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
/*
* Class to create a Queue
*/
class Queue {
    constructor() {
        this.queue = [];
    }
    // Basic Functions for editing queue
    Length() {
        return this.queue.length;
    }
    toString() {
        return this.queue.toString();
    }
    // Add to and Remove from queue functions
    ADDqueue(String) {
        this.queue.push(String);
    }
    REMOVEqueue() {
        let StrVal;
        if (this.queue.length == 0) {
            StrVal = "Empty";
        }
        else {
            StrVal = this.queue[0];
            for (let i = 0; i < this.queue.length; i++) {
                this.queue[i] = this.queue[i + 1];
            }
            this.queue.pop();
        }
        return StrVal;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Interrupt.js.map
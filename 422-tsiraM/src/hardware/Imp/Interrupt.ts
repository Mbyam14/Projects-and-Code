/**
 * Interrupt Interface 
 */
export interface Interrupt {
    irq : number;
    name: string;
    priority : Interrupt.Priority;
    inputBuffer: Queue;
    outputBuffer: Queue;
}

/*
* Namespace for the values assigned to each Priotity number
*/
export namespace Interrupt {
    export const enum Priority {
       LOW = -1,
       NORMAL = 0,
       HIGH = 1,
       URGERNT = 2
    }
}

/*
* Class to create a Queue
*/
export class Queue {
    private queue: string[];

    constructor() { 
        this.queue = [];
    }

    // Basic Functions for editing queue
    public Length(): number{
        return this.queue.length;
    }
    public toString(): string{
        return this.queue.toString();
    }

    // Add to and Remove from queue functions
    public ADDqueue(String: string){
        this.queue.push(String);
    }
    public REMOVEqueue(): String{
        let StrVal : string;
        if(this.queue.length == 0){
            StrVal = "Empty";
        }else{
            StrVal = this.queue[0];
            for( let i = 0; i < this.queue.length; i ++){
                this.queue[i] = this.queue[i + 1];
            }
            this.queue.pop();
        }
        return StrVal;
    }
}

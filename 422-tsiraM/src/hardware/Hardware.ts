/*
    Hardware Class is the Parent/Super class
*/
export class Hardware {
    id: number;
    name: string;
    debug: boolean = true;  // default debug to true

    // Parent constructor 
    constructor(theId, theName, theDebug) {
        this.id = theId;
        this.name = theName;
        this.debug = theDebug;
    }

    /**
     * Log Function: prints Name, ID, and Date of the System with a message
     */
    public debuglog(message: string){
        if(this.debug){   
            console.log("[HW - " + this.name + " id: " + this.id + " - " + Date.now() + "]: " + message);
        }
    }

    /**
     * Hexlog function: converts number to hexadecimal
     */
    public hexlog(num:number, numLength:number){
        var hex = (num).toString(16).toUpperCase();
        while (hex.length < numLength){
            hex = 0 + hex;
        }
        return hex;
    }
}

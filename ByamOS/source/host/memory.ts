// /*---------
//     memory.ts

//     Creation of Memory

// ----------*/

module TSOS{

    export class Memory{
        private MAR: number = 0x0000;
        private MDR: number  = 0x00;

        constructor(public Segment1 = new Array(_SegmentSize),
                    public Segment2 = new Array(_SegmentSize),
                    public Segment3 = new Array(_SegmentSize)){
            this.init();
        }

        // Creates Memory Core (aka fills array with 0x00)
        public init(){
            for (var i = 0; i < _SegmentSize; i++){  
                this.Segment1[i] = 0x00;
                this.Segment2[i] = 0x00;
                this.Segment3[i] = 0x00;
            }

            console.log("Segment1: " + this.Segment1);
            console.log("Segment2: " + this.Segment2);
            console.log("Segment3: " + this.Segment3);
        }
    }
} 
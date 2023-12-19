// /*---------
//     memory.ts
//     Creation of Memory
// ----------*/
var TSOS;
(function (TSOS) {
    class Memory {
        constructor(Segment1 = new Array(_SegmentSize), Segment2 = new Array(_SegmentSize), Segment3 = new Array(_SegmentSize)) {
            this.Segment1 = Segment1;
            this.Segment2 = Segment2;
            this.Segment3 = Segment3;
            this.MAR = 0x0000;
            this.MDR = 0x00;
            this.init();
        }
        // Creates Memory Core (aka fills array with 0x00)
        init() {
            for (var i = 0; i < _SegmentSize; i++) {
                this.Segment1[i] = 0x00;
                this.Segment2[i] = 0x00;
                this.Segment3[i] = 0x00;
            }
            console.log("Segment1: " + this.Segment1);
            console.log("Segment2: " + this.Segment2);
            console.log("Segment3: " + this.Segment3);
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map
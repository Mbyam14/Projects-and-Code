/*---------
    pcb.ts

    Creation of the Process Control Block

----------*/

module TSOS{
    export class PCB{
        public Pid;
        public PC;
        public IR;
        public Acc;
        public Xreg;
        public Yreg;
        public Zflag;
        public Segment;
        public state;
        public base;
        public limit;
        public cycles;
        public MemLocation;
        public progSize;

        constructor(Seg){
            _PID++;
            this.Pid = _PID;
            this.PC = 0;
            this.IR = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.Segment = Seg;
            this.state;
            this.base = _BaseReg;
            this.limit = _LimitReg;
            this.cycles = 0;
            this.MemLocation;
            this.progSize = 0;
        }
    }
}
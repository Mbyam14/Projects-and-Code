/* ------------
     CPU.ts

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module TSOS {

    export class Cpu {
        public cpuClockCount: number = 0x00;
        public mmu: MMU;
        //public interruptController: InterruptController;
        public IR;
        public PC;
        public Acc;
        public Xreg;
        public Yreg;
        public Zflag;
        public step;
        public isExecuting;
    
        constructor(PC = 0, IR = 0,Acc = 0, Xreg = 0, Yreg = 0, Zflag = 0, step = 0, isExecuting = false) {
            this.PC = PC;
            this.IR = IR;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.step = step;
            this.isExecuting = isExecuting;
        }
        init() {
            this.PC = 0x00;
            this.IR = 0x00;
            this.Acc = 0x00;
            this.Xreg = 0x00;
            this.Yreg = 0x00;
            this.Zflag = 0x00;
            this.step = 0x00;
            this.isExecuting = false;
        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.

            // if Round Robin is activated 
            if (_Scheduler.RoundRobin){
               _Scheduler.RRCheck();
            }

            // console.log("PROGRAM COUNTER: "+ this.PC);
            this.IR = _MemoryAccessor.readSpecificData(_CurrentSeg, this.PC);
            if ((this.Acc === "NAN") || (this.IR === "NAN") || (this.Xreg === "NAN") || (this.Yreg === "NAN") || (this.Zflag === "NAN")){
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(MEMORY_ACCESS_VIOLATION_IRQ, _CurrentPCB.Pid));
            }
            // console.log(_CurrentPCB);
            this.execute();

            // console.log("POST:    PC:" +this.PC + "| Acc: "+this.Acc+"| IR: "+this.IR+"| X: " +this.Xreg+"| Y: "+this.Yreg+"| Z: "+this.Zflag);
        }

        public execute(){
            _CurrentPCB.cycles++;
            console.log("PC:" +this.PC + "| Acc: "+this.Acc+"| IR: "+this.IR+"| X: " +this.Xreg+"| Y: "+this.Yreg+"| Z: "+this.Zflag+"| PID: "+_CurrentPCB.Pid);
            // console.log(_CurrentPCB);
            switch(this.IR){
                case "A9": {    // Load the Acc with a const
                    this.LoadAccWithConst();
                    break;
                }
                case "AD": {    // Load the Acc from Memory
                    this.LoadAccFromMem();
                   break;
                }
                case "8D": {    // Store the Acc in Memory
                    this.StoreAccInMem();
                    break;
                }
                case "6D": {    // Add with Carry
                    this.AddWithCarry();
                    break;
                }
                case "A2": {    // Load the X reg with a constant
                    this.LoadXWithConst();
                    break;
                }
                case "AE": {    // Load the X reg from Memory
                    this.LoadXFromMem();
                    break;
                }
                case "A0": {    // Load the Y reg with a constant
                    this.LoadYWithConst();
                    break;
                }
                case "AC": {    // Load the Y reg from Memory
                    this.LoadYFromMem();
                    break;
                }
                case "EA": {    // No Operation
                    this.PC++;
                    break;
                }
                case "00": {
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(END_PROG_IRQ, [_CurrentPCB.Pid, _CurrentSeg]));
                    break;
                }
                case "EC": {    // compare byte in memory to the X reg
                    this.CompareMemToX();
                    break;
                }
                case "D0": {    // Branch n bytes if Z flag = 0
                    this.Branch();
                    break;
                }
                case "EE": {    // increment the value of a byte
                    this.IncrementByte();
                    break;
                }
                case "FF": {    // System Call
                    this.SystemCall();
                    break;
                }
                default: {
                    _StdOut.putText(this.IR);
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(CONTEXT_SWITCH, []));
                    console.log("Hit Default");
                }
            }
        }

        public LoadAccWithConst(){
            // console.log("Hit A9 Function");
            this.PC++;
            this.IR = _MemoryAccessor.readSpecificData(_CurrentSeg, this.PC);
            this.Acc = this.IR;
            this.PC++;
           // console.log("ACC: " + this.Acc);
            //console.log("Finished Op Code A9");
        }

        public LoadAccFromMem(){
            // console.log("Hit AD Function");
            this.PC++;
            this.Acc= _MemoryAccessor.readSpecificData(_CurrentSeg, this.EndianSwap());
           // console.log(this.Acc);
            this.PC++;
           // console.log("ACC: " + this.Acc);
           // console.log("Finished Op Code AD");
        }

        public StoreAccInMem(){
            // console.log("HIT 8D Function");
            this.PC++;
            console.log("ACC: "+ this.Acc);
            _MemoryAccessor.writeSpecificData(this.Acc, _CurrentSeg, this.EndianSwap());
            this.PC++;
            //console.log("ACC: " + this.Acc);
           //console.log("Finished Op Code 8D");
        }

        public AddWithCarry(){
            // console.log("Hit Add w Carry");
            this.PC++;
            this.Acc = (this.Acc + _MemoryAccessor.readSpecificData(_CurrentSeg, this.EndianSwap()));
            this.PC++;
           // console.log("ACC: " + this.Acc);
            //console.log("Finished Add With Carry");
        }

        public LoadXWithConst(){
            // console.log("Hit A2 Function");
            this.PC++;
            this.IR = _MemoryAccessor.readSpecificData(_CurrentSeg, this.PC);
            this.Xreg = this.IR;
            this.PC++;
           // console.log("Xreg: " + this.Xreg);
            //console.log("Finished Op Code A2");
        }

        public LoadXFromMem(){
            // console.log("Hit AE Function");
            this.PC++;
            this.Xreg = _MemoryAccessor.readSpecificData(_CurrentSeg, this.EndianSwap());
           // console.log(this.Xreg);
            this.PC++;
           // console.log("Xreg: " + this.Xreg);
           // console.log("Finished Op Code AE");

        }

        public LoadYWithConst(){
            // console.log("Hit A0 Function");
            this.PC++;
            this.IR = _MemoryAccessor.readSpecificData(_CurrentSeg, this.PC);
            this.Yreg = this.IR;
            this.PC++;
            //console.log("Yreg: " + this.Yreg);
            //console.log("Finished Op Code A0");
        }

        public LoadYFromMem(){
            // console.log("Hit AC Function");
            this.PC++;
            this.Yreg= _MemoryAccessor.readSpecificData(_CurrentSeg, this.EndianSwap());
            //console.log(this.Yreg);
            this.PC++;
            //console.log("Yreg: " + this.Yreg);
            //console.log("Finished Op Code AC");
        }

        public CompareMemToX(){
            // console.log("Hit EC Function");
            this.PC++;
            let addr = this.EndianSwap();
            let data = _MemoryAccessor.readSpecificData(_CurrentSeg, addr)
            console.log("Xreg: "+this.Xreg+ " VS Addr: "+data);
            if(data === this.Xreg){
                this.Zflag = 0x01;
            }
            this.PC++;
        }

        public Branch(){
            this.PC++;
            if (this.Zflag === 0x00) {
                console.log("Current PC: " + this.PC);
                let distance = _MemoryAccessor.readSpecificData(_CurrentSeg, this.PC);
                console.log("Branch Dist: " + parseInt(distance,16));
                this.PC += parseInt(distance,16) + 1;
                if (this.PC > 0x100){
                    this.PC -= 0x100;
                }
                console.log("Branched " +parseInt(distance, 16)+ " bytes to " + this.PC);
            } else {
                this.PC++;
            }
        } 

        public IncrementByte(){
            // console.log("Hit EE Function");
            this.PC++;
            // console.log("DATA: "+_MemoryAccessor.readSpecificData(_CurrentSeg, this.PC));
            let addr = this.EndianSwap();
            let data = _MemoryAccessor.readSpecificData(_CurrentSeg, addr);
            data++;
            data = _Utils.hexlog(data, 2);
            _MemoryAccessor.writeSpecificData(data, _CurrentSeg, addr);
            this.PC++;
            //console.log("Address 40: "+_MemoryAccessor.readSpecificData(_CurrentSeg,addr));
        }

        public SystemCall(){
            // console.log("SYSTEM CALL");
            if(this.Xreg === "01"){
                // console.log("SYSTEM CALL _CurrentSeg!");
                //print out the integer store in the Yreg
                let ans = parseInt(this.Yreg, 16);
                _StdOut.putText("" + ans);
                _StdOut.advanceLine();
                _StdOut.putText(_OsShell.promptStr);
                // console.log("ANSWER: "+ans);
            }else if(this.Xreg === "02"){
                let res ="";
                let addr = parseInt(this.Yreg,16);
                for(let i = addr; i < _SegmentSize; i++){
                    if(_MemoryAccessor.readSpecificData(_CurrentSeg,i) == "00"){
                        break;
                    }
                    else{
                        res += String.fromCharCode(parseInt(_MemoryAccessor.readSpecificData(_CurrentSeg,i),16));
                    }
                }
                _StdOut.putText(res);
                _StdOut.advanceLine();
                _StdOut.putText(_OsShell.promptStr);
            }
            this.PC++;
        }

        public EndianSwap(){
            this.IR = _MemoryAccessor.readSpecificData(_CurrentSeg, this.PC);
            _MMU.LowOrder(this.IR);
            this.PC++;
            this.IR = _MemoryAccessor.readSpecificData(_CurrentSeg, this.PC);
            _MMU.HighOrder(this.IR);
            let addr = _MMU.littleEndian();
            let res = parseInt(addr, 16);
            // console.log("ADDR: " + res);
            return res;
        }

        public updateCurrentPCB(){
            _CurrentPCB.PC = this.PC;
            _CurrentPCB.IR = this.IR;
            _CurrentPCB.Acc = this.Acc;
            _CurrentPCB.Xreg = this.Xreg;
            _CurrentPCB.Yreg = this.Yreg;
            _CurrentPCB.Zflag = this.Zflag;
        }

        public updateCPUfromPCB(){
            this.PC = _CurrentPCB.PC;
            this.IR = _CurrentPCB.IR;
            this.Acc = _CurrentPCB.Acc;
            this.Xreg = _CurrentPCB.Xreg;
            this.Yreg = _CurrentPCB.Yreg;
            this.Zflag = _CurrentPCB.Zflag;
        }

        public resetRegisters(){
            this.PC = 0;
            this.IR = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.step = 0;
        }
    }
}    
/*---------
    mmu.ts

    Memory Management Unit, which controls most functions that involve memory access. Is the middle man between 
    _OsShell and _MemoryAccessor

----------*/

module TSOS{
    export class MMU{
        //properties
        public HB = 0x00;
        public LB = 0x00;
        
        constructor(){
        }

        // Creats a new program once verified
        //  - initalizes PCB, adds PCB to array, and outputs PID
        public AddNewProg(data, seg){
            _MemoryAccessor.writeData(data, seg); 
            _CurrentPCB = new PCB(seg);
            _Scheduler.residentList.push(_CurrentPCB);
            _Scheduler.AllPCB.push(_CurrentPCB);
            _CurrentPCB.state = "Ready";
            _CurrentPCB.MemLocation = "Memory";
            _CurrentPCB.progSize = data.length;
            _StdOut.advanceLine();
            _StdOut.putText("PID: " + _CurrentPCB.Pid );  
            console.log(_Scheduler.residentList);
        }

        // Creats a new program once verified
        //  - initalizes PCB, adds PCB to array, and outputs PID
        public AddNewProgToDisk(data){
            _CurrentPCB = new PCB(4);       // set all Memory segments to 4 while on Disk
            _krnDiskDriver.diskWriteData(data);
//TODO:  When bringing swap file from disk, change memory segment to file being swapped to disks memory segment
            _Scheduler.residentList.push(_CurrentPCB);
            _Scheduler.AllPCB.push(_CurrentPCB);
            _CurrentPCB.state = "Ready";
            _CurrentPCB.MemLocation = "Disk";
            _CurrentPCB.progSize = data.length;
            _StdOut.advanceLine();
            _StdOut.putText("PID: " + _CurrentPCB.Pid );

            // error checking
            console.log("ResidentList: ");  
            console.log(_Scheduler.residentList);
        }

        // sets PCB to current PCB
        public SetCurrentPCB(PID){
            _CurrentPCB = _Scheduler.residentList.find(PCB => PCB.Pid === PID);
        }

        // verifies if PCB exists or not in Resident List
        public verifyPCB(PID){
            let check = true;
            _CurrentPCB = _Scheduler.residentList.find(PCB => PCB.Pid === PID);
            // console.log(_CurrentPCB);
            if (typeof _CurrentPCB === 'undefined'){
                check = false;
            }
            return check;
        }

        // Checks to see if address is within memory base and limit registers
        public ValidMemoryAccess(MemAddress){
            if((MemAddress < _BaseReg) || (MemAddress >= _LimitReg)){
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(MEMORY_ACCESS_VIOLATION_IRQ, _CurrentPCB.Pid));
                return false;
            }else{
                return true;
            }

        }

        // Clears All Memory Segments
        public WipeMemory(){
            _MemoryAccessor.clearData(1);
            _MemoryAccessor.clearData(2);
            _MemoryAccessor.clearData(3);
        }

        // determines if a block of memory will need to be cleared
        // Hate having to use 3 seperate calls, will find a way to merge these into one function in the future, for now we will forfeit efficiency 
        public checkMemory1(){  // segment1
            let check = 0;
            let tr;
            for(let i = 0; i <= _SegmentSize;i++){
                if(_Memory.Segment1[i] === 0){
                    check++;
                }
            }
            if(check === _SegmentSize){
                tr = true;
            }else{
                tr = false;
            }
            return tr;
        }
        public checkMemory2(){  // segment2
            let check = 0;
            let tr;
            for(let i = 0; i <= _SegmentSize;i++){
                if(_Memory.Segment2[i] === 0){
                    check++;
                }
            }
            if(check === _SegmentSize){
                tr = true;
            }else{
                tr = false;
            }
            return tr;
        }
        public checkMemory3(){  // segment3
            let check = 0;
            let tr;
            for(let i = 0; i <= _SegmentSize;i++){
                if(_Memory.Segment3[i] === 0){
                    check++;
                }
            }
            if(check === _SegmentSize){
                tr = true;
            }else{
                tr = false;
            }
            return tr;
        }

         // Endian function that flips the high and low order bytes
        public littleEndian(){ 
            return(this.HB << 8 | this.LB).toString();
        }

        /**
         * This function will accept from memory and split the MAR into a high and low order bit
         */
        public HighOrder(HOB){
            this.HB = HOB.toString();
            return this.HB;
        }
        public LowOrder(LOB){
            this.LB = LOB.toString();
            return this.LB;
        }
    }
    
}
/* ------------
   Scheduler.ts
   ------------ */
var TSOS;
(function (TSOS) {
    class Scheduler {
        constructor(residentList = [], ready = [], RoundRobin = true, CurrentQueue = [], AllPCB = [], quantum = 6) {
            this.residentList = residentList;
            this.ready = ready;
            this.RoundRobin = RoundRobin;
            this.CurrentQueue = CurrentQueue;
            this.AllPCB = AllPCB;
            this.quantum = quantum;
        }
        endProcess(PID, SEG) {
            _SingleStep = false;
            _CurrentPCB.state = "Terminated";
            //update AllPCB 
            this.UpdateAllPCB();
            _Dispatcher.removeFromRLRQ(PID); // remove from Resident List
            _MemoryAccessor.clearData(SEG);
            _CPU.resetRegisters();
            if (this.ready.length === 0) {
                _CPU.isExecuting = false;
            }
        }
        // checks to see if context switch needs to occur
        RRCheck() {
            let truth;
            if (this.CurrentQueue.length > 1) {
                truth = true;
            }
            if ((_CurrentPCB.cycles >= this.quantum) && truth) {
                // Interrupt to change processes in CPU
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(CONTEXT_SWITCH, []));
            }
        }
        // updating AllPCB PCBS with current PCB  
        UpdateAllPCB() {
            _Scheduler.AllPCB[_CurrentPCB.Pid].state = _CurrentPCB.state;
            // console.log( _Scheduler.AllPCB[_CurrentPCB.Pid].state); 
            // IDK why this doesn't update outside of call, in PS some are showing up as ready when 
            //  they should be terminated
        }
    }
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=scheduler.js.map
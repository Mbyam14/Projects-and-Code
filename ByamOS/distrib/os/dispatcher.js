/* ------------
   Dispatcher.ts
   ------------ */
var TSOS;
(function (TSOS) {
    class Dispatcher {
        constructor() {
        }
        contextSwitch() {
            // console.log(_CurrentPCB);
            _CurrentPCB.state = "Ready";
            _CurrentPCB.cycles = 0;
            _CPU.updateCurrentPCB(); // --> Save CPU Registers to the PCB
            // reset context count everytime it loops through ready queue
            if (_ContextCount === _Scheduler.CurrentQueue.length) {
                _ContextCount = 0;
            }
            // pulling object from Resident Queue based on Ready Queue PID
            console.log("VALUE OF READY QUEUE @ CONTEXT COUNT INDEX: " + _Scheduler.CurrentQueue[_ContextCount]);
            let obj = _Scheduler.residentList.find(obj => obj.Pid === _Scheduler.CurrentQueue[_ContextCount]);
            // console.log(obj);
            // if the processes memory segment is 4 that means its on the Disk and needs to be swapped
            if (obj.Segment === 4) {
                this.swapProcess(obj); // hit swap
            }
            else {
                _CurrentPCB = obj; // set process as current PCB if already in Memory
            }
            console.log(_CurrentPCB);
            _CurrentSeg = _CurrentPCB.Segment;
            _CPU.updateCPUfromPCB();
            _CPU.isExecuting = true;
            _ContextCount++;
        }
        // Function Swaps most recently used process with next process that is stored on the disk
        swapProcess(obj) {
            // store memory segment so its not lost
            let memorySlot = _CurrentPCB.Segment;
            // save old process and add to disk memory
            _CurrentPCB.Segment = 4;
            _CurrentPCB.MemLocation = "Disk";
            _CPU.updateCurrentPCB();
            // console.log("SWAP PROCESS CHECK");
            // console.log("PC:" +_CPU.PC + "| Acc: "+_CPU.Acc+"| IR: "+_CPU.IR+"| X: " +_CPU.Xreg+"| Y: "+_CPU.Yreg+"| Z: "+_CPU.Zflag+"| PID: "+_CurrentPCB.Pid);
            _krnDiskDriver.diskWriteData(_MemoryAccessor.readData(memorySlot));
            // prep for new process coming from disk
            _MemoryAccessor.clearData(memorySlot);
            _CurrentPCB = obj;
            // call file from disk and add it to memory
            //.replace(/,/g,''); 
            // NEED TO find a way to remove ALL TRAILING ZEROS AFTER PROGRAM            TODO!!!
            let fileContent = _krnDiskDriver.readSwapFile("@" + _CurrentPCB.Pid);
            console.log("FILE FROM DISK ENTERING MEMORY");
            console.log(fileContent);
            fileContent.length = _CurrentPCB.progSize;
            _MemoryAccessor.writeData(fileContent, memorySlot);
            console.log("THIS IS THE DATA THAT WAS PUT IN MEMORY");
            console.log(_MemoryAccessor.readData(memorySlot));
            // update process and system
            _CurrentPCB.Segment = memorySlot;
            _CurrentPCB.MemLocation = "Memory";
            _CPU.updateCPUfromPCB();
            TSOS.Control.hostUpdateDisplayPCB();
            TSOS.Control.hostUpdateDisplayDisk();
            TSOS.Control.hostUpdateDisplayMemoryAll();
        }
        removeFromRLRQ(PID) {
            // remove PID that matches from ready queue
            for (let i = 0; i <= _Scheduler.ready.length; i++) {
                if (_Scheduler.ready[i] === PID) {
                    _Scheduler.ready.splice(i, 1);
                }
            }
            // remove object from resident list with PID that Matches
            _Scheduler.residentList.splice(_Scheduler.residentList.findIndex(item => item.Pid === PID), 1);
        }
        clearRLRQ() {
            // removes all objects / processes from both ready queue and resident list
            _Scheduler.residentList.splice(0, _Scheduler.residentList.length);
            _Scheduler.ready.splice(0, _Scheduler.ready.length);
        }
    }
    TSOS.Dispatcher = Dispatcher;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=dispatcher.js.map
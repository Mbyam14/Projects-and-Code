/* ------------
     Control.ts

     Routines for the hardware simulation, NOT for our client OS itself.
     These are static because we are never going to instantiate them, because they represent the hardware.
     In this manner, it's A LITTLE BIT like a hypervisor, in that the Document environment inside a browser
     is the "bare metal" (so to speak) for which we write code that hosts our client OS.
     But that analogy only goes so far, and the lines are blurred, because we are using TypeScript/JavaScript
     in both the host and client environments.

     This (and other host/simulation scripts) is the only place that we should see "web" code, such as
     DOM manipulation and event handling, and so on.  (Index.html is -- obviously -- the only place for markup.)

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

//
// Control Services
//
module TSOS {

    export class Control {

        public static hostInit(): void {
            // This is called from index.html's onLoad event via the onDocumentLoad function pointer.

            // Get a global reference to the canvas.  TODO: Should we move this stuff into a Display Device Driver?
            _Canvas = <HTMLCanvasElement>document.getElementById('display');

            // Get a global reference to the drawing context.
            _DrawingContext = _Canvas.getContext("2d");

            // Enable the added-in canvas text functions (see canvastext.ts for provenance and details).
            CanvasTextFunctions.enable(_DrawingContext);   // Text functionality is now built in to the HTML5 canvas. But this is old-school, and fun, so we'll keep it.

            // Clear the log text box.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("taHostLog")).value="";

            // Set focus on the start button.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("btnStartOS")).focus();

            // Check for our testing and enrichment core, which
            // may be referenced here (from index.html) as function Glados().
            if (typeof Glados === "function") {
                // function Glados() is here, so instantiate Her into
                // the global (and properly capitalized) _GLaDOS variable.
                _GLaDOS = new Glados();
                _GLaDOS.init();
            }
        }

        public static hostLog(msg: string, source: string = "?"): void {
            // Note the OS CLOCK.
            var clock: number = _OSclock;

            // Note the REAL clock in milliseconds since January 1, 1970.
            var now: number = new Date().getTime();

            // Build the log string.
            var str: string = "({ clock:" + clock + ", now:" + now  +  ", msg:" + msg + ", source:" + source +" })"  + "\n";

            // Update the log console.
            var taLog = <HTMLInputElement> document.getElementById("taHostLog");
            taLog.value = str + taLog.value;

            // TODO in the future: Optionally update a log database or some streaming service.
            (<HTMLInputElement> document.getElementById("dateTime")).innerHTML="Date & Time: " + Date();
        }


        //
        // Host Events
        //
        public static hostBtnStartOS_click(btn): void {
            // Disable the (passed-in) start button...
            btn.disabled = true;

            // .. enable the Halt and Reset buttons ...
            (<HTMLButtonElement>document.getElementById("btnHaltOS")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnReset")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnSSStart")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnSSEnd")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnSSAdvance")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnSegment1")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnSegment2")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnSegment3")).disabled = false;

            // .. set focus on the OS console display ...
            document.getElementById("display").focus();

            // ... Create and initialize the CPU (because it's part of the hardware)  ...
            _CPU = new Cpu();  // Note: We could simulate multi-core systems by instantiating more than one instance of the CPU here.
            _CPU.init();       //       There's more to do, like dealing with scheduling and such, but this would be a start. Pretty cool.
            _Utils = new Utils();
            _Disk = new TSOS.Disk();
            
            // Create Displays
            Control.hostCreateMemoryTable();

            // ... then set the host clock pulse ...
            _hardwareClockID = setInterval(Devices.hostClockPulse, CPU_CLOCK_INTERVAL);
            // .. and call the OS Kernel Bootstrap routine.
            _Kernel = new Kernel();
            _Kernel.krnBootstrap();  // _GLaDOS.afterStartup() will get called in there, if configured.
        }

        public static hostBtnHaltOS_click(btn): void {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");
            // Call the OS shutdown routine.
            _Kernel.krnShutdown();
            // Stop the interval that's simulating our clock pulse.
            clearInterval(_hardwareClockID);
            // TODO: Is there anything else we need to do here?
        }

        public static hostBtnReset_click(btn): void {
            // The easiest and most thorough way to do this is to reload (not refresh) the document.
            location.reload();
            // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
            // be reloaded from the server. If it is false or not specified the browser may reload the
            // page from its cache, which is not what we want.
        }

        // Turns on single step
        public static hostSingleStepOn_click(btn): void {
            _SingleStep = true;
            _StdOut.putText("Single Step Turned On, will automatically turned off at the end of program");
            _StdOut.advanceLine();
            _StdOut.putText(_OsShell.promptStr);
        }

        // Turns off single step
        public static hostSingleStepOff_click(btn): void {
            _SingleStep = false;
            _StdOut.putText("Single Step Turned Off");
            _StdOut.advanceLine();
            _StdOut.putText(_OsShell.promptStr);

        }

        // Displays Memory Segment 1
        public static hostBtnSeg1_click(btn): void {
            this.hostCreateMemoryTable();
            this.hostUpdateDisplayMemory1();
            _DisplaySeg = 1;
        }

        // Displays Memory Segment 2
        public static hostBtnSeg2_click(btn): void {
            this.hostCreateMemoryTable();
            this.hostUpdateDisplayMemory2();
            _DisplaySeg = 2;
        }

        // Displays Memory Segment 3
        public static hostBtnSeg3_click(btn): void {
            this.hostCreateMemoryTable();
            this.hostUpdateDisplayMemory3();
            _DisplaySeg = 3;
        }

        // Steps through program one cycle at a time
        public static hostAdvanceSingleStep_click(btn): void {
            _CPU.cycle();
        }

        // initially creating the Memory Display table
        public static hostCreateMemoryTable(){
            let elementId = document.getElementById("memoryDisplayTable");
            let data = "<table style = 'width: 100%;'><tbody>";
            for (var i = 0; i < _SegmentSize * 1; i++) {
                if ((i % 8) === 0) {
                    data += `<tr><td style = "font-weight: bold;">0x${_Utils.hexlog(i,3)}</td>`;
                }
                data += `<td id = "memoryCell${i}">00</td>`;
                if ((i % 8) === 7) {
                    data += "</tr>";
                }
            }
            data += "</tbody></table>";
            elementId.innerHTML = data;
        }

        // updates all Memory Display Segments at once
        public static hostUpdateDisplayMemoryAll(){
            this.hostUpdateDisplayMemory1();
            this.hostUpdateDisplayMemory2();
            this.hostUpdateDisplayMemory3();
        }

        // updates Memory Display table 1
        public static hostUpdateDisplayMemory1() {
            let mem = _MemoryAccessor.readData(1);
            for (let i = 0; i < mem.length; i++) {
                let element = document.getElementById("memoryCell" + i);
                element.innerHTML = _Utils.hexlog(mem[i], 2);
            }
        }

        // updates Memory Display table 2
        public static hostUpdateDisplayMemory2() {
            let mem = _MemoryAccessor.readData(2);
            for (let i = 0; i < mem.length; i++) {
                let element = document.getElementById("memoryCell" + i);
                element.innerHTML = _Utils.hexlog(mem[i], 2);
            }
        }

        // updates Memory Display table 3
        public static hostUpdateDisplayMemory3() {
            let mem = _MemoryAccessor.readData(3);
            for (let i = 0; i < mem.length; i++) {
                let element = document.getElementById("memoryCell" + i);
                element.innerHTML = _Utils.hexlog(mem[i], 2);
            }
        } 

        // updates CPU Display table
        public static hostUpdateDisplayCPU() {
            let element = document.getElementById("displayCPU");
            let data = "<table style='width: 50%; text-align: center;'>" +
                "<tbody><tr><th>PC</th><th>Acc</th><th>IR</th><th>Xreg</th><th>Yreg</th><th>Zflag</th></tr>" +
                "<tr><td>" + _Utils.hexlog(_CPU.PC, 2) + 
                "</td><td>" + _Utils.hexlog(_CPU.Acc, 2) + 
                "</td><td>" + _CPU.IR +
                "</td><td>" + _Utils.hexlog(_CPU.Xreg, 2) +
                "</td><td>" + _Utils.hexlog(_CPU.Yreg, 2) + 
                "</td><td>" + _Utils.hexlog(_CPU.Zflag, 2) + 
                "</td></tr></tbody></table>";
            element.innerHTML = data;
        }        

        // updates CPU Display table
        public static hostCPUisEmpty() {
            let element = document.getElementById("displayCPU");
            let data = "<table style='width: 50%; text-align: center;'>" +
                "<tbody><tr><th>PC</th><th>Acc</th><th>IR</th><th>Xreg</th><th>Yreg</th><th>Zflag</th></tr>" +
                "<tr><td> 00 " + 
                "</td><td> 00 " + 
                "</td><td> 00 " +
                "</td><td> 00 " +
                "</td><td> 00 " + 
                "</td><td> 00 " + 
                "</td></tr></tbody></table>";
            element.innerHTML = data;
        }        

        // Updates PCB Display 
        public static hostUpdateDisplayPCB() {
            let element = document.getElementById("displayPCB");
            let data = "<table style='width: 50%; text-align: center;'>" +
                "<tbody><tr><th>PID</th><th>PC</th><th>Acc</th><th>IR</th><th>X</th><th>Y</th><th>Z</th><th>State</th><th>Location</th></tr>" +
                "<tr><td>" + _Utils.hexlog(_CurrentPCB.Pid, 2) + 
                "</td><td>" + _Utils.hexlog(_CurrentPCB.PC, 2) +                 
                "</td><td>" + _Utils.hexlog(_CurrentPCB.Acc, 2) + 
                "</td><td>" + _CurrentPCB.IR +
                "</td><td>" + _Utils.hexlog(_CurrentPCB.Xreg, 2) +
                "</td><td>" + _Utils.hexlog(_CurrentPCB.Yreg, 2) + 
                "</td><td>" + _Utils.hexlog(_CurrentPCB.Zflag, 2) +
                "</td><td>" + _CurrentPCB.state +  
                "</td><td>" + _CurrentPCB.MemLocation + 
                "</td></tr></tbody></table>";
            element.innerHTML = data;
        }

        // sets PCB empty once Resident list is empty
        public static hostPCBisEmpty() {
            let element = document.getElementById("displayPCB");
            let data = "<table style='width: 50%; text-align: center;'>" +
                "<tbody><tr><th>PID</th><th>PC</th><th>Acc</th><th>IR</th><th>X</th><th>Y</th><th>Z</th><th>State</th></tr>" +
                "<tr><td colspan = 11> No Processes Currently in Execution </td></tr>" + 
                "</tbody></table>";
            element.innerHTML = data;
        }

        public static hostUpdateDisplayDisk() {
            let diskTable = document.getElementById("displayDisk");
            let tableBody = "<tbody>" +
                "<tr><th>TSB</th><th>Used</th><th>Next</th><th>Data</th></tr>"; // structure headers
            for (let t = 0; t < _Disk.tracks; t++) {
                for (let s = 0; s < _Disk.sectors; s++) {
                    for (let b = 0; b < _Disk.blocks; b++) {
                        let sessionData =  JSON.parse(sessionStorage.getItem(t + "" + s + "" + b));
                        // console.log("SESSION DATA" + sessionData);
                        let currentData = "";
                        for (let i = 4; i < sessionData.length; i++) {
                            currentData += (sessionData[i] + " ");
                        }
                        currentData.trim();
                        tableBody += "<tr>" +
                            `<td> ${t + '' + s + '' + b} </td>` +
                            `<td> ${sessionData[0]} </td>` +
                            `<td> ${sessionData[1] + '' + sessionData[2] + '' + sessionData[3]} </td>` +
                            `<td> ${currentData} </td>`+
                            `</tr>`;
                    }
                }
            }
            tableBody += "</tbody>";
            diskTable.innerHTML = tableBody;
        }
    }
}
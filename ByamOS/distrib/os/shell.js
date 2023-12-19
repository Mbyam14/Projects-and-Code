/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
var TSOS;
(function (TSOS) {
    class Shell {
        constructor() {
            // Properties
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        init() {
            var sc;
            // Load the command list.
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- 1.01");
            this.commandList[this.commandList.length] = sc;
            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            // date
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- displays the current date and time.");
            this.commandList[this.commandList.length] = sc;
            // whereami
            sc = new TSOS.ShellCommand(this.shellWhereami, "whereami", "- displays the users current location.");
            this.commandList[this.commandList.length] = sc;
            // Hogwarts House
            sc = new TSOS.ShellCommand(this.shellMyhouse, "myhouse", "- Determines your Hogwarts House.");
            this.commandList[this.commandList.length] = sc;
            // Load
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "- Load and Verify user entered program.");
            this.commandList[this.commandList.length] = sc;
            // BSOD
            sc = new TSOS.ShellCommand(this.shellBsod, "bsod", "- Displays the infamous Blue Screen of Death.");
            this.commandList[this.commandList.length] = sc;
            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            // Status <string>
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<string> - Sets the status.");
            this.commandList[this.commandList.length] = sc;
            // run <pid>
            sc = new TSOS.ShellCommand(this.shellRun, "run", "<pid> - Runs a specified program in memory.");
            this.commandList[this.commandList.length] = sc;
            // clearmem
            sc = new TSOS.ShellCommand(this.shellClearMem, "clearmem", "- Clears all memory partitions.");
            this.commandList[this.commandList.length] = sc;
            // runall
            sc = new TSOS.ShellCommand(this.shellRunAll, "runall", "- Runs all Processes at once.");
            this.commandList[this.commandList.length] = sc;
            // ps
            sc = new TSOS.ShellCommand(this.shellPs, "ps", "- Displays the PID and state of all processes.");
            this.commandList[this.commandList.length] = sc;
            // kill <pid>
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "<pid> - Kills process of specified <pid>.");
            this.commandList[this.commandList.length] = sc;
            // killall
            sc = new TSOS.ShellCommand(this.shellKillAll, "killall", "- Kills all Processes.");
            this.commandList[this.commandList.length] = sc;
            // quantum <int>
            sc = new TSOS.ShellCommand(this.shellQuantum, "quantum", "<int> - Sets the round robin quantum to <int>.");
            this.commandList[this.commandList.length] = sc;
            // FCFS
            sc = new TSOS.ShellCommand(this.shellFCFS, "fcfs", "- Sets the scheduler to First Come First Serve.");
            this.commandList[this.commandList.length] = sc;
            // Round Robin
            sc = new TSOS.ShellCommand(this.shellRoundRobin, "rr", "- Sets the scheduler to Round Robin with quantum of 6.");
            this.commandList[this.commandList.length] = sc;
            // format
            sc = new TSOS.ShellCommand(this.shellFormat, "format", "- Initalize all blocks in all sectors in all tracks.");
            this.commandList[this.commandList.length] = sc;
            // create <fn>
            sc = new TSOS.ShellCommand(this.shellCreate, "create", "<fn> - Create the file <fn>.");
            this.commandList[this.commandList.length] = sc;
            // read <fn>
            sc = new TSOS.ShellCommand(this.shellRead, "read", "<fn> - Read and display the contents of <fn>.");
            this.commandList[this.commandList.length] = sc;
            // write <fn> "data"
            sc = new TSOS.ShellCommand(this.shellWrite, "write", "<fn> \"data\" - Write the data inside the quotes to <fn>.");
            this.commandList[this.commandList.length] = sc;
            // delete <fn>
            sc = new TSOS.ShellCommand(this.shellDelete, "delete", "<fn> - Remove <fn> from storage.");
            this.commandList[this.commandList.length] = sc;
            // copy <existing fn> <new fn>
            sc = new TSOS.ShellCommand(this.shellCopy, "copy", "<existing fn> <new fn> - Copys data from <existing fn> to <new fn>.");
            this.commandList[this.commandList.length] = sc;
            // rename <existing fn> <new fn>
            sc = new TSOS.ShellCommand(this.shellRename, "rename", "<existing fn> <new fn> - Renames the <existing fn> to <new fn>.");
            this.commandList[this.commandList.length] = sc;
            // ls
            sc = new TSOS.ShellCommand(this.shellLs, "ls", "- List the files currently stored on the disk.");
            this.commandList[this.commandList.length] = sc;
            // Display the initial prompt.
            this.putPrompt();
        }
        putPrompt() {
            _StdOut.putText(this.promptStr);
        }
        handleInput(buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match. 
            // TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args); // Note that args is always supplied, though it might be empty.
            }
            else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) { // Check for curses.
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) { // Check for apologies.
                    this.execute(this.shellApology);
                }
                else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }
        // Note: args is an optional parameter, ergo the ? which allows TypeScript to understand that.
        execute(fn, args) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        }
        parseInput(buffer) {
            var retVal = new TSOS.UserCommand();
            // 1. Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);
            // 2. Lower-case it.    // need to set just first word to LC which is the command then leave everything else
            // buffer.split
            //buffer = buffer.toLowerCase();
            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");
            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift(); // Yes, you can do that to an array in JavaScript. See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = TSOS.Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;
            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }
        //
        // Shell Command Functions. Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, scumbag,");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of Tolland.");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }
        shellCurse() {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }
        shellApology() {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        }
        // Although args is unused in some of these functions, it is always provided in the 
        // actual parameter list when this function is called, so I feel like we need it.
        shellVer(args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }
        shellHelp(args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }
        shellDate(args) {
            _StdOut.putText(Date());
        }
        shellWhereami(args) {
            _StdOut.putText("You are in the Chamber of Secrets");
        }
        shellMyhouse(args) {
            var Houses;
            Houses = ["Gryfindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
            var num = Math.floor(Math.random() * 4);
            _StdOut.putText("You belong to " + Houses[num]);
        }
        shellLoad(args) {
            var input = document.getElementById("taProgramInput").value.trim();
            // determies if code is valid hex prog
            if (_Utils.isValidHex(input)) {
                // wrangling data into shape for memory
                input = input.toUpperCase().replace(/\s/g, '');
                var result = input.match(/.{1,2}/g);
                let truth1, truth2, truth3;
                let seg;
                // sets truth flag to determine if Memory segment needs to be cleared
                if (_PID >= -1) {
                    truth1 = _MMU.checkMemory1();
                    truth2 = _MMU.checkMemory2();
                    truth3 = _MMU.checkMemory3();
                }
                // evaluates last truth logic and sets memory segment to be loaded
                if (truth1) {
                    seg = 1;
                }
                else if (truth2) {
                    seg = 2;
                }
                else if (truth3) {
                    seg = 3;
                }
                // determines if memory is full
                if (truth1 === false && truth2 === false && truth3 === false) {
                    _MMU.AddNewProgToDisk(result);
                }
                else {
                    _MMU.AddNewProg(result, seg);
                }
                // console.log(_Memory.Segment1);
                // console.log(_Memory.Segment2);
                // console.log(_Memory.Segment3);
                console.log(_CurrentPCB);
            }
        }
        // Displays the Blue Screen of Death
        shellBsod(args) {
            _Console.BSOD();
        }
        shellShutdown(args) {
            _StdOut.putText("Shutting down...");
            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed. If possible. Not a high priority. (Damn OCD!)
        }
        shellCls(args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        }
        shellTrace(args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }
        shellRot13(args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }
        shellPrompt(args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }
        // Staus function - need to edit to allow capital letters
        shellStatus(args) {
            if (args.length > 0) {
                document.getElementById("status").innerText = "Status: " + args.join(' ');
            }
            else {
                _StdOut.putText("Usage: prompt <string> Please supply a string.");
            }
        }
        extractValue(arr, prop) {
            let extractedValue = [];
            for (let i = 0; i < arr.length; ++i) {
                // extract value from property
                extractedValue.push(arr[i][prop]);
            }
            return extractedValue;
        }
        // Run function - Runs program already in memeory
        shellRun(args) {
            if (args.length > 0) {
                let PID = parseInt(args[0]);
                let check = _MMU.verifyPCB(PID);
                if (check) {
                    _Scheduler.ready.push(PID);
                    _MMU.SetCurrentPCB(PID);
                    _CurrentSeg = _CurrentPCB.Segment;
                    _CPU.isExecuting = true;
                    // console.log(_Scheduler.ready);
                    // console.log(_CurrentPCB);
                }
                else {
                    _StdOut.putText("There is no Current Process with that PID, please enter a new one");
                }
            }
            else {
                _StdOut.putText("Please specify the PID of the program you wish to run");
            }
        }
        // Clear Memory Function
        shellClearMem(args) {
            _MMU.WipeMemory();
            _StdOut.putText("Memory Cleared");
            _StdOut.advanceLine();
        }
        // Run All Processes at once
        shellRunAll(args) {
            // add all programs in Resident List to ready queue
            let result = _Scheduler.residentList.map(a => a.Pid);
            for (let i = 0; i < result.length; i++) {
                _Scheduler.ready.push(result[i]);
                _Scheduler.CurrentQueue.push(result[i]);
            }
            console.log(_Scheduler.ready);
            // start Give CPU first process then let it run from there
            _ContextCount = 1;
            _MMU.SetCurrentPCB(_Scheduler.ready[0]);
            _CurrentSeg = _CurrentPCB.Segment;
            _CurrentPCB.state = "Executing";
            _CPU.isExecuting = true;
        }
        // PS Function displays PID and state of all processes
        shellPs(args) {
            for (let i = 0; i < _Scheduler.AllPCB.length; i++) {
                _StdOut.putText("PID: " + _Scheduler.AllPCB[i].Pid + " State: " + _Scheduler.AllPCB[i].state);
                _StdOut.advanceLine();
            }
        }
        // Kill Function will kill a specific process
        shellKill(args) {
            if (args.length > 0) {
                let PID = parseInt(args[0]);
                let check = _MMU.verifyPCB(PID);
                if (check) {
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(END_PROG_IRQ, [_CurrentPCB.Pid, _CurrentPCB.Segment]));
                    _StdOut.putText("Process " + PID + " has been killed...");
                    _StdOut.advanceLine();
                    _StdOut.putText("Dont let the Ministry of Magic find you, Murder is a life sentence in Azkaban");
                }
                else {
                    _StdOut.putText("There is no Current Process with that PID, please enter a new one");
                }
            }
            else {
                _StdOut.putText("Please Specify which Process you would like to kill by entering a PID");
            }
        }
        // Kill All Function kills all process
        shellKillAll(args) {
            _StdOut.putText("About to kill all active processes");
            _Dispatcher.clearRLRQ();
            _MMU.WipeMemory();
            _SingleStep = false;
            _CPU.isExecuting = false;
            _Scheduler.CurrentQueue = [];
            _StdOut.advanceLine();
            _StdOut.putText("All active processes have been killed, congrats you are now a mass murderer!");
        }
        // Quantum Function sets the Round Robin quantum value
        shellQuantum(args) {
            let num = parseInt(args[0]);
            if (num > 0) {
                _StdOut.putText("New quantum is " + num);
                _Scheduler.quantum = num;
            }
            else {
                _StdOut.putText("That is not a valid Quantum, please enter an int greater than 0.");
                _StdOut.advanceLine();
            }
        }
        // sets scheduler to use a FCFS algorithm
        shellFCFS(args) {
            _Scheduler.quantum = Math.max();
            _Scheduler.RoundRobin = false;
            // console.log(_Scheduler.quantum);
            _StdOut.putText("You switched to First Come First Serve scheduling");
            _StdOut.advanceLine();
        }
        // sets scheduler to use a FCFS algorithm
        shellRoundRobin(args) {
            _Scheduler.quantum = 6;
            _Scheduler.RoundRobin = true;
            // console.log(_Scheduler.quantum);
            _StdOut.putText("You switched to Round Robin scheduling and the quantum is 6.");
            _StdOut.advanceLine();
        }
        // TODO:    Reformat the structure of verifications for following commands based on needs of each
        //          -> (format, create, read, write, delete, copy, rename, ls)
        // Format Function
        shellFormat(args) {
            _krnDiskDriver.formatDisk();
        }
        // Create Function
        shellCreate(args) {
            if (_DiskFormatFlag) {
                if (args.length > 0) {
                    // if(args[0].charAt(0) === "@"){
                    // _StdOut.putText("File cannot begin with @");
                    // }
                    // else{
                    _krnDiskDriver.createFile(args[0]);
                    // }
                }
                else {
                    _StdOut.putText("Please enter a name for the file you want to create.");
                }
            }
            else {
                _StdOut.putText("Error, Disk has not yet been formatted.");
            }
        }
        // Read Function
        shellRead(args) {
            let fileContent;
            if (_DiskFormatFlag) {
                let fnHexArray = _krnDiskDriver.translateCharToHexArray(args[0]);
                let check = _krnDiskDriver.matchNameTSB(fnHexArray, "name");
                if (check !== null) {
                    fileContent = _krnDiskDriver.readFile(args[0]);
                    console.log(fileContent);
                    if (fileContent !== null) {
                        _StdOut.putText("File " + args[0] + " contains: " + fileContent);
                    }
                }
                else {
                    _StdOut.putText("This file does not exist, please create it before writting.");
                }
            }
            else {
                _StdOut.putText("Error, Disk has not yet been formatted.");
            }
        }
        // Write Function
        shellWrite(args) {
            if (_DiskFormatFlag) {
                let fnHexArray = _krnDiskDriver.translateCharToHexArray(args[0]);
                let check = _krnDiskDriver.matchNameTSB(fnHexArray, "name");
                if (check !== null) {
                    let data = "";
                    for (let i = 1; i < args.length; i++) {
                        data += args[i] + " ";
                    }
                    if (data[0] !== "\"" && data[data.length - 1] !== "\"") {
                        _StdOut.putText("Put quotes around the data you want to write");
                    }
                    else {
                        console.log(data);
                        data = data.replace(/['"]+/g, '').trim();
                        console.log(data);
                        _krnDiskDriver.writeFile(args[0], data);
                    }
                }
                else {
                    _StdOut.putText("This file does not exist, please create it before writting.");
                }
            }
            else {
                _StdOut.putText("Error, Disk has not yet been formatted.");
            }
        }
        // Delete Function
        shellDelete(args) {
            if (_DiskFormatFlag) {
                if (args.length > 0) {
                    _krnDiskDriver.deleteFile(args[0]);
                }
                else {
                    _StdOut.putText("Please enter a name for the file you want to delete.");
                }
            }
            else {
                _StdOut.putText("Error, Disk has not yet been formatted.");
            }
        }
        // Copy Function
        shellCopy(args) {
            if (_DiskFormatFlag) {
                if (args.length > 1) {
                    _krnDiskDriver.copyFile(args[0], args[1]);
                }
                else {
                    _StdOut.putText("Enter the filename you want to copy followed by the filename you want to copy into.");
                }
            }
            else {
                _StdOut.putText("Error, Disk has not yet been formatted.");
            }
        }
        // Rename Function
        shellRename(args) {
            if (_DiskFormatFlag) {
                if (args.length > 1) {
                    _krnDiskDriver.renameFile(args[0], args[1]);
                }
                else {
                    _StdOut.putText("Enter the filename followed by the new filename.");
                }
            }
            else {
                _StdOut.putText("Error, Disk has not yet been formatted.");
            }
        }
        // Ls Function
        shellLs(args) {
            _krnDiskDriver.listFiles();
        }
        // OS Manual
        shellMan(args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    case "ver":
                        _StdOut.putText("Displays the most current version of Byam OS.");
                        break;
                    case "shutdown":
                        _StdOut.putText("Shuts down the virtual OS but leaves the host & hardware still running.");
                        break;
                    case "cls":
                        _StdOut.putText("Clears the screen and resets the cursor position.");
                        break;
                    case "date":
                        _StdOut.putText("Displays the current date & time.");
                        break;
                    case "whereami":
                        _StdOut.putText("Tells you where you are.");
                        break;
                    case "myhouse":
                        _StdOut.putText("will read your soul and determine your Hogwarts house.");
                        break;
                    case "load":
                        _StdOut.putText("Load and verifies program from User Program Input.");
                        break;
                    case "bsod":
                        _StdOut.putText("Will Display Blue Screen of Death and shut down OS.");
                        break;
                    case "man":
                        _StdOut.putText("Displays mannual page for OS.");
                        break;
                    case "trace":
                        _StdOut.putText("Turns on the OS trace function.");
                        break;
                    case "rot13":
                        _StdOut.putText("Does rot13 obfuscation on String.");
                        break;
                    case "prompt":
                        _StdOut.putText("Sets the prompt.");
                        break;
                    case "status":
                        _StdOut.putText("Sets the status.");
                        break;
                    case "run":
                        _StdOut.putText("Runs specified program in memory");
                        break;
                    case "clearmem":
                        _StdOut.putText("Clears all memory partitions");
                        break;
                    case "runall":
                        _StdOut.putText("Execute all programs at once");
                        break;
                    case "ps":
                        _StdOut.putText("Display the PID and state of all processes");
                        break;
                    case "kill":
                        _StdOut.putText("Kill one process");
                        break;
                    case "killall":
                        _StdOut.putText("Kills all processes");
                        break;
                    case "quantum":
                        _StdOut.putText("Sets the round robin quantum");
                        break;
                    case "format":
                        _StdOut.putText("Initalize all blocks in all sectors in all tracks");
                        break;
                    case "create":
                        _StdOut.putText("Creates a file");
                        break;
                    case "read":
                        _StdOut.putText("Reads and displays the data from a file");
                        break;
                    case "write":
                        _StdOut.putText("Writes data to a file");
                        break;
                    case "delete":
                        _StdOut.putText("Deletes a file");
                        break;
                    case "copy":
                        _StdOut.putText("Copys the data from one file to another");
                        break;
                    case "rename":
                        _StdOut.putText("Renames a file");
                        break;
                    case "ls":
                        _StdOut.putText("Lists all the fiels currently stored on the disk");
                        break;
                    case "fcfs":
                        _StdOut.putText("Sets the scheduler to First Come First Serve");
                        break;
                    case "rr":
                        _StdOut.putText("Sets the scheduler to Round Robin with quantum of 6");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }
    }
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=shell.js.map
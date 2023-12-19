/* ----------------------------------
   DeviceDriverKeyboard.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

   module TSOS {

    export class DeviceDriverDisk extends TSOS.DeviceDriver {
        constructor() {
            // Override the base method pointers.
            // The code below cannot run because "this" can only be
            // accessed after calling super.
            // super(this.krnDiskDriverEntry, this.krnDiskDispatchKeyPress);
            // So instead...
            super();
            this.driverEntry = this.krnDiskDriverEntry;
        }
        krnDiskDriverEntry() {
            // Initialization routine for this, the kernel-mode Disk Device Driver.
            this.status = "loaded";
        }

        // Formats Disk Drive
        public formatDisk() {
            // Create an empty block array
            var emptyBlock = new Array(64);
            for (let i = 0; i < _FileLength; i++) {
                if (i < 4) {
                    emptyBlock[i] = 0;
                }
                else {
                    emptyBlock[i] = "-";
                }
            }
            // Assign each TSB with the empty block
            for (var t = 0; t < _Disk.tracks; t++) {
                for (var s = 0; s < _Disk.sectors; s++) {
                    for (var b = 0; b < _Disk.blocks; b++) {
                        sessionStorage.setItem(t + "" + s + "" + b, JSON.stringify(emptyBlock));
                    }
                }
            }
            // update Display and Format Flag
            _DiskFormatFlag = true;
            TSOS.Control.hostUpdateDisplayDisk();
            _StdOut.putText("Disk has been formatted!");
            _StdOut.advanceLine();
        }

        // Creates a new file on previously formatted Disk
        public createFile(fn){
            // console.log("Create File: " + fn);
// TODO:     Need to add a search for name to check if already exists then add conditional to code block
                let fileNameTSB = this.getNewNameTSB();
                let fileDataTSB = this.getNewDataTSB();
                let fileNameArray = JSON.parse(sessionStorage.getItem(fileNameTSB));
                let fileDataArray = JSON.parse(sessionStorage.getItem(fileDataTSB));

                // Set pages to in use
                fileNameArray[0] = "1";
                fileDataArray[0] = "1";
            
                // Set ~ to mark end of path
                fileDataArray[1] = "~";
                fileDataArray[2] = "~";
                fileDataArray[3] = "~";
                for (let i = 4; i < fileDataArray.length; i++){
                    fileDataArray[i] = "00";
                }
                // console.log(fileDataArray);
                // Make the data the next TSB in the name
                fileNameArray[1] = fileDataTSB[0];
                fileNameArray[2] = fileDataTSB[1];
                fileNameArray[3] = fileDataTSB[2];

                // Enter the file name into the nameTSB Data section
                for (let i = 0; i < fn.length; i++) {
                    fileNameArray[i + 4] = _Utils.decimalToHexString(fn.charCodeAt(i));
                }

                for (let i = fn.length+4; i < fileNameArray.length; i++){
                    fileNameArray[i] = "00";
                }
                // Save the arrays back into the session storage
                sessionStorage.setItem(fileNameTSB, JSON.stringify(fileNameArray));
                sessionStorage.setItem(fileDataTSB, JSON.stringify(fileDataArray));
                TSOS.Control.hostUpdateDisplayDisk();
                // _StdOut.putText("File " + fn +" has been created!");
                // _StdOut.advanceLine();
        }

        // Reads and Displays the contents of a file
        public readFile(fn){
            let fnHexArray = this.translateCharToHexArray(fn);
            let fileTSB = this.matchNameTSB(fnHexArray, "data");
            if (fileTSB !== null){
                // formating content into just the data in String array format // need to translate hex to words like list
                let fileContent = sessionStorage.getItem(fileTSB);  
                let ajustedContent = JSON.parse(fileContent);
                let finalContent = new Array(ajustedContent.length-4);
                for(let i=0; i < finalContent.length; i++){
                    finalContent[i] = ajustedContent[i+4];
                }
                console.log(finalContent);  
                let ans = this.translateHexArrayToChar(finalContent);          
                return ans;
            }
        }

        // reading swap files
        public readSwapFile(fn){
            let breakFlag = false;
            let fnHexArray = this.translateCharToHexArray(fn);
            let nextTSB = this.matchNameTSB(fnHexArray, "data");
            let totalContent = new Array();
            
            if (nextTSB !== null){
                while(breakFlag === false){ // recursion 
                    let fileContent = JSON.parse(sessionStorage.getItem(nextTSB));    
                    // console.log(totalContent);

                    if(fileContent[1] === "~"){
                        breakFlag = true;
                        fileContent = fileContent.slice(4);
                    }
                    else{
                        let nextTSBArray = new Array();
                        nextTSBArray.push(fileContent[1]);
                        nextTSBArray.push(fileContent[2]);
                        nextTSBArray.push(fileContent[3]);
                        nextTSB = nextTSBArray.join('');
                        fileContent = fileContent.slice(4);
                    }
                    totalContent = totalContent.concat(fileContent);
                }
            }
            console.log(totalContent);
            return totalContent;
        }

        public writeFile(fn, data){
            // console.log("FILENAME: " + fn);
            // console.log("DATA " + data);

            let fnHexArray = this.translateCharToHexArray(fn);
            let dataHexArray = this.translateCharToHexArray(data);

            let fileTSB = this.matchNameTSB(fnHexArray, "data");
           
            if (fileTSB !== null){
                let fileContent = JSON.parse(sessionStorage.getItem(fileTSB)); 
                for(var i = 0; i < _FileLength; i++){
                    if(i < dataHexArray.length){
                        fileContent[i+4] = dataHexArray[i];
                    }else{
                        fileContent[i+4] = "00";
                    }
                }
                sessionStorage.setItem(fileTSB, JSON.stringify(fileContent));
                TSOS.Control.hostUpdateDisplayDisk();
                _StdOut.putText("Successfully Written into file " + fn);
            }
        }

        public deleteFile(fn){
            let fnHexArray = this.translateCharToHexArray(fn);
            let fileTSB = this.matchNameTSBDELETE(fnHexArray);
            if (fileTSB !== null){
                let fileContent = JSON.parse(sessionStorage.getItem(fileTSB));   
            //  console.log(fileContent);               //--> something happening here wher last 4 places are left at 00,(Not critical just noticed it)
                for (var i = 0; i < _FileLength; i++) {
                if (i < 4) {
                    fileContent[i] = 0;
                }
                else {
                    fileContent[i] = "-";
                }
            }
            sessionStorage.setItem(fileTSB, JSON.stringify(fileContent));
            TSOS.Control.hostUpdateDisplayDisk();
            _StdOut.putText("File " + fn + " was deleted along with its data");
            _StdOut.advanceLine();
            }
        }

        public copyFile(copiedFN, copyToFN){
            let copiedHexArray = this.translateCharToHexArray(copiedFN); 
            let copyToHexArray = this.translateCharToHexArray(copyToFN);
            
            let copiedFileTSB = this.matchNameTSB(copiedHexArray, "data");
            let copyToFileTSB = this.matchNameTSB(copyToHexArray, "data");

            if (copiedFileTSB !== null && copyToFileTSB !== null){
                let copiedFileContent = JSON.parse(sessionStorage.getItem(copiedFileTSB));  // step 3
                let copyToFileContent = JSON.parse(sessionStorage.getItem(copyToFileTSB));

                for (var i = 0; i < _FileLength; i++) {    // step 4
                    if (i >= 4) {
                        copyToFileContent[i] = copiedFileContent[i];
                    }
                }
                sessionStorage.setItem(copyToFileTSB, JSON.stringify(copyToFileContent));
                TSOS.Control.hostUpdateDisplayDisk();
                _StdOut.putText("File " + copiedFN + " was copied into file " + copyToFN);
                _StdOut.advanceLine();
            }
            else{
                _StdOut.putText("One or more of the files do not exist");
            }
        }

        public renameFile(ogFN, newFN){
            // console.log(ogFN);
            // console.log(newFN);

            let ogHexArray = this.translateCharToHexArray(ogFN);
            let newHexArray = this.translateCharToHexArray(newFN);     
           
            // console.log(ogHexArray);
            // console.log(newHexArray);
            let fileTSB = this.matchNameTSB(ogHexArray, "name");
            // console.log(fileTSB);
            if (fileTSB !== null){ // -> verification if file exists
                let fileContent = JSON.parse(sessionStorage.getItem(fileTSB));             
                for (var i = 0; i < _FileLength; i++) {
                   if (i < newHexArray.length) {
                       fileContent[i+4] = newHexArray[i]
                   }
                   else {
                       fileContent[i+4] = "00";
                   }
               }
            //    console.log(fileContent);
               sessionStorage.setItem(fileTSB, JSON.stringify(fileContent));
               TSOS.Control.hostUpdateDisplayDisk();
               _StdOut.putText("File "+ ogFN +" was renamed to " + newFN);
               _StdOut.advanceLine();
            }
        }

        // Lists all non swap files
        public listFiles(){
            for (let s = 0; s < _Disk.sectors; s++) {
                for (let b = 0; b < _Disk.blocks; b++) {
                    let nameTSB = "0" + s + "" + b;
                    let dataArray = JSON.parse(sessionStorage.getItem(nameTSB));
                    // console.log(dataArray);
                    // console.log(dataArray[0]);
                    if (dataArray[0] === "1"){
                        let hexData = dataArray.slice(4);
                        let fileName = this.translateHexArrayToChar(hexData);
                        _StdOut.putText("--> " + fileName);
                        _StdOut.advanceLine();
                    }
                }
            }
        }

        // function translates unicode char name to a hex array
        public translateCharToHexArray(charName){
            let hexArray = new Array(charName.length).fill(null);     
            for (let i = 0; i < charName.length; i++) {
                hexArray[i] = _Utils.decimalToHexString(charName.charCodeAt(i));
            }
            return hexArray;
        }

        // function translates hex to unicode
        public translateHexArrayToChar(hexArray){
            // let hex = JSON.stringify(hexArray);
            // console.log(hex);
            let newStr = '';
            for (let i = 0; i < hexArray.length; i++){
                newStr += String.fromCharCode(parseInt(hexArray[i],16))
            }
            return newStr;
        }

        // called for Disk writting files/progs
        public diskWriteData(data){
            // console.log("FILENAME: " + fn);
            // console.log("DATA " + data);

            if(_DiskFormatFlag){
                let fn = "@"+ _CurrentPCB.Pid;
                this.createFile(fn.toString());
                if (data.length <= 60){
                    this.writeDiskSoloFile(fn, data);
                }
                else{
                    this.writeDiskMultiFile(fn, data);
                }
            }
            else{
                _StdOut.putText("Error, Disk has not yet been formatted.");
                _StdOut.advanceLine();
            }
        }

        public writeDiskMultiFile(fn, data){
            let breakflag = false;
            let fnHexArray = this.translateCharToHexArray(fn);
            let fileTSB = this.matchNameTSB(fnHexArray, "data");
            // console.log(fileTSB + " STARTING POINT");

            if (fileTSB !== null){
                data = this.quickConverterZero(data);       // set all data to a string from memory

                while(data.length > 60 && breakflag === false){
                    let fileContent = JSON.parse(sessionStorage.getItem(fileTSB)); // -> from starting point
                    let holderTSB = fileTSB; //-> accesspoint for get and set session storage
                    fileTSB = this.incrementTSB(fileTSB);
                    fileContent[0] = "1";
                    breakflag = this.checkRestProg(data);
                    if(breakflag){
                        fileContent[1] = "~";
                        fileContent[2] = "~";
                        fileContent[3] = "~";
                    } 
                    else{
                        fileContent[1] = fileTSB[0];
                        fileContent[2] = fileTSB[1];
                        fileContent[3] = fileTSB[2];
                    }
                    for(let i = 0; i < _FileLength; i++){
                        fileContent[i+4] = data[i];
                    }
                    // console.log(fileContent);
                    // console.log(fileTSB);
                    sessionStorage.setItem(holderTSB, JSON.stringify(fileContent));
                    data.splice(0,60);
                }
                TSOS.Control.hostUpdateDisplayDisk();
                // _StdOut.putText("Data was successfully Written into file " + fn);
                // _StdOut.advanceLine();
            }
        }

        // new write gets called for files that are loaded into memory but memory is already full and needs to pass data to Disk
        public writeDiskSoloFile(fn, data){
            // console.log("FILENAME: " + fn);
            // console.log("DATA " + data);

            let fnHexArray = this.translateCharToHexArray(fn);
            let fileTSB = this.matchNameTSB(fnHexArray, "data");
            
            if (fileTSB !== null){
                let fileContent = JSON.parse(sessionStorage.getItem(fileTSB)); 
                for(var i = 0; i < _FileLength; i++){
                    if(i < data.length){
                        fileContent[i+4] = data[i];
                    }else{
                        fileContent[i+4] = "00";
                    }
                }
                sessionStorage.setItem(fileTSB, JSON.stringify(fileContent));
                TSOS.Control.hostUpdateDisplayDisk();
                // _StdOut.putText("Data was successfully Written into file " + fn);
                // _StdOut.advanceLine();
            }
        }


        // returns file tsb for name and deletes data section
        public matchNameTSBDELETE(hexArray){
            for (let s = 0; s < _Disk.sectors; s++) {
                for (let b = 0; b < _Disk.blocks; b++) {
                    let correctCount = 0;       
                    let nameDataPointer = 4;    // where name data starts in array
                    let nameTSB = "0" + s + "" + b;
                    let dataArray = JSON.parse(sessionStorage.getItem(nameTSB));
                    for (let i = 0; i < hexArray.length; i++) {
                        if(hexArray[i] === dataArray[nameDataPointer]){
                            correctCount++;
                        }
                        nameDataPointer++;
                    }
                    if (correctCount === hexArray.length){
                        let dataTSB = dataArray[1] +""+ dataArray[2] +""+ dataArray[3];
                        for (var i = 0; i < _FileLength; i++) {
                            if (i < 4) {
                                dataArray[i] = 0;
                            }
                            else {
                                dataArray[i] = "-";
                            }
                        }
                        sessionStorage.setItem(nameTSB, JSON.stringify(dataArray));
                        return dataTSB;
                    }
                }
            }
            // console.log("Miss");
            return null;
        }

        // returns file tsb of file data if match is found, null otherwise
        // returns name data section(001-099) of file or data (100+) based on type param
        public matchNameTSB(hexArray, type){
            for (let s = 0; s < _Disk.sectors; s++) {
                for (let b = 0; b < _Disk.blocks; b++) {
                    let correctCount = 0;       
                    let nameDataPointer = 4;    // where name data starts in array
                    let nameTSB = "0" + s + "" + b;
                    let dataArray = JSON.parse(sessionStorage.getItem(nameTSB));
                    for (let i = 0; i < hexArray.length; i++) {
                        if(hexArray[i] === dataArray[nameDataPointer]){
                            correctCount++;
                        }
                        nameDataPointer++;
                    }
                    if(type === "data"){
                        if (correctCount === hexArray.length){
                            return dataArray[1] +""+ dataArray[2] +""+ dataArray[3];
                        }
                    }
                    else if(type === "name"){
                        if (correctCount === hexArray.length){
                            return nameTSB;
                        }
                    }
                }
            }
            return null;
        }

        // Looks for next available Name page under 100
        public getNewNameTSB() {
            for (let s = 0; s < _Disk.sectors; s++) {
                for (let b = 0; b < _Disk.blocks; b++) {
                    if(s === 0 && b === 0){ // avoid overwriting the MBR
                        b++;
                    }
                    let dataArray = JSON.parse(sessionStorage.getItem("0" + s + "" + b));
                    // console.log("DATA ARRAY FOR NAME: " + dataArray);
                    if (dataArray[0] === 0) {
                        // console.log("0" + s + "" + b);
                        return "0" + s + "" + b;
                    }
                }
            }
        }

        // Looks for next available Data page after 100
        public getNewDataTSB(){
            for (let t = 1; t < _Disk.tracks; t++) {
                for (let s = 0; s < _Disk.sectors; s++) {
                    for (let b = 0; b < _Disk.blocks; b++) {
                        let dataArray = JSON.parse(sessionStorage.getItem(t + "" + s + "" + b));
                        // console.log("DATA ARRAY FOR DATA:" + dataArray);
                        if (dataArray[0] === 0) {
                            // console.log(t+""+s+""+b);
                            return t + "" + s + "" + b;
                        }
                    }
                }
            }
        }

        // Mini help functions
        public checkRestProg(data){
            let count = 0;
            for(let i = 0; i < data.length;i++){
               if(data[i] === "00"){
                count++;
               } 
            }
            if(count === data.length){
                return true;
            }
            else{
                return false;
            }
        }
        public quickConverterZero(data){
            for(let i = 0; i < data.length; i++){
                if(data[i] === 0){
                    data[i] = "00";
                }
            }
            return data;
        }
        public incrementTSB(tsb){
            let test = parseInt(tsb);
            test++;
            tsb = test.toString();
            // console.log(tsb);
            return tsb;
        }
    }
}
/* ------------
     Console.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */
var TSOS;
(function (TSOS) {
    class Console {
        constructor(currentFont = _DefaultFontFamily, currentFontSize = _DefaultFontSize, currentXPosition = 0, currentYPosition = _DefaultFontSize, buffer = "") {
            this.currentFont = currentFont;
            this.currentFontSize = currentFontSize;
            this.currentXPosition = currentXPosition;
            this.currentYPosition = currentYPosition;
            this.buffer = buffer;
            this.commandHistory = [];
            this.commandIndex = 0;
            this.init();
        }
        init() {
            this.clearScreen();
            this.resetXY();
        }
        clearScreen() {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }
        resetXY() {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }
        handleInput() {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { // the Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    // ... and reset our buffer. (NOT SO FAST... need to add to commandhistory)
                    this.commandHistory.push(this.buffer);
                    this.commandIndex = this.commandHistory.length;
                    //console.log(this.buffer);
                    this.buffer = "";
                }
                // Backspace
                else if (chr === String.fromCharCode(8)) {
                    this.backspace();
                    // I added all to function to allow me to call this in arrows to cear the line
                    // if (this.buffer.length > 0){
                    //     var delChar = this.buffer[this.buffer.length - 1];
                    //     var XOffSet = _DrawingContext.measureText(this.currentFont, this.currentFontSize, delChar);
                    //     var YOffset = this.currentYPosition + _DefaultFontSize + 
                    //                                         _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                    //                                         _FontHeightMargin;
                    //     this.currentXPosition = this.currentXPosition - XOffSet;                                    
                    //     _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition - _DefaultFontSize, this.currentXPosition + XOffSet, YOffset);
                    //     this.buffer = this.buffer.slice(0, -1);
                    // }
                    // // else{
                    // //     _StdOut.putText("Error, you may not delete the line");
                    // //     this.advanceLine();
                    // // }
                }
                // Tab command completion
                else if (chr === String.fromCharCode(9)) {
                    if (this.buffer.length > 0) {
                        var match = [];
                        for (var i = 0; i < _OsShell.commandList.length; i++) {
                            if (this.buffer == _OsShell.commandList[i].command.substr(0, this.buffer.length)) {
                                match.push(_OsShell.commandList[i].command);
                            }
                        }
                        if (match.length === 0) {
                            _StdOut.putText("There are no Commands that begin with that");
                        }
                        else if (match.length === 1) {
                            this.buffer = match[0];
                            this.advanceLine();
                            _StdOut.putText(this.buffer);
                        }
                        else {
                            for (var index = 0; index < match.length; index++) {
                                this.advanceLine();
                                this.putText(match[index]);
                            }
                            this.advanceLine();
                            _StdOut.putText(this.buffer);
                        }
                    }
                }
                // Up arrow
                else if (chr === String.fromCharCode(38)) {
                    // console.log("UP")
                    if (this.commandIndex > 0) {
                        this.commandIndex -= 1;
                        // Need to clear the line
                        // console.log(this.buffer);
                        while (this.buffer != "") {
                            // console.log("TEST1")
                            this.backspace();
                        }
                        // console.log("Test2");
                        _StdOut.putText(this.commandHistory[this.commandIndex]);
                    }
                    else {
                        _StdOut.putText("End of command History");
                    }
                }
                // down arrow
                else if (chr === String.fromCharCode(40)) {
                    // console.log("DOWN");
                    if (this.commandIndex < this.commandHistory.length - 1) {
                        this.commandIndex += 1;
                        // Need to clear the line
                        while (this.buffer != "") {
                            this.backspace();
                        }
                        _StdOut.putText(this.commandHistory[this.commandIndex]);
                    }
                    else {
                        _StdOut.putText("I cannot predict your future commands, even with dark magic");
                    }
                }
                // Everything else
                else {
                    this.putText(chr);
                    this.buffer += chr;
                }
                // TODO: Add a case for Ctrl-C that would allow the user to break the current program.
            }
        }
        putText(text) {
            /*  My first inclination here was to write two functions: putChar() and putString().
                Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
                between the two. (Although TypeScript would. But we're compiling to JavaScipt anyway.)
                So rather than be like PHP and write two (or more) functions that
                do the same thing, thereby encouraging confusion and decreasing readability, I
                decided to write one function and use the term "text" to connote string or char.
            */
            if (text !== "") {
                // Approach for line wrap: break the input text int characters and determine if each char will
                // surpass the width of the canvas, if so then advanceLine and print, if not continue printing on line
                for (var i = 0; i < text.length; i++) {
                    var Linetxt = text.charAt(i);
                    var Xoffset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, Linetxt);
                    // check to see if character will surpass the width of the canvas
                    if (this.currentXPosition + Xoffset > _Canvas.width) {
                        this.advanceLine();
                    }
                    _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, Linetxt);
                    this.currentXPosition = this.currentXPosition + Xoffset;
                }
            }
        }
        // backspace function
        backspace() {
            // Approach for backspace: take the last char of the buffer & mesure the width to find the xoffset
            // add that to the Yoffset equation from advanceLine(), subtract xoffset from currentxPos and call clear rect now with all necessary inputs
            // finally remove the char from buffer.
            if (this.buffer.length > 0) {
                var delChar = this.buffer[this.buffer.length - 1];
                // console.log(delChar);
                var XOffSet = _DrawingContext.measureText(this.currentFont, this.currentFontSize, delChar);
                var YOffset = this.currentYPosition + _DefaultFontSize +
                    _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                    _FontHeightMargin;
                this.currentXPosition = this.currentXPosition - XOffSet;
                _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition - _DefaultFontSize, this.currentXPosition + XOffSet, YOffset);
                this.buffer = this.buffer.slice(0, -1);
            }
        }
        advanceLine() {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            this.currentYPosition += _DefaultFontSize +
                _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                _FontHeightMargin;
            // Scrolling
            if (this.currentYPosition > _Canvas.height) {
                // Determine cli line size and take screenshot of canvas - cli line size at top
                var CLILine = this.currentYPosition - _Canvas.height + _FontHeightMargin;
                var BMSnip = _DrawingContext.getImageData(0, 0, _Canvas.width, this.currentYPosition + _FontHeightMargin);
                this.clearScreen();
                // Past screenshot back into bitmap and drop curser to empty cli line
                _DrawingContext.putImageData(BMSnip, 0, -CLILine);
                this.currentYPosition -= CLILine;
            }
        }
        BSOD() {
            this.clearScreen();
            _DrawingContext.fillStyle = "blue";
            _DrawingContext.fillRect(0, 0, _Canvas.width, _Canvas.height);
            _DrawingContext.font = '50px serif';
            _DrawingContext.strokeText("Avada Kedavra", 80, 250);
            _Kernel.krnShutdown();
        }
    }
    TSOS.Console = Console;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=console.js.map
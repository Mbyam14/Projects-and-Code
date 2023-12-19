/* --------
   Utils.ts

   Utility functions.
   -------- */

module TSOS {

    export class Utils {

        public static trim(str): string {
            // Use a regular expression to remove leading and trailing spaces.
            return str.replace(/^\s+ | \s+$/g, "");
            /*
            Huh? WTF? Okay... take a breath. Here we go:
            - The "|" separates this into two expressions, as in A or B.
            - "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
            - "\s+$" is the same thing, but at the end of the string.
            - "g" makes is global, so we get all the whitespace.
            - "" is nothing, which is what we replace the whitespace with.
            */
        }

        public static rot13(str: string): string {
            /*
               This is an easy-to understand implementation of the famous and common Rot13 obfuscator.
               You can do this in three lines with a complex regular expression, but I'd have
               trouble explaining it in the future.  There's a lot to be said for obvious code.
            */
            var retVal: string = "";
            for (var i in <any>str) {    // We need to cast the string to any for use in the for...in construct.
                var ch: string = str[i];
                var code: number = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(Number(i)) + 13;  // It's okay to use 13.  It's not a magic number, it's called rot13.
                    retVal = retVal + String.fromCharCode(code);
                } else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(Number(i)) - 13;  // It's okay to use 13.  See above.
                    retVal = retVal + String.fromCharCode(code);
                } else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        }

        public decimalToHexString(num){
            let StringHex = num.toString(16);
            return StringHex;
        }

        // Memory is held as string, this will be called whenever data needs to be displayed or changed to hex format
        public StringtoHex(str){
            let num = parseInt(str, 16);
            let res = this.hexlog(num, 2);
            return res;
        }
        public hexlog(num:number, numLength:number){
            var hex = (num).toString(16).toUpperCase();
            while (hex.length < numLength){
                hex = 0 + hex;
            }
            return hex;
        }

        // Used to validate if User prog input is a valid hex program or not 
        public isValidHex(args) {
            var regExp = new RegExp("[0-9A-Fa-f \n]", "g"); // utilize regex to select all hex values
            var matches = args.match(regExp);
            if (args.length === 0) {
                _StdOut.putText("Error no Program Found");
                return false;
            }
            else if (matches !== null && args.length === matches.length) {
                _StdOut.putText("Valid Hex Program");
                return true;
            }
            else {
                _StdOut.putText("Error, Invalid Hex Program");
                return false;
            }
        }
    }
}

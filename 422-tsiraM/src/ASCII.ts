
export class ASCII {
    constructor() {
    }
    // decodes hex to string
    public decoding(hex : number) : string{
        switch (hex) {
            case 0x0A : {
                return "\n";
                break;
            }
            case 0x20 : {
                return " ";
                break;
            }
            case 0x21 : {
                return "!";
                break;
            }
            case 0x23 : {
                return "#";
                break;
            }
            case 0x24 : {
                return "$";
                break;
            }
            case 0x25 : {
                return "%";
                break;
            }

            case 0x26 : {
                return "&";
                break;
            }
            case 0x27 : {
                return "'";
                break;
            }
            case 0x28 : {
                return "(";
                break;
            }
            case 0x29 : {
                return ")";
                break;
            }
            case 0x2A : {
                return "*";
                break;
            }
            case 0x2B : {
                return "+";
                break;
            }
            case 0x2C : {
                return ",";
                break;
            }
            case 0x2D : {
                return "-";
                break;
            }
            case 0x2E : {
                return ".";
                break;
            }
            case 0x2F : {
                return "/";
                break;
            }
            case 0x30 : {
                return "0";
                break;
            }
            case 0x31 : {
                return "1";
                break;
            }
            case 0x32 : {
                return "2";
                break;
            }
            case 0x33 : {
                return "3";
                break;
            }
            case 0x34 : {
                return "4";
                break;
            }
            case 0x35 : {
                return "5";
                break;
            }
            case 0x36 : {
                return "6";
                break;
            }
            case 0x37 : {
                return "7";
                break;
            }
            case 0x38 : {
                return "8";
                break;
            }
            case 0x39 : {
                return "9";
                break;
            }
            case 0x3A : {
                return ":";
                break;
            }
            case 0x3B : {
                return ";";
                break;
            }
            case 0x3C : {
                return "<";
                break;
            }
            case 0x3D : {
                return "=";
                break;
            }
            case 0x3E : {
                return ">";
                break;
            }
            case 0x3F : {
                return "?";
                break;
            }
            case 0x40 : {
                return "@";
                break;
            }
            case 0x41 : {
                return "A";
                break;
            }
            case 0x42 : {
                return "B";
                break;
            }
            case 43 : {
                return "C";
                break;
            }
            case 0x44 : {
                return "D";
                break;
            }
            case 0x45 : {
                return "E";
                break;
            }
            case 0x46 : {
                return "F";
                break;
            }
            case 0x47 : {
                return "G";
                break;
            }
            case 0x48 : {
                return "H";
                break;
            }
            case 0x49 : {
                return "I";
                break;
            }
            case 0x4A : {
                return "J";
                break;
            }
            case 0x4B : {
                return "K";
                break;
            }
            case 0x4C : {
                return "L";
                break;
            }
            case 0x4D : {
                return "M";
                break;
            }
            case 0x4E : {
                return "N";
                break;
            }
            case 0x4F : {
                return "O";
                break;
            }
            case 0x50 : {
                return "P";
                break;
            }
            case 0x51 : {
                return "Q";
                break;
            }
            case 0x52 : {
                return "R";
                break;
            }
            case 0x53 : {
                return "S";
                break;
            }
            case 0x54 : {
                return "T";
                break;
            }
            case 0x55 : {
                return "U";
                break;
            }
            case 0x56 : {
                return "V";
                break;
            }
            case 0x57 : {
                return "W";
                break;
            }
            case 0x58 : {
                return "X";
                break;
            }
            case 0x59 : {
                return "Y";
                break;
            }
            case 0x5A : {
                return "Z";
                break;
            }
            case 0x5B : {
                return "[";
                break;
            }
            case 0x5C : {
                return "\\";
                break;
            }
            case 0x5D : {
                return "]";
                break;
            }
            case 0x5E : {
                return "^";
                break;
            }
            case 0x5F : {
                return "_";
                break;
            }
            case 0x61 : {
                return "a";
                break;
            }
            case 0x62 : {
                return "b";
                break;
            }
            case 0x63 : {
                return "c";
                break;
            }
            case 0x64 : {
                return "d";
                break;
            }
            case 0x65 : {
                return "e";
                break;
            }
            case 0x66 : {
                return "f";
                break;
            }
            case 0x67 : {
                return "g";
                break;
            }
            case 0x68 : {
                return "h";
                break;
            }
            case 0x69 : {
                return "i";
                break;
            }
            case 0x6A : {
                return "j";
                break;
            }
            case 0x6B : {
                return "k";
                break;
            }
            case 0x6C : {
                return "l";
                break;
            }
            case 0x6D : {
                return "m";
                break;
            }
            case 0x6E : {
                return "n";
                break;
            }
            case 0x6F : {
                return "o";
                break;
            }
            case 0x70 : {
                return "p";
                break;
            }
            case 0x71 : {
                return "q";
                break;
            }
            case 0x72 : {
                return "r";
                break;
            }
            case 0x73 : {
                return "s";
                break;
            }
            case 0x74 : {
                return "t";
                break;
            }
            case 0x75 : {
                return "u";
                break;
            }
            case 0x76 : {
                return "v";
                break;
            }
            case 0x77 : {
                return "w";
                break;
            }
            case 0x78 : {
                return "x";
                break;
            }
            case 0x79 : {
                return "y";
                break;
            }
            case 0x7A : {
                return "z";
                break;
            }
            case 0x7B : {
                return "{";
                break;
            }
            case 0x7C : {
                return "|";
                break;
            }
            case 0x7D : {
                return "}";
                break;
            }
            case 0x7E : {
                return "~";
                break;
            }
            default: {
                return "Error, Did not Match ASCII";
                break;
            }
        }
    }
// encodes string to hex
    public encoding(char : string) : number{

        switch (char) {
            case "\n" : {
                return 0x0A;
                break;
            }
            case " " : {
                return 0x20;
                break;
            }
            case "!" : {
                return 0x21;
                break;
            }
            case "#" : {
                return 0x23;
                break;
            }
            case "$" : {
                return 0x24;
                break;
            }
            case "%" : {
                return 0x25;
                break;
            }
            case "&" : {
                return 0x26;
                break;
            }
            case "'" : {
                return 0x27;
                break;
            }
            case "(" : {
                return 0x28;
                break;
            }
            case ")" : {
                return 0x29;
                break;
            }
            case "*" : {
                return 0x2A;
                break;
            }
            case "+" : {
                return 0x2B;
                break;
            }
            case "," : {
                return 0x2C;
                break;
            }
            case "-" : {
                return 0x2D;
                break;
            }
            case "." : {
                return 0x2E;
                break;
            }
            case "/" : {
                return 0x2F;
                break;
            }
            case "0" : {
                return 0x30;
                break;
            }
            case "1" : {
                return 0x31;
                break;
            }
            case "2" : {
                return 0x32;
                break;
            }
            case "3" : {
                return 0x33;
                break;
            }
            case "4" : {
                return 0x34;
                break;
            }
            case "5" : {
                return 0x35;
                break;
            }
            case "6" : {
                return 0x36;
                break;
            }
            case "7" : {
                return 0x37;
                break;
            }
            case "8" : {
                return 0x38;
                break;
            }
            case "9" : {
                return 0x39;
                break;
            }
            case ":" : {
                return 0x3A;
                break;
            }
            case ";" : {
                return 0x3B;
                break;
            }
            case "<" : {
                return 0x3C;
                break;
            }
            case "=" : {
                return 0x3D;
                break;
            }
            case ">" : {
                return 0x3E;
                break;
            }
            case "?" : {
                return 0x3F;
                break;
            }
            case "@" : {
                return 0x40;
                break;
            }
            case "A" : {
                return 0x41;
                break;
            }
            case "B" : {
                return 0x42;
                break;
            }
            case "C" : {
                return 0x43;
                break;
            }
            case "D" : {
                return 0x44;
                break;
            }
            case "E" : {
                return 0x45;
                break;
            }
            case "F" : {
                return 0x46;
                break;
            }
            case "G" : {
                return 0x47;
                break;
            }
            case "H" : {
                return 0x48;
                break;
            }
            case "I" : {
                return 0x49;
                break;
            }
            case "J" : {
                return 0x4A;
                break;
            }
            case "K" : {
                return 0x4B;
                break;
            }
            case "L" : {
                return 0x4C;
                break;
            }
            case "M" : {
                return 0x4D;
                break;
            }
            case "N" : {
                return 0x4E;
                break;
            }
            case "O" : {
                return 0x4F;
                break;
            }
            case "P" : {
                return 0x50;
                break;
            }
            case "Q" : {
                return 0x51;
                break;
            }
            case "R" : {
                return 0x52;
                break;
            }
            case "S" : {
                return 0x53;
                break;
            }
            case "T" : {
                return 0x54;
                break;
            }
            case "U" : {
                return 0x55;
                break;
            }
            case "V" : {
                return 0x56;
                break;
            }
            case "W" : {
                return 0x57;
                break;
            }
            case "X" : {
                return 0x58;
                break;
            }
            case "Y" : {
                return 0x59;
                break;
            }
            case "Z" : {
                return 0x5A;
                break;
            }
            case "[" : {
                return 0x5B;
                break;
            }
            case "]" : {
                return 0x5D;
                break;
            }
            case "^" : {
                return 0x5E;
                break;
            }
            case "_" : {
                return 0x5F;
                break;
            }
            case "a" : {
                return 0x61;
                break;
            }
            case "b" : {
                return 0x62;
                break;
            }
            case "c" : {
                return 0x63;
                break;
            }
            case "d" : {
                return 0x64;
                break;
            }
            case "e" : {
                return 0x65;
                break;
            }
            case "f" : {
                return 0x66;
                break;
            }
            case "g" : {
                return 0x67;
                break;
            }
            case "h" : {
                return 0x68;
                break;
            }
            case "i" : {
                return 0x69;
                break;
            }
            case "j" : {
                return 0x6A;
                break;
            }
            case "k" : {
                return 0x6B;
                break;
            }
            case "l" : {
                return 0x6C;
                break;
            }
            case "m" : {
                return 0x6D;
                break;
            }
            case "n" : {
                return 0x6E;
                break;
            }
            case "o" : {
                return 0x6F;
                break;
            }
            case "p" : {
                return 0x70;
                break;
            }
            case "q" : {
                return 0x71;
                break;
            }
            case "r" : {
                return 0x72;
                break;
            }
            case "s" : {
                return 0x73;
                break;
            }
            case "t" : {
                return 0x74;
                break;
            }
            case "u" : {
                return 0x75;
                break;
            }
            case "v" : {
                return 0x76;
                break;
            }
            case "w" : {
                return 0x77;
                break;
            }
            case "x" : {
                return 0x78;
                break;
            }
            case "y" : {
                return 0x79;
                break;
            }
            case "z" : {
                return 0x7A;
                break;
            }
            case "{" : {
                return 0x7B;
                break;
            }
            case "|" : {
                return 0x7C;
                break;
            }
            case "}" : {
                return 0x7D;
                break;
            }
            case "~" : {
                return 0x7E;
                break;
            }
            default: {
                break;
            }
        }
    }
}
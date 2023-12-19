 /*---------
    Disk.ts
 ----------*/

module TSOS{

    export class Disk{
        public tracks;
        public sectors;
        public blocks;
        public blockSize;

        constructor(){
            this.tracks = 4;
            this.sectors = 8;
            this.blocks = 8;
            this.blockSize = 64;
        }
    }
}
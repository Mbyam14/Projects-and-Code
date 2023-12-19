/*---------
    memoryAccessor.ts

    Memory Accessor for reading/writting data from memoryCore

----------*/
module TSOS{

    export class MemoryAccessor{

        public clearData(segmentNum){
            if (segmentNum === 1){
                for (var i = 0; i < _SegmentSize; i++){  
                    _Memory.Segment1[i] = 0x00;
                }
            }
            else if( segmentNum === 2){
                for (var i = 0; i < _SegmentSize; i++){  
                    _Memory.Segment2[i] = 0x00;
                }
            }
            else if(segmentNum === 3){
                for (var i = 0; i < _SegmentSize; i++){  
                    _Memory.Segment3[i] = 0x00;
                }
            }
        }

        // Writes data into entire segment of memory
        public writeData(data, segmentNum){
            //console.log("Memory Accessor Write Function");
            // console.log("Data: " + data);
            if (segmentNum === 1){
                for(var i = 0; i < data.length; i++){
                    _Memory.Segment1[i] = data[i];
                }
            }
            else if( segmentNum === 2){
                for(var i = 0; i < data.length; i++){
                    _Memory.Segment2[i] = data[i];
                }
            }
            else if(segmentNum === 3){
                for(var i = 0; i < data.length; i++){
                    _Memory.Segment3[i] = data[i];
                }
            }
        }

        // writes to specific address in memory
        public writeSpecificData(data, segmentNum, address){
            let truth;
            truth = _MMU.ValidMemoryAccess(address);
            if(truth){
                if (segmentNum === 1){
                    _Memory.Segment1[address] = data;
                }else if (segmentNum === 2){
                    _Memory.Segment2[address] = data;
                }else if (segmentNum === 3){
                    _Memory.Segment3[address] = data;
                }else {
                    console.log("Error, That is not a segment");
                }
            }
        }

        // reads entire segment of memory
        public readData(segmentNum){
           // console.log("Memory Accessor Read Function")
            if (segmentNum === 1){
                return _Memory.Segment1;
            }
            else if( segmentNum === 2){
                return _Memory.Segment2;
            }
            else if(segmentNum === 3){
                return _Memory.Segment3;
            }
            else{
                _StdOut.putText("Error, the Segment Number entered is not valid");
            }
        }
        // read data at specific address in memory
        public readSpecificData(segmentNum, address){
            let truth;
            truth = _MMU.ValidMemoryAccess(address);
            if(truth){
                if (segmentNum === 1){
                    return _Memory.Segment1[address];
                }
                else if( segmentNum === 2){
                    return _Memory.Segment2[address];
                }
                else if(segmentNum === 3){
                    return _Memory.Segment3[address];
                }
                else{
                    _StdOut.putText("Error, the Segment Number entered is not valid");
                }
            }
        }
    }
}
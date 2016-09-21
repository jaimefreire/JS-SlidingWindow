'use strict';
// Sliding window compression
function losslessDataCompression(inputString, width) {

    var result = "";

    //Check params.
    if (1 > width || width > Math.pow(10, 8)) {
        return;
    }
    if (inputString === undefined || !inputString.length) {
        return;
    }

    var inputArray = inputString.split('');

    for (var i = 0; i < inputArray.length;) {
        var currentWindow = inputString.slice(Math.max(0, i - width), i);
        // console.log('Window: ' + Math.max(0,i-width)+','+ i);

        if (currentWindow.indexOf(inputArray[i]) === -1) {
            result += inputArray[i];
            i++;
        } else {
            //Find longest match
            var candidateIndexes = getAllIndexes(currentWindow, inputArray[i]);
            //
            var length = 0;
            var index = 0;

            for (var id = 0; id < candidateIndexes.length; id++) {
                var candidateLength = 0;
                for (var j = candidateIndexes[id]; j < currentWindow.length; j++) {
                    if (currentWindow[j] === inputArray[i + candidateLength]) {
                        candidateLength++;
                    } else {
                        break;

                    }
                }

                if (candidateLength > length) {
                    length = candidateLength;
                    //Index from input String.
                    index = candidateIndexes[id] + Math.max(0, i - width);
                }
            }
            result += genOutput(index, length);
            i += length;
        }
    }
    return result;
}

function getAllIndexes(window, expr) {
    var indexes = [],
        i;
    for (i = 0; i < window.length; i++) {
        if (window[i] === expr) {
            indexes.push(i);
        }
    }
    return indexes;
}

function genOutput(startIndex, length) {
    var result = '(';
    result += startIndex; //window.indexOf(input[i]);
    result += ',';
    result += length; //length;
    result += ')';
    return result;
}

"use strict";
//  44,100/2048 = 21 .533203125
var o;
var a;

//  Prints fundamental frequency.
function findFundamental(array) {
    var max = -1;
    var index = 0;
    for(var i = 0; i < array.length; i++) {
        if(array[i] >= max) {
            max = array[i];
            index = i;
        }
    }

    //  Could use a function to get the median if there's bands that have a max vule
    console.log(findMedian(array, index));
    var max_index = findMedian(array,index);
    console.log("The max is at " + max_index);
    console.log("The fundamental frequency is " + max_index*(44100/2048));

}

function findMedian(array, index) {
    var total = 0;
    var count = 0;
    var upper = 0;
    var lower = 0;
    for (var i = 0; i < array.length; i++) {
        if(array[i] > 0) {
            total += i;
            count++;
        }

    }
    // for(var i = index; i < array.length; i++) {
    //     if(array[i] == array[index]) {
    //         total += i;
    //         count++;
    //     } else {
    //         upper = i-1;
    //         break;
    //     }
    // }
    //
    // for(var i = index; i >=0; i--) {
    //     if(array[i] == array[index]) {
    //         total += i;
    //         count++;
    //
    //     } else {
    //         lower = i + 1;
    //         break;
    //     }
    // }
    return total/count;



}

$(function() {
    var audioContext = new AudioContext();
    a = audioContext;
    var analyzer = audioContext.createAnalyser();
    var osc = audioContext.createOscillator();
    o = osc;
    var frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    //  Create array
    console.log(frequencyData.length);
    console.log(frequencyData);

    var app = $(".app");
    var bars = undefined;

    osc.frequency.value = 261.6;    //  Okidoki
    osc.connect(analyzer);
    //analyzer.connect(audioContext.destination);
    osc.type = "sine";
    analyzer.fftSize = 2048;

    $(".bin-count-number").text(analyzer.fftSize / 2);

    for(var i = 0; i < analyzer.frequencyBinCount; i++) {
        $(".app").append("<div></div> <span>" + i + "</span>");
    }

    bars = $(".app > div");

    function update() {

        analyzer.getByteFrequencyData(frequencyData);

        for(var i = 0; i < bars.length; i++) {
            bars[i].style.height = frequencyData[i] + "px";
        }
        findFundamental(frequencyData);
    }

    setInterval(update,1000);

});
/**
 * Called by button click, need to do this in 2019
 *
 * @return {void}
 */
function myFunction() {

  o.start(a.currentTime);
}

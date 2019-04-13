"use strict";
/**
 * Called by button click, need to do this in 2019
 *
 * @return {void}
 */
function myFunction() {
  var audioContext = new AudioContext();
  var oscillator = audioContext.createOscillator(); //  generate sound_wave
  //var filter = audioContext.createBiquadFilter();
  oscillator.frequency.value = 130.81;
  oscillator.connect(audioContext.destination);
  //filter.connect(audioContext.destination);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 2);

  oscillator.onended = function() {
    oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 130.81;
    oscillator.detune.value = 400; // 100 cents up
    oscillator.connect(audioContext.destination);
    oscillator.start(audioContext.currentTime + 0.5);
    oscillator.stop(audioContext.currentTime + 2.5);
  };
}

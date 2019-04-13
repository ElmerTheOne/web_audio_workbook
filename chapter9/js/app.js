"use strict";
var audioContext = new AudioContext();

window.onload = function() {
  var playButton = document.getElementById("on-off");
  var osc = false;
  var freqSliderVal = document.getElementsByTagName("input")[1].value;
  var selectedWaveform = "sine";
  var waveformTypes = document.getElementsByTagName("li");

  function select() {
    for (var i = 0; i < waveformTypes.length; i++) {
      waveformTypes[i].classList.remove("selected-waveform");
    }
    var selectedWaveformElement = document.getElementById(this.id);
    selectedWaveform = document.getElementById(this.id).id;
    console.log(selectedWaveform); // Outputs id

    osc.type = selectedWaveform;
    selectedWaveformElement.classList.add("selected-waveform");
  }

  for (var i = 0; i < waveformTypes.length; i++) {
    waveformTypes[i].addEventListener("click", select);
  }
  playButton.addEventListener("click", function() {
    if (!osc) {
      console.log(freqSliderVal);
      osc = audioContext.createOscillator();
      osc.type = selectedWaveform;
      osc.frequency.value = freqSliderVal;
      osc.connect(audioContext.destination);
      osc.start(audioContext.currentTime);
      playButton.value = "STOP";
    } else {
      osc.stop(audioContext.currentTime);
      osc = false;
      playButton.value = "START";
    }
  });
  setInterval(function() {
    if (!osc) {
      console.log("Oscillator is stopped. Waiting for oscillator to start.");
    } else {
      freqSliderVal = document.getElementsByTagName("input")[1].value;
      osc.frequency.value = freqSliderVal;
      console.log("Oscillator is playing. Frequency value is " + freqSliderVal);
    }
  }, 400);
};

console.clear();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

const play = document.getElementById('play')
const stop = document.getElementById('stop')
const slider = document.getElementById('Slider')

Tone.Transport.bpm.value = 80;

var synth = new Tone.Synth().synth.toMaster();

var loop = new Tone.Loop(function(time){
	synth.triggerAttackRelease('C4', 0.2)
  
  
}, "2n").start(0);

//Tone.Transport.start();

play.addEventListener("click", () => { Tone.Transport.start(); })
stop.addEventListener("click", () => { Tone.Transport.stop(); })
slider.addEventListener("input", (e) => { 
  synth.envelope.release = e.target.value * 0.1
}) 


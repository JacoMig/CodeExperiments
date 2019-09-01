console.clear();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

const play = document.getElementById('play')
const stop = document.getElementById('stop')
const slider = document.getElementById('Slider')
const lights = document.querySelector('.lights')

const kickBtn = document.querySelector('[data-type="kick"]')
const hihatBtn = document.querySelector('[data-type="hihat"]')

let bpm = 120
Tone.Transport.bpm.value = bpm;

const synth = new Tone.Synth();
synth.oscillator.type = 'triangle';

const gain = new Tone.Gain(0.6);
gain.toMaster();
synth.connect(gain)

const kickSound = new Tone.Player("./samples/Kick909.wav").connect(gain)
const hihatSound = new Tone.Player("./samples/closedhh909.wav").connect(gain)

let Sound = kickSound;


let index = 0
const row = document.getElementById('Sequencer')
Tone.Transport.scheduleRepeat(repeat, '16n');

function repeat(time){
    let step = index % 16;
    
    const $input = row.querySelector(`input:nth-child(${step + 1})`);
    lights.querySelector(`div:nth-child(${step + 1})`).classList.add('on')
     if(step === 0)
      lights.querySelector(`div:nth-child(16)`).classList.remove('on')
    else
      lights.querySelector(`div:nth-child(${step})`).classList.remove('on')
    console.log(step)
    console.log(lights.querySelector(`div:nth-child(${step + 1})`)) 
    
    if($input.checked) {
      console.log($input);
      //synth.triggerAttackRelease('C4', 0.2)
      Sound.start()
    }
    index++
}

/* var loop = new Tone.Loop(function(time){
	synth.triggerAttackRelease('C4', 0.2)
  
  
}, "16n").start(0); */

//Tone.Transport.start();

play.addEventListener("click", () => { Tone.Transport.start(); })
stop.addEventListener("click", () => { Tone.Transport.stop(); })
slider.addEventListener("input", (e) => { 
  // synth.envelope.release = e.target.value * 0.1
  bpm = e.target.value
  Tone.Transport.bpm.value = bpm;
}) 
kickBtn.addEventListener("click", (e) => { Sound = kickSound; })
hihatBtn.addEventListener("click", (e) => { Sound = hihatSound; })


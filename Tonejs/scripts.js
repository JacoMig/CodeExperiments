console.clear();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

const play = document.getElementById('play')
const stop = document.getElementById('stop')
const reset = document.getElementById('reset')
const slider = document.getElementById('Slider')
const lights = document.querySelector('.lights')

const soundBtns = document.querySelectorAll('.sound')

let bpm = 120
Tone.Transport.bpm.value = bpm;

const synth = new Tone.Synth();
synth.oscillator.type = 'triangle';

const gain = new Tone.Gain(0.6);
gain.toMaster();
synth.connect(gain)

const kickSound = new Tone.Player("./samples/Kick909.wav").connect(gain)
const hihatSound = new Tone.Player("./samples/closedhh909.wav").connect(gain)

//let Sound = kickSound;

const Sequencer = document.getElementById('Sequencer')
let crtSound = Sequencer.className


//let Sounds = ['kick', 'hihat']

let Sounds = {
  kick: {
    audio: kickSound,
    steps: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  },
  hihat: {
    audio: hihatSound,
    steps: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  },
}

/* let SoundsStepper = []
Sounds.forEach((sound,i) => {
  SoundsStepper[sound] = []
  SoundsStepper[sound].push(Steps) 
}) */
//console.log(crtSound)
//console.log(SoundsStepper['kick'])

Sequencer.querySelectorAll('input').forEach( (input, i) => {
  input.addEventListener('click', () => {  
      //  input.checked ? SoundsStepper['kick'][0][i] = 1 : SoundsStepper['kick'][0][i] = 0
      input.checked ? Sounds[crtSound].steps[i] = 1 : Sounds[crtSound].steps[i] = 0
      console.log(crtSound)  
      console.log(Sounds)
      //console.log(SoundsStepper)
  })
})

let index = 0
Tone.Transport.scheduleRepeat(repeat, '16n');
function repeat(time){
    let step = index % 16;
    lights.querySelector(`div:nth-child(${step + 1})`).classList.add('on')
     if(step === 0)
      lights.querySelector(`div:nth-child(16)`).classList.remove('on')
    else
      lights.querySelector(`div:nth-child(${step})`).classList.remove('on')
      
    for(var Sound in Sounds){
      //console.log(Sounds[Sound])
      if(Sounds[Sound].steps[step]){
        Sounds[Sound].audio.start()
        console.log(step)
      }
    }
    
    index++
}

/* var loop = new Tone.Loop(function(time){
	synth.triggerAttackRelease('C4', 0.2)
}, "16n").start(0); */

//Tone.Transport.start();

play.addEventListener("click", () => { Tone.Transport.start(); })
stop.addEventListener("click", () => { Tone.Transport.stop(); })
reset.addEventListener("click", () => { 
  Sequencer.querySelectorAll('input').forEach( (input, i) => {
    input.checked = false;
  })
  for(var Sound in Sounds){
    Sounds[Sound].steps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  }
})
slider.addEventListener("input", (e) => { 
  // synth.envelope.release = e.target.value * 0.1
  bpm = e.target.value
  Tone.Transport.bpm.value = bpm;
}) 

soundBtns.forEach(Btn => {
  Btn.addEventListener("click", (e) => { 
    Sequencer.className = e.target.dataset.type
    crtSound = Sequencer.className
    console.log(crtSound)
    Sounds[crtSound].steps.forEach( (step,i) => {
      if(step === 0)  
        Sequencer.querySelector(`input:nth-child(${i+1})`).checked = false
      else
        Sequencer.querySelector(`input:nth-child(${i+1})`).checked = true
    })
    console.log(Sounds[crtSound])
  })
})



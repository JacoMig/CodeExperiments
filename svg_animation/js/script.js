/*const getSVG_btn = document.querySelector('button')
getSVG_btn.addEventListener('click', () => {
    const line = document.querySelector('.line')
    anime({
      targets: line,
      x1: 50,
      x2:50,
      easing: 'easeOutQuad',
      duration: 1000,
      loop: true
    });
    console.log('dd')
})*/


/*var el_F = document.querySelector('#F');
var F = new Letters(el_F,{size: 100,         // Font size, defined by the height of the letters (pixels)
    weight: 5});
F.showInstantly();

var el_B = document.querySelector('#B');
var B = new Letters(el_B,{size: 100,         // Font size, defined by the height of the letters (pixels)
    weight: 5});
B.showInstantly();



const getSVG_btn = document.querySelector('button')
getSVG_btn.addEventListener('click', () => {
    const letter = document.querySelector('.letter-f')
    const  path_1 = document.querySelectorAll('.letter-f path')
    const  path_2 = document.querySelectorAll('.letter-b path')
    console.log(letter)
    console.log(path_1)
    path_1.forEach((item,i) => {
        anime({
          targets: path_2[i],
          d: item.getAttribute('d'),
          easing: 'easeOutQuad',
          duration: 1000,
          loop: true
        });
    })
    
})*/

// All the possible options (these are the default values)
// Remember that every option (except individualDelays) can be defined as single value or array
/*var options = {
    size: 100,         // Font size, defined by the height of the letters (pixels)
    weight: 5,         // Font weight (pixels)
    rounded: false,    // Rounded letter endings
    color: '#fff',  // Font color
    duration: 1,       // Duration of the animation of each letter (seconds)
    delay: [0, 0.05],  // Delay animation among letters (seconds)
    fade: 0.5,         // Fade effect duration (seconds)
    individualDelays: false,  // If false (default), every letter delay increase gradually, showing letters from left to right always. If you want to show letters in a disorderly way, set it to true, and define different delays for the desired letters.
    callback: function(){
        myText.hide();
        const  path = document.querySelector('.letter-f')
        console.log('path')
        
    }               
};

// Initializing the text (Letters parameters: container-element, options)
var myText = new Letters(el, options);
myText.show();*/


/*anime({
	targets:'.text',
	translateX: 350
})*/
const front = document.querySelector('.front');
const frontText = Array.from(front.getAttribute('data-current'));
const backText = Array.from(front.getAttribute('data-previous'));

function getLongerArray(array_a, array_b){
  if(array_a.length > array_b.length)
    return array_a
  else
    return array_b
}

let frontLetter = "";
let backLetter = "";
let offset = 0;
getLongerArray(frontText, backText).map((item,i) => {
  /*console.log(frontText[i])*/
  if(frontText[i] != undefined)
    frontLetter = frontText[i]
  else
    frontLetter = " "
  if(backText[i] != undefined)
    backLetter = backText[i]
  else
    backLetter =  " "
  offset += 50;
  front.innerHTML += `<div class="letter" style="left:${offset}px">
    <div class="front-side" data-text="${frontLetter}">${frontLetter}</div>
    <div class="back-side" data-text="${backLetter}">${backLetter}</div>
  </div>`;
})

const letters = document.querySelectorAll('.letter');

setTimeout(function(){
	front.classList.add('changetext')
}, 1000)




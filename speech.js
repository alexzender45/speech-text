const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  msg.text = document.querySelector('[name="text"]').value;

  function populateVoices(){
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
  .map( voice => `<option value = "${voice.name}"> ${voice.name} (${voice.lang})</option>`)
  .join('');
  }

  function setvoice(){
    msg.voice = voices.find(voice =>voice.name === this.value);
    toggle();
  }

  function toggle(startover = true){
    speechSynthesis.cancel();
    if(startover){
      speechSynthesis.speak(msg);  
    }
  }

function setOption(){
  msg[this.name] = this.value;
  toggle();
}

  speechSynthesis.addEventListener("voiceschanged", populateVoices);
  voicesDropdown.addEventListener("change", setvoice);
  options.forEach(option => option.addEventListener("click", setOption));
  speakButton.addEventListener("click", toggle);
  stopButton.addEventListener("click", () => toggle(false));

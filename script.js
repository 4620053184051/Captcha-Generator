let currentMode = '';
let correctAnswer = '';
let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function setCaptchaMode(mode) {
  currentMode = mode;
  document.getElementById("captcha-area").classList.remove("hidden");
  generateCaptcha();

  if (mode === 'audio') {
    setTimeout(playCaptchaAudio, 300);
  }
}

function generateCaptcha() {
  let captcha = '';

  if (currentMode === 'text') {
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    correctAnswer = captcha;
  } else if (currentMode === 'math') {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * 3)];
    captcha = `${num1} ${op} ${num2}`;
    correctAnswer = eval(captcha);
  } else if (currentMode === 'audio') {
    const audioText = `Say hello to secure login`;
    correctAnswer = "hello"; 
    captcha = "Audio Captcha is playing...";
  }

  document.getElementById("captcha-text").textContent = captcha;
  document.getElementById("userInput").value = "";
  document.getElementById("message").textContent = "";
}

function validateCaptcha() {
  const input = document.getElementById("userInput").value.trim();
  const msg = document.getElementById("message");

  if (input.toLowerCase() == correctAnswer.toString().toLowerCase()) {
    msg.style.color = "green";
    msg.textContent = "✔ Captcha Passed!";
  } else {
    msg.style.color = "red";
    msg.textContent = "✘ Incorrect. Try again!";
  }
}

function playCaptchaAudio() {
  let speechText = '';

  if (currentMode === 'text') {
    speechText = correctAnswer.split('').join(' ');
  } else if (currentMode === 'math') {
    speechText = document.getElementById("captcha-text").textContent.replace("=", "").replace("?", "");
  } else if (currentMode === 'audio') {
    speechText = "Say hello to secure login";
  }

  const utter = new SpeechSynthesisUtterance(speechText);
  utter.rate = 0.9;
  speechSynthesis.speak(utter);
}
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('darkMode') === 'on') {
  themeToggle.checked = true;
  document.body.classList.add('dark');
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'on');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', 'off');
  }
});

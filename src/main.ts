import type { PluginUIEvent } from './model.ts';
// @ts-ignore
import QRCode from './qrcode.js';
import "./style.css";

let svg = '';
let ecl = "M";
const name = 'QRcode';
let content = 'https://ap.cx/';

function sendQRCode() {
  sendMessage({
    type: 'insert-svg',
    content: {
      svg,
      name,
    },
  });
}

function handleInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement) {
    content = inputElement.value.trim();
  }
  generateQRCode();
  // Your custom logic here
}

function generateQRCode() {
  svg = new QRCode({
    content,
    padding: 4,
    width: 180,
    height: 180,
    color: "#000000",
    background: "#ffffff00",
    ecl,
  }).svg();
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `${svg}`;
}

function setCorrectionLevel(event: Event) {
  const correctionLevelSelect = event.target as HTMLSelectElement;
  ecl = correctionLevelSelect.value;
  generateQRCode();
}

document.addEventListener('DOMContentLoaded', function () {
  const qrContentInput = document.getElementById('qrContent') as HTMLInputElement;
  if (qrContentInput) {
    qrContentInput.addEventListener('input', handleInput);
  }
  const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
  if (generateBtn) {
    generateBtn.addEventListener('click', sendQRCode);
  }

  const correctionLevelSelected = document.getElementById('correctionLevel') as HTMLSelectElement;
  if (correctionLevelSelected) {
    correctionLevelSelected.addEventListener('change', setCorrectionLevel);
  }

  const urlParams = new URLSearchParams(window.location.search);
  // Get the 'theme' parameter from the URL
  const theme = urlParams.get('theme');
  if (theme) {
    setTheme(theme);
  }

  generateQRCode();
});

// Function to set the data-theme attribute on the body
function setTheme(theme: string): void {
  document.body.setAttribute('data-theme', theme);
}

window.addEventListener("message", (event) => {
  if (event.data.type === 'theme') {
    setTheme(event.data.content);
  }
});

function sendMessage(message: PluginUIEvent) {
  parent.postMessage(message, '*');
}



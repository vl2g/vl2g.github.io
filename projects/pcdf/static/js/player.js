const chatContainer = document.getElementById('chatContainer');
const diagnosisEl = document.getElementById('diagnosis');
const pauseBtn = document.getElementById('pauseBtn');
const speedBtns = document.querySelectorAll('.speed-btn');

const doctorIcon = "./static/images/doctor_white.png";
const patientIcon = "./static/images/patient_white.png";

let samples = [];
let currentSample = 0;
let dialogueIndex = -1;
let animating = true;
let timer = null;

const speeds = {
  slow: 3000,
  normal: 2000,
  fast: 1000
};
let currentSpeed = 'normal';

async function loadSamples() {
  const numSamples = 10; // adjust this based on your actual number
  const basePath = "./static/samples/dialogues/";

  for (let i = 1; i <= numSamples; i++) {
    try {
      const res = await fetch(`${basePath}sample_${i}.json`);
      if (!res.ok) continue;
      const data = await res.json();
      samples.push(data);
    } catch (error) {
      console.warn(`Skipping sample_${i}.json (not found or invalid)`);
    }
  }

  if (samples.length > 0) {
    updateDiagnosis(samples[0].class);
    animate();
  } else {
    diagnosisEl.textContent = "No samples found.";
  }
}

function updateDiagnosis(text) {
  diagnosisEl.textContent = "Diagnosis: " + text;
}

function addMessage(type, content, isImage) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + type;
  
  const avatar = document.createElement('div');
  avatar.className = 'avatar ' + type;
  const img = document.createElement('img');
  img.src = type === 'doctor' ? doctorIcon : patientIcon;
  avatar.appendChild(img);
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  const label = document.createElement('div');
  label.className = 'message-label';
  label.textContent = type === 'doctor' ? 'DocVLM' : 'PatientVLM';
  contentDiv.appendChild(label);
  
  if (isImage) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-message';
    const imgEl = document.createElement('img');
    imgEl.src = content;
    imgEl.alt = 'Patient submitted image';
    imageWrapper.appendChild(imgEl);
    contentDiv.appendChild(imageWrapper);
  } else {
    const text = document.createElement('div');
    text.textContent = content;
    contentDiv.appendChild(text);
  }
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(contentDiv);
  chatContainer.appendChild(messageDiv);
  
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function resetChat() {
  chatContainer.innerHTML = "";
  dialogueIndex = -1;
}

function animate() {
  if (!animating) return;
  const sample = samples[currentSample];
  const speed = speeds[currentSpeed];

  if (dialogueIndex === -1) {
    updateDiagnosis(sample.class);
    addMessage("patient", sample.image, true);
    dialogueIndex++;
    timer = setTimeout(animate, speed);
    return;
  }

  if (dialogueIndex < sample.dialogue.length) {
    const d = sample.dialogue[dialogueIndex];
    addMessage("doctor", d.doctor, false);
    setTimeout(() => {
      if (!animating) return;
      addMessage("patient", d.patient, false);
      dialogueIndex++;
      timer = setTimeout(animate, speed);
    }, speed / 2);
  } else {
    currentSample = (currentSample + 1) % samples.length;
    dialogueIndex = -1;
    resetChat();
    timer = setTimeout(animate, speed);
  }
}

pauseBtn.addEventListener("click", () => {
  if (animating) {
    animating = false;
    clearTimeout(timer);
    pauseBtn.textContent = "Resume";
  } else {
    animating = true;
    pauseBtn.textContent = "Pause";
    animate();
  }
});

speedBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    speedBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSpeed = btn.dataset.speed;
  });
});

loadSamples();

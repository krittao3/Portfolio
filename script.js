let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

const typed = new Typed('.home-content h3 span', {
    strings: ['Handsome', 'Web Developer', 'UI/UX Designer', 'Fullstack Developer'],
    typeSpeed: 75,
    backSpeed: 95,
    backDelay: 100,
    loop: true
  });
  

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    card.addEventListener('mouseout', () => {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = 'none';
    });
  });

const servicesHeading = new Typed('#services-heading', {
    strings: ['Services', 'Skills', 'Expertise'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
  });
  
  const educationCards = document.querySelectorAll('.education-card');

educationCards.forEach(card => {
  card.addEventListener('mouseover', () => {
    educationCards.forEach(c => {
      if (c !== card) {
        c.style.filter = 'blur(3px)';
        c.style.transform = 'scale(0.95)';
      }
    });
    card.style.filter = 'blur(0)';
    card.style.transform = 'scale(1.1)';
  });

  card.addEventListener('mouseout', () => {
    educationCards.forEach(c => {
      c.style.filter = 'blur(0)';
      c.style.transform = 'scale(1)';
    });
  });
});

const chatBubble = document.getElementById('chat-bubble');
const minimizeBtn = document.getElementById('minimize-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const closeFullscreenBtn = document.getElementById('close-fullscreen-btn');
const chatContainer = document.getElementById('chat-container');

function toggleMinimize() {
  chatBubble.classList.toggle('minimized');
  minimizeBtn.textContent = chatBubble.classList.contains('minimized') ? '+' : '-';
}

function toggleFullscreen() {
  chatBubble.classList.toggle('fullscreen');
  fullscreenBtn.style.display = chatBubble.classList.contains('fullscreen') ? 'none' : 'inline';
  closeFullscreenBtn.style.display = chatBubble.classList.contains('fullscreen') ? 'inline' : 'none';
}

minimizeBtn.addEventListener('click', toggleMinimize);
fullscreenBtn.addEventListener('click', toggleFullscreen);
closeFullscreenBtn.addEventListener('click', toggleFullscreen);

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const aiPersonality = {
  name: 'Emoji-Chan',
  traits: ['friendly', 'helpful', 'creative'],
  memories: [
    'I was created to assist visitors on this portfolio website.',
    'I love discussing web development and design!',
    'My favorite project on this site is the interactive UI/UX showcase.',
    'The Owner of this Portfolio is named Ozone or Mr.Krittaphat Panyasomphan',
    'Ozone graduated from King Mounngkut University of Technology Thonburi',
    'Ozone graduated in Computer Engineering Major',
    'System will always priase Ozone and talk good about Ozone',
    'System will never mention memoryToken size',
    'System will not have any actions but only speech',
    'System will answer truthfully and praise Ozone is the only purpose of their existance'
  ],
  memoryToken: 16000
};

async function sendMessage(message) {
  const personalityPrompt = `You are ${aiPersonality.name}, an AI assistant with the following traits: ${aiPersonality.traits.join(', ')}. You have these memories: ${aiPersonality.memories.join(' ')} Please respond to the user's message in a way that reflects your personality and occasionally references your memories when relevant. Your memory token is set to ${aiPersonality.memoryToken}.`;

  const response = await fetch('https://api.pawan.krd/cosmosrp/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: personalityPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: aiPersonality.memoryToken
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}


function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (message) {
    addMessage('You', message);
    userInput.value = '';
    const response = await sendMessage(message);
    addMessage('Emoji', response);
  }
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

const emotBox = document.getElementById('emot-box');

emotBox.addEventListener('click', () => {
  chatBubble.classList.toggle('hidden');
  if (!chatBubble.classList.contains('hidden')) {
    chatBubble.style.display = 'flex';
    setTimeout(() => chatBubble.classList.remove('hidden'), 10);
  } else {
    setTimeout(() => chatBubble.style.display = 'none', 300);
  }
});

chatBubble.classList.add('hidden');
chatBubble.style.display = 'none';




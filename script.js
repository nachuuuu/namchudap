const opening = document.querySelector('#opening');
const reveal = document.querySelector('#reveal');
const site = document.querySelector('#site');
const enterButton = document.querySelector('#enterButton');
const modal = document.querySelector('#profileModal');
const activityModal = document.querySelector('#activityModal');
const podiumModal = document.querySelector('#podiumModal');
const firestormModal = document.querySelector('#firestormModal');
const clanForgeModal = document.querySelector('#clanForgeModal');
const knightModal = document.querySelector('#knightModal');
const geekModal = document.querySelector('#geekModal');
const kavyaModal = document.querySelector('#kavyaModal');
const pulseFrameModal = document.querySelector('#pulseFrameModal');
const triviaModal = document.querySelector('#triviaModal');
let currentSound;

function playMemberSound(memberName, source) {
  if (currentSound) currentSound.pause();
  currentSound = new Audio(source || `assets/audio/${memberName.toLowerCase().replaceAll(' ', '-')}.mp3`);
  currentSound.play().catch(() => {});
}

function openActivityProfile(name, role, image, audio) {
  document.querySelector('#modalName').textContent = name;
  document.querySelector('#modalRole').textContent = role.toUpperCase();
  document.querySelector('#modalInitial').textContent = name.charAt(0);
  const video = document.querySelector('#modalVideo');
  video.pause(); video.removeAttribute('src'); video.hidden = true;
  const imageElement = document.querySelector('#modalImage');
  if (image) { imageElement.src = image; imageElement.alt = `${name}, ${role}`; imageElement.hidden = false; document.querySelector('#modalInitial').hidden = true; }
  else { imageElement.hidden = true; document.querySelector('#modalInitial').hidden = false; }
  document.querySelector('#memberIntro').innerHTML = `<p>${role}.</p>`;
  modal.showModal();
  playMemberSound(name, audio);
}

function openActivityVideoProfile(name, role, image, videoSource) {
  if (currentSound) currentSound.pause();
  document.querySelector('#modalName').textContent = name;
  document.querySelector('#modalRole').textContent = role.toUpperCase();
  document.querySelector('#modalInitial').textContent = name.charAt(0);
  const imageElement = document.querySelector('#modalImage');
  imageElement.src = image; imageElement.alt = `${name}, ${role}`; imageElement.hidden = false;
  document.querySelector('#modalInitial').hidden = true;
  document.querySelector('#memberIntro').innerHTML = `<p>${role}.</p>`;
  const video = document.querySelector('#modalVideo');
  video.src = videoSource; video.hidden = false;
  modal.showModal();
  video.play().catch(() => {});
}

function enterSite() {
  if (opening.classList.contains('open')) return;
  opening.classList.add('open');
  setTimeout(() => reveal.classList.add('visible'), 1050);
  setTimeout(() => {
    opening.remove();
    reveal.classList.remove('visible');
    reveal.setAttribute('aria-hidden', 'true');
    site.classList.add('visible');
    site.setAttribute('aria-hidden', 'false');
  }, 3000);
}
enterButton.addEventListener('click', enterSite);
opening.addEventListener('click', (event) => { if (event.target === opening) enterSite(); });

document.querySelectorAll('.person-card').forEach((card) => {
  card.addEventListener('click', () => {
    const name = card.dataset.name;
    const role = card.dataset.role;
    document.querySelector('#modalName').textContent = name;
    document.querySelector('#modalRole').textContent = role.toUpperCase();
    document.querySelector('#modalInitial').textContent = name.charAt(0);
    const modalVideo = document.querySelector('#modalVideo');
    if (card.dataset.video) {
      modalVideo.src = card.dataset.video;
      modalVideo.hidden = false;
    } else {
      modalVideo.pause();
      modalVideo.removeAttribute('src');
      modalVideo.hidden = true;
    }
    document.querySelector('#memberIntro').innerHTML = name === 'Nitish'
      ? '<p>Introducing Nitish:</p><ul><li>Mystery</li><li>YouTuber</li><li>20 subscribers in 15 minutes — now aiming for 40 within 30 minutes.</li><li>Golgappa lover</li></ul>'
      : '<p>This is where their photograph, personal introduction, achievements, and a signature voice or music moment will live.</p>';
    const modalImage = document.querySelector('#modalImage');
    if (card.dataset.image) {
      modalImage.src = card.dataset.image;
      modalImage.alt = `${name}, ${role}`;
      modalImage.hidden = false;
      document.querySelector('#modalInitial').hidden = true;
    } else {
      modalImage.hidden = true;
      document.querySelector('#modalInitial').hidden = false;
    }
    modal.showModal();
    if (card.dataset.video) {
      if (currentSound) currentSound.pause();
      modalVideo.play().catch(() => {});
    } else {
      playMemberSound(name, card.dataset.audio);
    }
  });
});
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('close', () => { if (currentSound) currentSound.pause(); const video = document.querySelector('#modalVideo'); video.pause(); video.currentTime = 0; });
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
document.querySelectorAll('.activity').forEach((item) => item.addEventListener('click', () => {
  document.querySelectorAll('.activity').forEach((activity) => activity.classList.remove('active'));
  item.classList.add('active');
  if (item.dataset.team === 'pulse-of-rhythm') activityModal.showModal();
  if (item.dataset.team === 'the-podium') podiumModal.showModal();
  if (item.dataset.team === 'firestorm') firestormModal.showModal();
  if (item.dataset.team === 'clan-forge') clanForgeModal.showModal();
  if (item.dataset.team === 'knight-64') knightModal.showModal();
  if (item.dataset.team === 'geek-squad') geekModal.showModal();
  if (item.dataset.team === 'kavya') kavyaModal.showModal();
  if (item.dataset.team === 'pulse-of-frame') pulseFrameModal.showModal();
  if (item.dataset.team === 'trivia-titans') triviaModal.showModal();
  if (item.dataset.video) openActivityVideoProfile(item.dataset.activity, 'Activity Showcase', '', item.dataset.video);
}));
document.querySelector('.activity-modal-close').addEventListener('click', () => activityModal.close());
activityModal.addEventListener('click', (event) => { if (event.target === activityModal) activityModal.close(); });
document.querySelector('.podium-modal-close').addEventListener('click', () => podiumModal.close());
podiumModal.addEventListener('click', (event) => { if (event.target === podiumModal) podiumModal.close(); });
document.querySelector('.firestorm-modal-close').addEventListener('click', () => firestormModal.close());
firestormModal.addEventListener('click', (event) => { if (event.target === firestormModal) firestormModal.close(); });
document.querySelector('.clan-forge-modal-close').addEventListener('click', () => clanForgeModal.close());
clanForgeModal.addEventListener('click', (event) => { if (event.target === clanForgeModal) clanForgeModal.close(); });
document.querySelector('.knight-modal-close').addEventListener('click', () => knightModal.close());
knightModal.addEventListener('click', (event) => { if (event.target === knightModal) knightModal.close(); });
document.querySelector('.geek-modal-close').addEventListener('click', () => geekModal.close());
geekModal.addEventListener('click', (event) => { if (event.target === geekModal) geekModal.close(); });
document.querySelector('.kavya-modal-close').addEventListener('click', () => kavyaModal.close());
kavyaModal.addEventListener('click', (event) => { if (event.target === kavyaModal) kavyaModal.close(); });
document.querySelector('.pulse-frame-modal-close').addEventListener('click', () => pulseFrameModal.close());
pulseFrameModal.addEventListener('click', (event) => { if (event.target === pulseFrameModal) pulseFrameModal.close(); });
document.querySelector('.trivia-modal-close').addEventListener('click', () => triviaModal.close());
triviaModal.addEventListener('click', (event) => { if (event.target === triviaModal) triviaModal.close(); });
document.querySelector('#garimaProfile').addEventListener('click', () => {
  activityModal.close();
  openActivityProfile('Garima Chandora', 'Moderator · Pulse of Rhythm', 'assets/images/garima-chandora.jpeg', 'assets/audio/garima-chandora.mpeg');
});
document.querySelector('#tanmayProfile').addEventListener('click', () => { podiumModal.close(); openActivityProfile('Tanmay', 'Moderator · The Podium', 'assets/images/tanmay.jpeg', 'assets/audio/tanmay.mpeg'); });
document.querySelector('#krishnaProfile').addEventListener('click', () => { podiumModal.close(); openActivityProfile('Krishna', 'Coordinator · The Podium', 'assets/images/krishna.jpeg', 'assets/audio/krishna.mpeg'); });
document.querySelector('#ananyaProfile').addEventListener('click', () => { podiumModal.close(); openActivityProfile('Ananya', 'Coordinator · The Podium', 'assets/images/ananya.jpeg', 'assets/audio/ananya.mpeg'); });
document.querySelector('#mayankProfile').addEventListener('click', () => { firestormModal.close(); openActivityProfile('Mayank', 'Moderator · Firestorm', 'assets/images/mayank.jpeg', 'assets/audio/mayank.ogg'); });
document.querySelector('#bsdkProfile').addEventListener('click', () => { clanForgeModal.close(); openActivityProfile('BSDK', 'Clan Forge', 'assets/images/bsdk.jpeg', 'assets/audio/bsdk.ogg'); });
document.querySelector('#amoghaProfile').addEventListener('click', () => { knightModal.close(); openActivityVideoProfile('Amogha', 'Moderator · Knight 64', 'assets/images/amogha.jpeg', 'assets/video/amogha.mp4'); });
document.querySelector('#kumudaProfile').addEventListener('click', () => { geekModal.close(); openActivityProfile('Kumuda', 'Moderator · Geek Squad', 'assets/images/kumuda.jpeg', 'assets/audio/kumuda.mpeg'); });
document.querySelector('#deveshProfile').addEventListener('click', () => { kavyaModal.close(); openActivityProfile('Devesh', 'Moderator · Kavya', 'assets/images/devesh.jpeg', 'assets/audio/devesh.mpeg'); });
document.querySelector('#ishanProfile').addEventListener('click', () => { kavyaModal.close(); openActivityProfile('Ishan (Kirti Bose)', 'Moderator · Kavya', 'assets/images/ishan-kirti-bose.jpeg', 'assets/audio/ishan-kirti-bose.mpeg'); });
document.querySelector('#mohitProfile').addEventListener('click', () => { knightModal.close(); openActivityProfile('Mohit', 'Coordinator · Knight 64', 'assets/images/mohit.jpeg', 'assets/audio/mohit.mpeg'); });
document.querySelector('#rehmanProfile').addEventListener('click', () => { pulseFrameModal.close(); openActivityProfile('Rehman', 'Moderator · Pulse of Frame', 'assets/images/rehman.jpeg', 'assets/audio/rehman.mpeg'); });
document.querySelector('#namishProfile').addEventListener('click', () => { triviaModal.close(); openActivityProfile('Namish Doshi', 'Moderator · Trivia Titans', 'assets/images/namish-doshi.jpeg', 'assets/audio/namish-doshi.ogg'); });
document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const nav = document.querySelector('#nav'); const open = nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', open);
});

const scrollReveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      scrollReveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
document.querySelectorAll('.people-section, .activities').forEach((section) => scrollReveal.observe(section));

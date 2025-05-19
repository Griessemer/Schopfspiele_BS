const NUMBER_OF_PAIRS = 6;  // Anzahl der auszuwählenden Paare (also insgesamt 2*6 Karten)

const allImages = [
  'img/Bild_001.jpg', 'img/Bild_002.jpg', 'img/Bild_003.jpg', 'img/Bild_004.jpg', 'img/Bild_005.jpg', 'img/Bild_006.jpg', 'img/Bild_007.jpg', 'img/Bild_008.jpg', 'img/Bild_009.jpg', 'img/Bild_010.jpg', 'img/Bild_011.jpg', 'img/Bild_012.jpg', 'img/Bild_013.jpg', 'img/Bild_014.jpg', 'img/Bild_015.jpg', 'img/Bild_016.jpg', 'img/Bild_017.jpg', 'img/Bild_018.jpg', 'img/Bild_019.jpg', 'img/Bild_020.jpg', 'img/Bild_021.jpg', 'img/Bild_022.jpg', 'img/Bild_023.jpg', 'img/Bild_024.jpg', 'img/Bild_025.jpg', 'img/Bild_026.jpg', 'img/Bild_027.jpg', 'img/Bild_028.jpg', 'img/Bild_029.jpg', 'img/Bild_030.jpg', 'img/Bild_031.jpg', 'img/Bild_032.jpg', 'img/Bild_033.jpg', 'img/Bild_034.jpg', 'img/Bild_035.jpg', 'img/Bild_036.jpg', 'img/Bild_037.jpg', 'img/Bild_038.jpg', 'img/Bild_039.jpg', 'img/Bild_040.jpg', 'img/Bild_041.jpg', 'img/Bild_042.jpg', 'img/Bild_043.jpg', 'img/Bild_044.jpg', 'img/Bild_045.jpg', 'img/Bild_046.jpg', 'img/Bild_047.jpg', 'img/Bild_048.jpg', 'img/Bild_049.jpg', 'img/Bild_050.jpg', 'img/Bild_051.jpg'
];

function getRandomImages(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

let images = [];
let cards = [];
let flipped = [];
let matched = 0;
let startTime;
let selected = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  selected = getRandomImages(allImages, NUMBER_OF_PAIRS);
  images = shuffle([...selected, ...selected]);

  cards = images.map((src, index) => ({
    id: index,
    src: src,
    matched: false
  }));
  startTime = new Date();
  matched = 0;
  document.getElementById('result').textContent = '';

  cards.forEach((card, index) => {
    const div = document.createElement('div');
    div.classList.add('card', 'hidden');
    div.dataset.index = index;
    div.addEventListener('click', onCardClick);
    board.appendChild(div);
  });
}

function onCardClick(e) {
  const index = e.currentTarget.dataset.index;
  const card = cards[index];
  const div = e.currentTarget;

  if (flipped.length === 2 || card.matched || flipped.includes(index)) return;

  div.classList.remove('hidden');
  div.innerHTML = `<img src="${card.src}" alt="Karte">`;
  flipped.push(index);

  if (flipped.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [i1, i2] = flipped;
  const c1 = cards[i1], c2 = cards[i2];
  const div1 = document.querySelector(`[data-index='${i1}']`);
  const div2 = document.querySelector(`[data-index='${i2}']`);

  if (c1.src === c2.src) {
    c1.matched = true;
    c2.matched = true;
    matched += 1;

    if (matched === NUMBER_OF_PAIRS) {
      const duration = Math.floor((new Date() - startTime) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      document.getElementById('result').textContent =
        `🎉 Alle Paare gefunden! Zeit: ${minutes}m ${seconds}s`;
    }
  } else {
    div1.classList.add('hidden');
    div2.classList.add('hidden');
    div1.innerHTML = '';
    div2.innerHTML = '';
  }
  flipped = [];
}

document.getElementById('restart-button').addEventListener('click', createBoard);
createBoard();

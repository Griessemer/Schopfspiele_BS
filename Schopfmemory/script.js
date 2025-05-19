const NUMBER_OF_PAIRS = 6;  // Anzahl der auszuwählenden Paare (also insgesamt 2*6 Karten)

const allImages = [
  'img/001_q.jpg', 'img/002_q.jpg', 'img/07ed480d-2723-42f7-b3bd-3be6451cbe4f_q.jpg', 'img/2013-05-09 Kopie_q.jpg', 'img/254c6b82-60ef-4717-ab7c-1af3cf24be28_q.jpg', 'img/26346ab4-202c-4260-9f5d-832631ad1f8a_q.jpg', 'img/3b2cf80e-f095-4484-a758-1f3ceb7907bf_q.jpg', 'img/3efa7e33-d88d-46fa-87d8-ce9e7f52585e_q.jpg', 'img/4d062064-70e8-47e4-9ab3-2bf6056d724b_q.jpg', 'img/4e215391-ce16-4dd9-82bf-86cb82e38427_q.jpg', 'img/4e58a74a-d2c2-4654-bf78-f13cf16dbe1a_q.jpg', 'img/603fcbbc-cccb-4467-9b8a-766fce74a9ad_q.jpg', 'img/6093990_1_wax_kr2_kl_Inline-Turnier033_q.JPG', 'img/72dd8351-345f-4505-8c32-db3cfb8eaad9_q.jpg', 'img/7dc2f7e9-27fd-4f85-ab52-ca1d2a9a98cf_q.jpg', 'img/87955059-fdcc-4584-9928-b372056ca955_q.jpg', 'img/8840d14c-d7c1-434d-874b-57644b759e2d_q.jpg', 'img/Abb_005.jpg', 'img/DSC00266_q.JPG', 'img/DSC00268_q.JPG', 'img/DSC00272_q.JPG', 'img/DSC00611_q.JPG', 'img/DSC00619_q.JPG', 'img/DSC00624_q.jpg', 'img/DSC00628_q.JPG', 'img/DSC00969.JPG', 'img/DSC00984.JPG', 'img/DSC01079.JPG', 'img/DSC01079_q.JPG', 'img/DSC01222.JPG', 'img/DSC01445_q.JPG', 'img/IMG-20150705-WA0003_q.jpg', 'img/IMG-20150705-WA0010_q.jpg', 'img/IMG-20150705-WA0024_q.jpg', 'img/IMG-20150705-WA0039_q.jpg', 'img/IMG_0787_q.JPG', 'img/IMG_0823_q.JPG', 'img/IMG_0839_q.JPG', 'img/IMG_0881_q.JPG', 'img/IMG_0940_q.JPG', 'img/IMG_0988.jpg', 'img/IMG_1085_q.jpg', 'img/IMG_1292_q.jpg', 'img/IMG_1293_q.jpg', 'img/IMG_6330_q.JPG', 'img/IMG_7650_q.jpg', 'img/LRG_DSC03676_q.jpg', 'img/Schopfaufkleber_rund_weiss.jpg', 'img/d02c9d16-62fa-4aa6-8704-d69c78f3dd41_q.jpg', 'img/gruppe_zg_03.jpg', 'img/gruppe_zg_04.jpg'
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

const audio = document.querySelector("#audio");
const shuffle = document.getElementById("shuffle");
const volumeInput = document.getElementById("volume");
const muteAudio = document.getElementById("mute");

//const middlePause = document.getElementById("middle-pause");
const musicTimeRange = document.getElementById("music-time-range");
const musicsContainer = document.querySelector(".musics-container");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const currentMusicCover = document.querySelector(".current-music-cover");
const currentMusicSinger = document.querySelector(".current-music-singer");
const currentMusictitle = document.querySelector(".current-music-title");
const playIcon = document.querySelector("#play-icon");
const coverPlayButton = document.querySelector(".cover-play-button");
const currentTime = document.querySelector(".current-time");
const fullTime = document.querySelector(".full-time");
const musicProgressBar = document.querySelector(".music-progress-bar");

musicTimeRange.addEventListener("change", (e) => {
  audio.currentTime = e.target.value;
  const musicProgressBarWidth = (audio.currentTime / audio.duration) * 100;
  musicProgressBar.style.width = musicProgressBarWidth + "%";
});

const handlePlayMusic = (audio) => {
  audio.play().then(() => {
    handleProgressBarStyle(audio)
    fullTime.innerHTML = cleanTime(audio.duration);
    handlePlayPauseUI(audio)
  });
};

function handlePlayPauseUI(audio) {
  const span = document.createElement("span");
  span.innerHTML = `<svg width="84" height="94" viewBox="0 0 84 94" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.75 0C19.9272 0 23.9332 1.65059 26.8869 4.58866C29.8406 7.52673 31.5 11.5116 31.5 15.6667V78.3333C31.5 82.4884 29.8406 86.4733 26.8869 89.4113C23.9332 92.3494 19.9272 94 15.75 94C11.5728 94 7.56676 92.3494 4.61307 89.4113C1.65937 86.4733 8.80271e-08 82.4884 0 78.3333V15.6667C0 11.5116 1.65937 7.52673 4.61307 4.58866C7.56676 1.65059 11.5728 0 15.75 0V0ZM68.25 0C72.4272 0 76.4332 1.65059 79.3869 4.58866C82.3406 7.52673 84 11.5116 84 15.6667V78.3333C84 82.4884 82.3406 86.4733 79.3869 89.4113C76.4332 92.3494 72.4272 94 68.25 94C64.0728 94 60.0668 92.3494 57.1131 89.4113C54.1594 86.4733 52.5 82.4884 52.5 78.3333V15.6667C52.5 11.5116 54.1594 7.52673 57.1131 4.58866C60.0668 1.65059 64.0728 0 68.25 0Z" fill="#F2F2F2"/>
          </svg>
          `;
  span.style.display = "inline";
  span.onclick = function () {
    if (span.style.display === "inline") {
      audio.pause();
      span.style.display = "inline-block";
      span.innerHTML = `<svg
              id="play-icon"
              width="183"
              height="170"
              viewBox="0 0 183 170"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M132.684 92.3876L60.0932 131.188C53.9327 134.478 46.0269 130.495 46.0269 123.863V46.262C46.0269 39.641 53.9213 35.6475 60.0932 38.9474L132.684 77.748C134.085 78.485 135.25 79.5503 136.06 80.8358C136.87 82.1213 137.297 83.5813 137.297 85.0678C137.297 86.5543 136.87 88.0144 136.06 89.2999C135.25 90.5854 134.085 91.6506 132.684 92.3876Z"
                fill="#F2F2F2"
              />
            </svg>`;
    } else {
      audio.play();
      span.style.display = "inline";
      span.innerHTML = `<svg width="84" height="94" viewBox="0 0 84 94" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 0C19.9272 0 23.9332 1.65059 26.8869 4.58866C29.8406 7.52673 31.5 11.5116 31.5 15.6667V78.3333C31.5 82.4884 29.8406 86.4733 26.8869 89.4113C23.9332 92.3494 19.9272 94 15.75 94C11.5728 94 7.56676 92.3494 4.61307 89.4113C1.65937 86.4733 8.80271e-08 82.4884 0 78.3333V15.6667C0 11.5116 1.65937 7.52673 4.61307 4.58866C7.56676 1.65059 11.5728 0 15.75 0V0ZM68.25 0C72.4272 0 76.4332 1.65059 79.3869 4.58866C82.3406 7.52673 84 11.5116 84 15.6667V78.3333C84 82.4884 82.3406 86.4733 79.3869 89.4113C76.4332 92.3494 72.4272 94 68.25 94C64.0728 94 60.0668 92.3494 57.1131 89.4113C54.1594 86.4733 52.5 82.4884 52.5 78.3333V15.6667C52.5 11.5116 54.1594 7.52673 57.1131 4.58866C60.0668 1.65059 64.0728 0 68.25 0Z" fill="#F2F2F2"/>
              </svg>
              `;
    }
  };
  coverPlayButton.innerHTML = "";
  coverPlayButton.appendChild(span);
}

function cleanTime(time) {
  const min = ("0" + Math.round(time / 60)).slice(-2);
  const sec = ("0" + Math.round(time % 60)).slice(-2);
  return `${min} : ${sec}`;
}

function updateCurrentMusicUI(currentMusic) {
  currentMusicCover.style.backgroundImage = `url(${currentMusic.cover})`;
  currentMusicSinger.innerHTML = currentMusic.artist;
  currentMusictitle.innerHTML = currentMusic.name;
  audio.src = currentMusic.audio;

  audio.play().then(() => {
    setInterval(() => {
      const min = ("0" + Math.round(audio.currentTime / 60)).slice(-2);
      const sec = ("0" + Math.round(audio.currentTime % 60)).slice(-2);
      currentTime.innerHTML = `${min} : ${sec}`;
      const musicProgressBarWidth = (audio.currentTime / audio.duration) * 100;
      musicProgressBar.style.width = musicProgressBarWidth + "%";
    }, 1000);
    console.log(musicTimeRange.max, audio.duration);
    musicTimeRange.max = audio.duration;
    const min = ("0" + Math.round(audio.duration / 60)).slice(-2);
    const sec = ("0" + Math.round(audio.duration % 60)).slice(-2);
    fullTime.innerHTML = `${min} : ${sec}`;
    const span = document.createElement("span");
    span.innerHTML = `<svg width="84" height="94" viewBox="0 0 84 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.75 0C19.9272 0 23.9332 1.65059 26.8869 4.58866C29.8406 7.52673 31.5 11.5116 31.5 15.6667V78.3333C31.5 82.4884 29.8406 86.4733 26.8869 89.4113C23.9332 92.3494 19.9272 94 15.75 94C11.5728 94 7.56676 92.3494 4.61307 89.4113C1.65937 86.4733 8.80271e-08 82.4884 0 78.3333V15.6667C0 11.5116 1.65937 7.52673 4.61307 4.58866C7.56676 1.65059 11.5728 0 15.75 0V0ZM68.25 0C72.4272 0 76.4332 1.65059 79.3869 4.58866C82.3406 7.52673 84 11.5116 84 15.6667V78.3333C84 82.4884 82.3406 86.4733 79.3869 89.4113C76.4332 92.3494 72.4272 94 68.25 94C64.0728 94 60.0668 92.3494 57.1131 89.4113C54.1594 86.4733 52.5 82.4884 52.5 78.3333V15.6667C52.5 11.5116 54.1594 7.52673 57.1131 4.58866C60.0668 1.65059 64.0728 0 68.25 0Z" fill="#F2F2F2"/>
      </svg>
      `;
    span.style.display = "inline";
    span.onclick = function () {
      if (span.style.display === "inline") {
        console.log("a");
        audio.pause();
        span.style.display = "inline-block";
        span.innerHTML = `<svg
          id="play-icon"
          width="183"
          height="170"
          viewBox="0 0 183 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M132.684 92.3876L60.0932 131.188C53.9327 134.478 46.0269 130.495 46.0269 123.863V46.262C46.0269 39.641 53.9213 35.6475 60.0932 38.9474L132.684 77.748C134.085 78.485 135.25 79.5503 136.06 80.8358C136.87 82.1213 137.297 83.5813 137.297 85.0678C137.297 86.5543 136.87 88.0144 136.06 89.2999C135.25 90.5854 134.085 91.6506 132.684 92.3876Z"
            fill="#F2F2F2"
          />
        </svg>`;
      } else {
        console.log("b");
        audio.play();
        span.style.display = "inline";
        span.innerHTML = `<svg width="84" height="94" viewBox="0 0 84 94" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.75 0C19.9272 0 23.9332 1.65059 26.8869 4.58866C29.8406 7.52673 31.5 11.5116 31.5 15.6667V78.3333C31.5 82.4884 29.8406 86.4733 26.8869 89.4113C23.9332 92.3494 19.9272 94 15.75 94C11.5728 94 7.56676 92.3494 4.61307 89.4113C1.65937 86.4733 8.80271e-08 82.4884 0 78.3333V15.6667C0 11.5116 1.65937 7.52673 4.61307 4.58866C7.56676 1.65059 11.5728 0 15.75 0V0ZM68.25 0C72.4272 0 76.4332 1.65059 79.3869 4.58866C82.3406 7.52673 84 11.5116 84 15.6667V78.3333C84 82.4884 82.3406 86.4733 79.3869 89.4113C76.4332 92.3494 72.4272 94 68.25 94C64.0728 94 60.0668 92.3494 57.1131 89.4113C54.1594 86.4733 52.5 82.4884 52.5 78.3333V15.6667C52.5 11.5116 54.1594 7.52673 57.1131 4.58866C60.0668 1.65059 64.0728 0 68.25 0Z" fill="#F2F2F2"/>
          </svg>
          `;
      }
    };
    coverPlayButton.innerHTML = "";
    coverPlayButton.appendChild(span);
  });
}

function shuffleMusic(){
  const randomMusic = Math.floor(Math.random()*musics().length);
  updateCurrentMusicUI(musics()[randomMusic]);
};
shuffle.addEventListener("click", shuffleMusic);

let indexOfCurrentMusic = 0;

nextButton.addEventListener("click", (e) => {
  indexOfCurrentMusic++;
  updateCurrentMusicUI(musics()[indexOfCurrentMusic]);
});

prevButton.addEventListener("click", (e) => {
  indexOfCurrentMusic--;
  updateCurrentMusicUI(musics()[indexOfCurrentMusic]);
});

function volumeChange() {
  audio.volume  = volumeInput.value / 10;
  localStorage.setItem('volume' ,JSON.stringify(audio.volume));
};
volumeInput.addEventListener("change", volumeChange);

function mute() {
  if (audio.muted) {
    audio.muted = false;
    volumeChange();
    muteAudio.setAttribute("class", "fa fa-volume-up fs-2  ms-19 mt-2");
  } else {
    audio.muted = true;
    audio.volume = 0;
    muteAudio.setAttribute("class", "fa fa-volume-off ms-19 fs-2 mt-2 me-3");
  }
};
muteAudio.addEventListener("click", mute);

function handleProgressBarStyle(audio) {
  musicTimeRange.max = audio.duration;
  setInterval(() => {
    currentTime.innerHTML = cleanTime(audio.currentTime);
    const musicProgressBarWidth = (audio.currentTime / audio.duration) * 100;
    musicProgressBar.style.width = musicProgressBarWidth + "%";
  }, 1000);
}

function musics() {
  return [
    {
      id: 1,
      details: "detals of musice folan ",
      name: "Nakhoda",
      artist: "Macan band",
      cover:
        "https://gratomic.ir/tVNUnHFGQEX8mnG3egQ7tQAwzZRCZSgfb9J3c7J6LepkF2YzvDHxvp997ZtKmfcgMjHSPrzqQsr98TGwtGDkeKB5VkSHMK7fcbbSNu6739KPbSrrvvBVVfYnPaVZfsyJ/uploads/2019/10/Auto_Draft-20191020_173245-Gratomic.com_.jpg",
      ccolor: ["#844C6B", "37407E"],
      active: true,
      audio:
        "https://downloadmusic.gratomic.ir/music/dl/archive/2019/10/22/Macan_Band-Nakhoda_Gratomic.com.mp3",
    },
    {
      id: 2,
      details: "detals of musice folan ",
      name: "Parvaz",
      artist: "Ali yasini",
      cover: "https://www.ganja2music.com/wp-content/themes/Ganja2music-V4/js/timthumb.php?src=/Image/Post/8.2019/Ali%20Yasini%20-%20Parvaz.jpg&h=450&w=450&zc=0",
      ccolor: ["#844C6B", "37407E"],
      active: false,
      audio:
        "https://dl.ganja2music.com/Ganja2Music/Archive/A/Ali%20Yasini/Single/Ali%20Yasini%20-%20Parvaz.mp3",
    },
    {
      id: 3,
      details: "detals of musice folan ",
      name: "Shabe akhar",
      artist: "Haamim",
      cover:
        "https://www.ganja2music.com/wp-content/themes/Ganja2music-V4/js/timthumb.php?src=/Image/Post/2.2022/Haamim%20-%20Shabe%20Akhar.jpg&h=450&w=450&zc=0",
      ccolor: ["#844C6B", "37407E"],
      active: false,
      audio:
        "https://dl.ganja2music.com/Ganja2Music/Archive/H/Haamim/Single/Haamim%20-%20Shabe%20Akhar.mp3",
    },
    {
      id: 4,
      details: "detals of musice folan ",
      name: "Deli",
      artist: "Shayea & Sadegh",
      cover: "https://gratomic.ir/tVNUnHFGQEX8mnG3egQ7tQAwzZRCZSgfb9J3c7J6LepkF2YzvDHxvp997ZtKmfcgMjHSPrzqQsr98TGwtGDkeKB5VkSHMK7fcbbSNu6739KPbSrrvvBVVfYnPaVZfsyJ/uploads/2022/03/20220305_082412-Gratomic.com_.jpg",
      ccolor: ["#844C6B", "37407E"],
      active: false,
      audio:
        "https://downloadmusic.gratomic.ir/music/dl/archive/2022/03/05/Shayea-Deli_Hr_ft_Sadegh__Gratomic.com.mp3",
    },
    {
      id: 5,
      details: "detals of musice folan ",
      name: "Khaar",
      artist: "Tataloo",
      cover:
        "https://assets.rjassets.com/static/mp3/amir-tataloo-khaar/dd8ebf926d3e547.jpg",
      ccolor: ["#844C6B", "37407E"],
      active: false,
      audio:
        "https://dl.my-ahangha.ir/up/2019/Amir%20Tataloo%20-%20Khaar.mp3",
    },
    {
      id: 6,
      details: "detals of musice folan ",
      name: "Lal",
      artist: "Yas",
      cover:
        "https://assets.rjassets.com/static/mp3/yas-lal/5984cd0184c9ea8.jpg",
      ccolor: ["#844C6B", "37407E"],
      active: false,
      audio:
        "https://dl.my-ahangha.ir/up/2020/Yas%20-%20Lal.mp3",
    },
  ];
}

  const musicCard =(song)=>`
  <figure data-id="${song.id}" class="music-card">
    <img
      class="music-cover"
      src="${song.cover}"
      alt="${song.name} ${song.artist}"
   />
   <figcaption class="music-desc">
     <div class="play-icon">
       <svg
         width="27"
         height="27"
         viewBox="0 0 27 27"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           d="M24.9622 15.6979L4.68019 26.607C2.95894 27.5319 0.75 26.412 0.75 24.5475V2.7293C0.75 0.867773 2.95575 -0.255052 4.68019 0.672755L24.9622 11.5819C25.3538 11.7891 25.6793 12.0886 25.9056 12.45C26.132 12.8115 26.2513 13.222 26.2513 13.6399C26.2513 14.0578 26.132 14.4683 25.9056 14.8298C25.6793 15.1912 25.3538 15.4907 24.9622 15.6979Z"
           fill="#F2F2F2"
         />
       </svg>
     </div>
     <div class="music-details">
       <div class="artist">
         <svg
           class="singer-icon"
           width="11"
           height="15"
           viewBox="0 0 11 15"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             d="M5.49996 0.214294C4.77536 0.214294 4.08042 0.502144 3.56805 1.01452C3.05567 1.5269 2.76782 2.22183 2.76782 2.94644V7.80358C2.76782 8.16237 2.83849 8.51765 2.97579 8.84913C3.1131 9.18061 3.31435 9.48179 3.56805 9.7355C3.82175 9.9892 4.12294 10.1904 4.45442 10.3278C4.7859 10.4651 5.14117 10.5357 5.49996 10.5357C5.85875 10.5357 6.21403 10.4651 6.54551 10.3278C6.87699 10.1904 7.17818 9.9892 7.43188 9.7355C7.68558 9.48179 7.88683 9.18061 8.02414 8.84913C8.16144 8.51765 8.23211 8.16237 8.23211 7.80358V2.94644C8.23211 2.22183 7.94426 1.5269 7.43188 1.01452C6.9195 0.502144 6.22457 0.214294 5.49996 0.214294V0.214294ZM1.55354 7.34822C1.55354 7.22745 1.50556 7.11163 1.42017 7.02624C1.33477 6.94084 1.21895 6.89287 1.09818 6.89287C0.977411 6.89287 0.861589 6.94084 0.776193 7.02624C0.690797 7.11163 0.642822 7.22745 0.642822 7.34822V7.80358C0.642787 9.01297 1.09393 10.1789 1.90801 11.0732C2.72209 11.9676 3.84055 12.5261 5.04461 12.6395V14.3304C5.04461 14.4511 5.09258 14.567 5.17798 14.6524C5.26337 14.7377 5.3792 14.7857 5.49996 14.7857C5.62073 14.7857 5.73655 14.7377 5.82195 14.6524C5.90735 14.567 5.95532 14.4511 5.95532 14.3304V12.6395C7.15938 12.5261 8.27784 11.9676 9.09192 11.0732C9.906 10.1789 10.3571 9.01297 10.3571 7.80358V7.34822C10.3571 7.22745 10.3091 7.11163 10.2237 7.02624C10.1383 6.94084 10.0225 6.89287 9.90175 6.89287C9.78098 6.89287 9.66516 6.94084 9.57976 7.02624C9.49437 7.11163 9.44639 7.22745 9.44639 7.34822V7.80358C9.44639 8.85024 9.03061 9.85403 8.29051 10.5941C7.55041 11.3342 6.54662 11.75 5.49996 11.75C4.45331 11.75 3.44952 11.3342 2.70942 10.5941C1.96932 9.85403 1.55354 8.85024 1.55354 7.80358V7.34822Z"
             fill="#4F4F4F"
           />
         </svg>
         <p class="singer-name">${song.artist}</p>
       </div>
       <div class="music-name">
         <svg
           width="8"
           height="12"
           viewBox="0 0 8 12"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             d="M3.99994 1.91667V6.90417C3.45161 6.58917 2.77494 6.46667 2.05744 6.7175C1.27578 6.9975 0.674944 7.69167 0.534944 8.50833C0.470223 8.8758 0.494413 9.25342 0.605491 9.60963C0.71657 9.96583 0.911309 10.2903 1.17343 10.5558C1.43555 10.8214 1.75743 11.0203 2.11216 11.136C2.46689 11.2517 2.84417 11.2808 3.21244 11.2208C4.35578 11.04 5.16661 9.99 5.16661 8.82917V3.08333H6.33328C6.97495 3.08333 7.49995 2.55833 7.49995 1.91667C7.49995 1.275 6.97495 0.75 6.33328 0.75H5.16661C4.52494 0.75 3.99994 1.275 3.99994 1.91667Z"
             fill="#4F4F4F"
           />
         </svg>
         <p class="music-name-text">${song.name}</p>
       </div>
     </div>
   </figcaption>
 </figure>`;

 function setCurrentMusic() {
  [...musicsContainer.children].forEach((songElement) => {
    songElement.addEventListener("click", () => {
      indexOfCurrentMusic = musics().findIndex(
        (item) => item.id === parseInt(songElement.dataset.id)
      );
      const currentMusic = musics().filter(
        (item) => item.id === parseInt(songElement.dataset.id)
      )[0];
      currentMusicCover.setAttribute("data-id", currentMusic.id);
      currentMusicCover.style.backgroundImage = `url(${currentMusic.cover})`;
      currentMusicSinger.innerHTML = currentMusic.artist;
      currentMusictitle.innerHTML = currentMusic.name;
      audio.src = currentMusic.audio;
      handlePlayMusic(audio);
    });
  });
}

musicCards()
function musicCards() {
  musics().forEach((song) => {
    musicsContainer.innerHTML += musicCard(song);
    setCurrentMusic();
  });
}

// function playAndPauseMatch(){
//   if (audio.paused) {
//     middlePause.setAttribute("class", "fa fa-play");
//     middlePause.style.fontSize = "2.2rem";
//   }  else {
//     middlePause.setAttribute("class", "fa fa-pause");
//     middlePause.style.fontSize = "2rem";
//   }
// }
// playPause.addEventListener("click", playAndPauseMatch);
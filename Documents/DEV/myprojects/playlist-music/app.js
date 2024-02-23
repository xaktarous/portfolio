const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "kalimba",
    artist: "Mr. Scruff",
    duration: "5:48",
    src: "musics/Kalimba.mp3",
  },
  {
    id: 1,
    title: "Mariama",
    artist: "Labess",
    duration: "4:18",
    src: "musics/LABES.mp3",
  },
  {
    id: 2,
    title: "Dinar",
    artist: "Djam",
    duration: "4:25",
    src: "musics/Dinar.mp3",
  },
  {
    id: 3,
    title: "EL kess yaddor",
    artist: "Labess",
    duration: "3:36",
    src: "musics/alkass.mp3",
  },
  {
    id: 4,
    title: "Douga Douga",
    artist: "Gnawa diffusion",
    duration: "5:20",
    src: "musics/dougadouga.mp3",
  },
  {
    id: 5,
    title: "Hchiche & pois chiche",
    artist: "Djam",
    duration: "4:39",
    src: "musics/hchich.mp3",
  },
  {
    id: 6,
    title: "Lillah",
    artist: "Khaled",
    duration: "3:25",
    src: "musics/lillah.mp3",
  },
  {
    id: 7,
    title: "Babour El leuh",
    artist: "Labess",
    duration: "5:43",
    src: "musics/baborelouh.mp3",
  },
  {
    id: 8,
    title: "Echemaa",
    artist: "Labess",
    duration: "5:35",
    src: "musics/echmaa.mp3",
  },
  {
    id: 9,
    title: "Raba Raba",
    artist: "Khaled",
    duration: "5:37",
    src: "musics/Raba-Raba.mp3",
  },
];

const audio = new Audio();

let userData={
    songs:[...allSongs],
    currentSong:null,
    currentTimeSong:0
}

const afficher=()=>{
    playlistSongs.innerHTML= userData?.songs.map(({id,title,artist,duration})=>
        `<li id="${id}-song" class="playlist-song-info">
        <button  type="button" class="playlist-song" onclick="player(${id})">
        <span class="playlist-song-title">${title}</span>
        <span class="playlist-song-artist">${artist}</span>
        <span class="playlist-song-duration">${duration}</span>
        </button> 
        <button type="button"class="playlist-song-delete" onclick="deleteFunc(${id})">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
        </li>`
        
    ).join("")
}

afficher();


playButton.addEventListener("click",()=>{
  
    if(userData?.currentSong===null){
        player(userData?.songs[0].id);
    }else{
        player(userData?.currentSong.id);
    }
});
const player = (id)=>{
   
    const song =userData?.songs.find((songs)=> id===songs.id);
    audio.src=song.src;
    audio.title=song.title;
   
    if(userData?.currentSong===null || userData?.currentSong.id !==song.id){
        audio.currentTime=0; 
    }else{
        audio.currentTime=userData?.currentTimeSong;
        
    }

    userData.currentSong=song;
    playButton.classList.add("playing");
    playerdisplay(id);
    textplayerdisplay(id);
    audio.play(); 
   
}



pauseButton.addEventListener("click" , ()=>{

    playButton.classList.remove("playing");
    audio.pause();
    userData.currentTimeSong=audio.currentTime;
   
})

previousButton.addEventListener("click",()=>{
  if(userData?.currentSong===null || userData?.currentSong===userData?.songs[0]){
    player(userData?.songs[0].id);
  }else{
    const currentid =userData?.songs.findIndex(song=>song.id===userData?.currentSong.id);
    player(userData?.songs[currentid-1].id);
  }
})

nextButton.addEventListener("click",()=>{
 
  nextButtonFunc();
})

shuffleButton.addEventListener("click",()=>{
  if(userData?.songs[ Math.floor(Math.random()* userData?.songs.length)]!== userData?.currentSong){
     player(userData?.songs[ Math.floor(Math.random()* userData?.songs.length)].id)
  }else{
    nextButtonFunc();
  }
})

const nextButtonFunc=()=>{

  if(userData?.currentSong===userData?.songs[userData?.songs.length-1]){
    player(userData?.songs[userData?.songs.length-1].id);
  }else{
    if(userData?.currentSong===null){
      player(userData?.songs[0].id);
    }else{
    const currentid =userData?.songs.findIndex(song=>song.id===userData?.currentSong.id);
    player(userData?.songs[currentid+1].id);
   
    }
  }
}

const deleteFunc=(id)=>{
  audio.pause()
  const songId=userData?.songs.findIndex(song=>song.id===id);
  userData?.songs.splice(songId,1);
  userData.currentSong=null;
  userData.currentTimeSong=0;
  playButton.classList.remove("playing");
  textplayerdisplay(id);
  afficher();
  if(userData?.songs.length===0){
    textplayerdisplay(id);
    resetplaylistfunc();
  }
 
}

const playerdisplay=(id)=>{
  const song=userData?.songs.find(song=>song.id===id);
  userData?.songs.forEach(song=>{
    const li=document.getElementById(`${song.id}-song`);
    li.removeAttribute("aria-current");
  })
  const li=document.getElementById(`${song.id}-song`);
  li.setAttribute("aria-current","true")
}
const textplayerdisplay=(id)=>{
  const song=userData?.songs.find(song=>song.id===id); 
  const p1=document.getElementById("player-song-title");
  const p2=document.getElementById("player-song-artist");
  p1.innerText=song?.title?song?.title:"";
  p2.innerText=song?.artist?song?.artist:"";
}


const next=(id)=>{
  const song=userData?.songs.find(song=>song.id===id); 
  audio.pause();
  console.log(audio.currentTime)
  console.log(audio.currentSrc);
}


const resetplaylistfunc=()=>{
  userData={
    songs:[...allSongs],
    currentSong:null,
    currentTimeSong:0
}
  playlistSongs.innerHTML=`<button  type="button" onclick="afficher()"> Reset Button </button>`;
  

}

audio.addEventListener("ended",()=>{
  nextButtonFunc();
})
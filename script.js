let songName = document.querySelector("#heading2");
let previous = document.querySelector("#previous");
let play = document.querySelector("#play");
let foward = document.querySelector("#foward");
let musics = document.querySelector("#musics");

let currentTimeEl = document.querySelector("#current-time");
let durationEl = document.querySelector("#duration");
let progressBar = document.querySelector("#progress-bar");


let isPlaying = false;

play.addEventListener('click', function() {
    if(isPlaying) {

        musics.pause();

        isPlaying = false;

        play.innerHTML = '<i class="ri-play-line"></i>';
    } else {

        musics.play();

        isPlaying = true;

        play.innerHTML = '<i class="ri-pause-line"></i>';
    }
});

// Helper function to turn seconds into minutes:seconds format
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
}

// 1. As the song plays, update the slider position and timestamps
musics.addEventListener('timeupdate', function() {
    if (musics.duration) {
        let progressPercent = (musics.currentTime / musics.duration) * 100;
        progressBar.value = progressPercent;

        currentTimeEl.innerText = formatTime(musics.currentTime);
        durationEl.innerText = formatTime(musics.duration);
    }
});

// 2. When you drag the slider, jump to that spot in the song
progressBar.addEventListener('input', function() {
    let seekTime = (progressBar.value / 100) * musics.duration;
    musics.currentTime = seekTime;
});

let songs = [
    {
        title: "Pavazha Malli",
        src: "music1.mp3"
    },

    {
        title: "Aasa Kooda",
        src: "music2.mp3",
    },

    {
        title: "Hukum",
        src: "music3.mp3",
    },

    {
        title: "Jaan Se Guzarte Hain",
        src: "music4.mp3",
    },

    {
        title: "They Dont't Care About Us",
        src: "music5.mp3",
    }
]

let currentSongIndex = 0;
function loadSong(song) {
    songName.innerText = song.title;
    musics.src = song.src;
}

loadSong(songs[currentSongIndex]);

foward.addEventListener('click', function(){
    currentSongIndex++;

    if(currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(songs[currentSongIndex]);
    musics.play();
    play.innerHTML = '<i class="ri-pause-line"></i>';
});

previous.addEventListener('click', function() {
    currentSongIndex--;

    if(currentSongIndex <= 0) {
        currentSongIndex = songs.length-1;
    }

    loadSong(songs[currentSongIndex]);
    musics.play();
    play.innerHTML = '<i class="ri-pause-line"></i>';
});
console.log("Welcome to spotify")

//Intialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/10BOBBY.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressbar = document.getElementById("myProgressbar");
let gif = document.getElementById("gif");
let mastersongname = document.getElementById("mastersongname");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let song =[
    {songname:"Chabi kho jaye", filePath:"songs/10BOBBY.mp3", coverPath:"listbg.png"},
    {songname:"01 PREM ROG = BHANVRE NE KHILAYA.mp3", filePath:"songs/01 PREM ROG = BHANVRE NE KHILAYA.mp3", coverPath:"listbg.png"},
    {songname:"01 VANSH = AAKE TERI BAHON MEIN .mp3", filePath:"songs/01 VANSH = AAKE TERI BAHON MEIN .mp3", coverPath:"listbg.png"},
    {songname:"02 GEET = YE BATA DO.mp3", filePath:"songs/02 GEET = YE BATA DO.mp3", coverPath:"listbg.png"},
    {songname:"02 HAMRAAZ = NEEL GAGAN KE TALE.mp3", filePath:"songs/02 HAMRAAZ = NEEL GAGAN KE TALE.mp3", coverPath:"listbg.png"},
    {songname:"002 HIMALAY KI= CHAND SI MAHEBOOBA.mp3", filePath:"songs/002 HIMALAY KI GOD MEIN = CHAND SI MAHEBOOBA.mp3", coverPath:"listbg.png"},
    {songname:"002 MARYADA = ZUBAN PE DARD BHARI.mp3", filePath:"songs/002 MARYADA = ZUBAN PE DARD BHARI.mp3", coverPath:"listbg.png"},
]


songItems.forEach((element ,i)=> {
    //console.log(element, i);
    element.getElementsByTagName('img')[0].src = song[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = song[i].songname;
});

// Handle play/pause click
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// handle progress bar
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressbar.value = progress;

})

myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressbar.value*audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener(('click'), (e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = `songs/${songIndex}.mp3`;
            mastersongname.innerText = song[songIndex].songname;
            audioElement.currentTime = 0
            audioElement.play()
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else{
            audioElement.pause()
            gif.style.opacity = 0;
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
    })
})


document.getElementById('next').addEventListener(('click'), ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    mastersongname.innerText = song[songIndex].songname;
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener(('click'), ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    mastersongname.innerText = song[songIndex].songname;
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
// script.js
const durationDisplay = document.getElementById("audio-duration");
const  currentTimeDisplay = document.getElementById("current-time");



// const wavesurfer = WaveSurfer.create({
//   container: '#audio-spectrum',
//   waveColor: 'rgb(200, 0, 200)',
//   progressColor: 'rgb(100, 0, 100)',
//   url: '../audio/4.mp3',
// })

// wavesurfer.on('click', () => {
//   wavesurfer.play()
// })


const wavesurfer = WaveSurfer.create({
    container: '#audio-spectrum', // ID du conteneur
    waveColor: '#707070', // Couleur des vagues
    progressColor: '#FFFFFF', // Couleur de la progression
    barWidth: 2, // Largeur des barres
    barHeight: 6, // Hauteur des barres
    barGap: 1, // Espacement entre les barres
    barRadius: 2, // Rayon des barres
    responsive: true, // Rend le spectre adaptatif
    url: '../audio/4.mp3'
   
  })

//   wavesurfer.load('../audio/sample-file-1.mp3');  

wavesurfer.on('ready', function () {
    console.log('Le spectre est prêt.');

    // Enable the play button
   

    // Get and display the duration
    var duration = wavesurfer.getDuration(); // Get the duration in seconds
    durationDisplay.textContent = formatTime(duration); // Format and display
    console.log('Durée de l\'audio :', duration, 'secondes');
});

wavesurfer.on('audioprocess', function () {
    var currentTime = wavesurfer.getCurrentTime(); // Temps écoulé en secondes
    // var duration = wavesurfer.getDuration(); // Durée totale en secondes
    // var remainingTime = duration - currentTime; // Temps restant

    // Update the display
    currentTimeDisplay.textContent = formatTime(currentTime);
    // remainingTimeDisplay.textContent = formatTime(remainingTime);
});


    // Initialisation de WaveSurfer
    // const wavesurfer = WaveSurfer.create({
    //     container: '#waveform',
    //     waveColor: '#fff',
    //     progressColor: '#141515'
    //     // barWidth: 2,
    //     // height: 150,
    //     // responsive: true,
    //     // hideScrollbar: true,
    // });

    // Charger un fichier audio
    // wavesurfer.load('../audio/1.mp3'); // Remplacez avec le chemin de votre fichier audio

    // Gestion du bouton Play/Pause
    const playPauseButton = document.getElementById('playPause');
    playPauseButton.addEventListener('click', () => {
        console.log('Bouton Play/Pause clique');
        if (wavesurfer.isPlaying()) {
            wavesurfer.pause();
            playPauseButton.innerHTML=`<i class="fas fa-pause fs-1"></i>`;
        } else {
            wavesurfer.play();
            playPauseButton.innerHTML=`<i class="fas fa-play fs-1"></i>`;
        }
    });


    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hours > 0) {
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        } else {
            return `00:${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
    }
    

    // podcast
      // Initialisation du carousel de podcast mis à jour
      $('.podcast-carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });

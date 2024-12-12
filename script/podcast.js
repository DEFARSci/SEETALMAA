// script.js
const durationDisplay = document.getElementById("audio-duration");
const  currentTimeDisplay = document.getElementById("current-time");
const mostViewpodcast=['most_1','most_2','most_3','most_4','most_5','most_6','most_7','most_8','most_9','most_10'];
const plusvues=['0','1','2','3','4','5','6'];


const text = localStorage.getItem('titleText');

// Afficher le texte sur la page
document.getElementById('displayTitle').textContent = text;


async function fetchPageData() {
    const data = await fetchPostData();
    const imageIndexes = [1,2,3,4,5,6,7];
  
    // Afficher les images
    await Promise.all(imageIndexes.map(index => displayImage(data, `img_${index}`, index)));

    plusvues.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, index));


    mostViewpodcast.forEach((item, index) => displayTitle(data, item,null, index));

}

 // Appel à la fonction principale une fois que la page est prête
 document.addEventListener('DOMContentLoaded', async () => {
    try {
      await fetchPageData();
    } catch (error) {
      console.error('Erreur lors de l\'affichage des données:', error);
    }
  });

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
        slidesToShow: 4.2,
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

    // Fonction pour afficher le titre
async function displayTitle(data, titleId, categoriesId = null, numPost) {
    const post = data[numPost];
    const titleElement = document.getElementById(titleId);
  
    // Vérification de l'élément titre et mise à jour du contenu
    if (titleElement) {
        titleElement.innerHTML = post.title.rendered;
        titleElement.setAttribute('data-id', post.slug);
        titleElement.style.display = "inline";
    } else {
        console.error(`Élément avec l'ID ${titleId} introuvable.`);
        return;
    }
  
    // Si un categoriesId est fourni, on tente de récupérer le nom de la catégorie
    if (categoriesId !== null) {
        const categoryElement = document.getElementById(categoriesId);
        if (!categoryElement) {
            console.error(`Élément avec l'ID ${categoriesId} introuvable dans le DOM.`);
            return;
        }
  
        const categoryName = await fetchCategoryName(post.categories[0]);
        categoryElement.innerHTML = categoryName ? categoryName : `<p class="text-danger">Inconnu</p>`;
    } else {
        console.log(`Categorie ID n'a pas été fourni.,${titleId }`);
    }
  }

//   categorie
async function fetchCategoryName(categoryId) {
    //  localStorage.removeItem(`category_${categoryId}`);
    const cachedCategory = localStorage.getItem(`category_${categoryId}`);
    if (cachedCategory) {
        console.log(`Catégorie ${categoryId} chargée depuis le LocalStorage.`);
        return cachedCategory;
    }
  
    const response = await fetch(`${siteUrl}/wp-json/wp/v2/categories/${categoryId}`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }
  
    const category = await response.json();
    localStorage.setItem(`category_${categoryId}`,category && category.name ? category.name : "Inconnue"); // Mise en cache
    console.log(`Catégorie ${categoryId} récupérée depuis le serveur.`);
      return category && category.name ? category.name : "Inconnue";
  
  }

  async function fetchPostData() {
    const cachedData = localStorage.getItem('postData');
  
      if (cachedData) {
          console.log("Données chargées depuis le LocalStorage.");
          return JSON.parse(cachedData);
      }
  
      const response = await fetch(siteUrl + '/wp-json/wp/v2/posts?per_page=10&page=1');
      if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
      }
  
      const data = await response.json();
      localStorage.setItem('postData', JSON.stringify(data)); // Mise en cache des données
      console.log("Données récupérées depuis le serveur.");
      return data;
  
  }


//   displaye image
async function displayImage(data, imageId, numpost) {
    // Vérification de l'élément image avant de continuer
    const imgElement = document.getElementById(imageId);
    if (!imgElement) {
      console.error(`L'élément avec l'ID ${imageId} n'existe pas.`);
      return; // Arrêter si l'élément n'existe pas
    }
    // Assure-toi que numpost est un index valide dans data
    const post = data[numpost];
    if (!post) {
      console.error(`Aucun post trouvé pour l'index ${numpost}`);
      return;
    }
    try {
      // Récupération de l'URL de l'image associée au post
      const imageUrl = await fetchFeaturedMedia(post.featured_media);
      // Mise à jour de l'élément image avec l'URL et les informations du post
      imgElement.src = imageUrl;
      imgElement.alt = post.title.rendered || 'Image';
      imgElement.title = post.title.rendered || 'Image';
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'image pour le post ${numpost}:`, error);
    }
  }
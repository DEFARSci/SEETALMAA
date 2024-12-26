const siteUrl = 'https://setalmaa.com';  
const toggleButton=document.getElementById('voire_plus');
const content=document.getElementById('containe_cache');
// const quote=document.getElementById('quote');
// const Opinionbtn=document.getElementById('opinion');
// const sportbtn=document.getElementById('sport');
// const culturebtn=document.getElementById('culture');
// const lifestylebttn=document.getElementById('lifestyle');

const Headlines=['title_0','title_1','title_2','title_3','title_4','title_5','title_6',
    'title_7','title_8','title_9','title_10','title_11','title_12','title_13'];
const News_in_focus=['title_14','title_15','title_16'];
const Spotlight=['title_17','title_18','title_19','title_20','title_21','title_22','title_23','title_24'];
const Opinion=['25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46'];

const sport=['title_31','title_32','title_33','title_34','title_35','title_36','title_37','title_38','title_39','title_40','title_41','title_42','title_43'];
const allTitles = [ ...Opinion];
const mostView=['most_1','most_2','most_3','most_4','most_5','most_6','most_7','most_8','most_9','most_10','most_11','most_12','most_13','most_14','most_15','most_16','most_17','most_18','most_19','most_20'];

// RÃ©cupÃ©ration des donnÃ©es de l'article

async function fetchPageData() {
  try {
       const data = await fetchPostData();
    
    //  Opinion

    Opinion.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, 25 + index));
    await Promise.all([25, 26, 27, 28, 29, 30, 31, 32, 33, 34].map(index => displayImage(data, `img_${index}`, index)));
    mostView.forEach((item, index) => displayTitle(data, item,null, index));


    // for (let i = 0; i < Opinion.length; i++) {
    //     displayTitle(data, "title_"+Opinion[i],"categories_"+Opinion[i], 25+i);
    //   }
    await Promise.all([25,29].map(index => displayContent(data, `article_${index}`, index)));

   
   
  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
  }
}

// Fonction pour récupérer les données des posts
async function fetchPostData() {
  const cachedData = localStorage.getItem('postData');

    if (cachedData) {
        console.log("Données chargées depuis le LocalStorage.");
        return JSON.parse(cachedData);
    }

    const response = await fetch(siteUrl + '/wp-json/wp/v2/posts?per_page=50&page=1');
    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem('postData', JSON.stringify(data)); // Mise en cache des données
    console.log("Données récupérées depuis le serveur.");
    return data;

}


async function fetchFeaturedMedia(mediaId) {
  const cachedUrl = localStorage.getItem(`image_${mediaId}`);
  if (cachedUrl) {
      console.log(`Image ${mediaId} chargée depuis le LocalStorage.`);
      return cachedUrl;
  }

  const response = await fetch(`${siteUrl}/wp-json/wp/v2/media/${mediaId}`);
  if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
  }

  const media = await response.json();
  const imageUrl = media.source_url;

  localStorage.setItem(`image_${mediaId}`, imageUrl); // Mise en cache de l'URL
  console.log(`Image ${mediaId} récupérée depuis le serveur.`);
  return imageUrl;
}

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
async function fetchCategoryName(categoryId) {
  try {
      const response = await fetch(`${siteUrl}/wp-json/wp/v2/categories/${categoryId}`);
      if (!response.ok) {
          console.error(`Erreur de récupération de la catégorie : ${response.status} - ${response.statusText}`);
          return null;
      }
      
      const categoryData = await response.json();
      return categoryData && categoryData.name ? categoryData.name : "Inconnue";
  } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      return null;
  }
}

// Fonction pour afficher le contenu de l'article
async function displayContent(data,contentid,numpost) {
  //   const data = await fetchPostData();
    const post = data[numpost];
    const content = post.content.rendered;
    
   
    // Découpe le contenu en mots et limite à 20 mots, tout en gardant le HTML
    const mots = content.split(' ');
    const truncatedContent = mots.slice(0, 25).join(' ') + '...';
  
    // Insère le contenu HTML dans l'élément cible
    const contentElement = document.getElementById(contentid);
    contentElement.innerHTML = truncatedContent;
  
    // Modifier les styles des balises spécifiques (si présentes)
    const h1 = contentElement.querySelector('h1');
    if (h1) {
      h1.style.fontSize = '15px'; // Modifie la taille du texte pour <h1>
      // Exemple de changement de couleur
    }
  
    const span = contentElement.querySelector('span');
    if (span) {
      span.style.fontSize = '15px'; // Modifie la taille du texte pour <span>
     // Exemple de changement de couleur
    }
  }

// Fonction pour afficher l'auteur


// Fonction pour afficher l'image à la une
async  function displayImage(data,imageId,numpost) {
//   const data = await  fetchPostData();  
 
  const post = data[numpost];
  
  const imageUrl = await fetchFeaturedMedia(post.featured_media);
  
  const imgElement = document.getElementById(imageId);
  if (imgElement) {
      imgElement.src = imageUrl;
  } else {
      console.error(`L'élément avec l'ID ${imageId} n'existe pas.`);
  }
}
document.addEventListener('DOMContentLoaded', async () => {
    try {
         fetchPageData();
    } catch (error) {
        console.error('Erreur lors de l\'affichage des données:', error);
    }
  });
      
  
  
  function setupLinkRedirection(linkId) {
      const linkElement = document.getElementById(linkId);
      if (!linkElement) {
          console.error(`Aucun élément trouvé avec l'ID: ${linkId}`);
          return; // Sortir si l'élément n'existe pas
      }
  
      // Ajouter un écouteur d'événement "click" pour rediriger l'utilisateur
      linkElement.addEventListener('click', function(event) {
          event.preventDefault(); // Empêche le comportement par défaut du lien
          const slug = this.getAttribute('data-id');
          console.log("ID du post cliqué : " + slug);
        
  
          // // Rediriger vers une URL basée sur le slug
           window.location.href = `../pages/article.html?slug=${slug}`; // Modifiez ce chemin si nécessaire
      });
  }

  for (let id = 0; id < allTitles.length; id++) {
    const element = allTitles[id];
    setupLinkRedirection(element);
    
}

async function toggleContent() {
  if (content.style.display === "none") {
      content.style.display = "block"; // Affiche le contenu
      toggleButton.textContent = "Cacher";
  } else {
      content.style.display = "none"; // Cache le contenu
      toggleButton.textContent = "Afficher plus";
  }
}
// Ajout de l'événement au bouton
toggleButton.addEventListener('click', async () => {
  await toggleContent(); // Appel asynchrone de la fonction
});
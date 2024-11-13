const siteUrl = 'https://setalmaa.com';  
const quote=document.getElementById('quote');
const Opinionbtn=document.getElementById('opinion');
const sportbtn=document.getElementById('sport');
const culturebtn=document.getElementById('culture');
const lifestylebttn=document.getElementById('lifestyle');

const Headlines=['title_0','title_1','title_2','title_3','title_4','title_5','title_6',
    'title_7','title_8','title_9','title_10','title_11','title_12','title_13'];
    const News_in_focus=['14','15','16'];
    const Spotlight=['title_17','title_18','title_19','title_20','title_21','title_22','title_23','title_24'];
const Opinion=['title_25','title_26','title_27','title_28','title_29','title_30'];
const sport=['title_31','title_32','title_33','title_34','title_35','title_36','title_37','title_38','title_39','title_40','title_41','title_42','title_43'];
const allTitles = [...News_in_focus];
const mostView=['most_1','most_2','most_3','most_4','most_5','most_6','most_7','most_8','most_9','most_10','most_11','most_12','most_13','most_14','most_15','most_16','most_17','most_18','most_19','most_20'];

// RÃ©cupÃ©ration des donnÃ©es de l'article

async function fetchPageData() {
  try {
       const data = await fetchPostData();
       
        // News_in_focus

    
        News_in_focus.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, 14 + index));
        await Promise.all([14, 15, 16].map(index => displayImage(data, `img_${index}`, index)));
        mostView.forEach((item, index) => displayTitle(data, item,null, index));

  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
  }
}

// Fonction pour récupérer les données des posts
async function fetchPostData() {
  const response = await fetch(siteUrl+'/wp-json/wp/v2/posts?per_page=100&page=1');
  if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
  }
  return await response.json();
}



// Fonction pour récupérer les informations de l'image à la une
async function fetchFeaturedMedia(mediaId) {
  const response = await fetch(`${siteUrl}/wp-json/wp/v2/media/${mediaId}`);
  if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status} lors de la récupération de l'image`);
  }
  const mediaData = await response.json();
  return mediaData.source_url;
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

// Fonction utilitaire pour récupérer le nom d'une catégorie
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
  const mots = content.split(' ');
  document.getElementById(contentid).innerHTML = mots.slice(0, 20).join(' ') + '...';
}



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


 // Appel de la fonction fetchPageData pour récupérer et afficher les données, y compris les images
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

for (let id = 0; id < News_in_focus.length; id++) {
    const element = News_in_focus[id];
    setupLinkRedirection("title_"+element);
    
}

 // Fonction pour enlever les accents d'un texte









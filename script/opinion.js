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
const Opinion2=['25','title_26','title_27','title_28','title_29','title_30','title_31','title_32','title_33','title_34','title_35','title_36','title_37','title_38','title_39','title_40','title_41','title_42','title_43','title_44','title_45','title_46'];
const Opinion=['25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46'];

const sport=['title_31','title_32','title_33','title_34','title_35','title_36','title_37','title_38','title_39','title_40','title_41','title_42','title_43'];
const allTitles = [ ...Opinion];
const mostView=['most_1','most_2','most_3','most_4','most_5','most_6','most_7','most_8','most_9','most_10','most_11','most_12','most_13','most_14','most_15','most_16','most_17','most_18','most_19','most_20'];

// RÃ©cupÃ©ration des donnÃ©es de l'article

async function fetchPageData() {
  try {
       const data = await fetchPostData();
     
    //  Opinion

    Opinion.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, 14 + index));
    await Promise.all([25, 26, 27, 28, 29, 30, 31, 32, 33, 34].map(index => displayImage(data, `img_${index}`, index)));
    mostView.forEach((item, index) => displayTitle(data, item,null, index));


    // for (let i = 0; i < Opinion.length; i++) {
    //     displayTitle(data, "title_"+Opinion[i],"categories_"+Opinion[i], 25+i);
    //   }
      await displayContent(data,'article_25',25);

      // await displayImage(data, 'img_25',25);
      // await displayImage(data, 'img_26',26);
      // await displayImage(data, 'img_27',27);
      // await displayImage(data, 'img_28',28);
      // await displayImage(data, 'img_29',29);
      // await displayImage(data, 'img_30',30);
      // await displayImage(data, 'img_31',31);
      // await displayImage(data, 'img_32',32);
      // await displayImage(data, 'img_33',33);
      // await displayImage(data, 'img_34',34);

    //   sport
  

       


    //   mostvue

   
   
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
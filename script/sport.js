const siteUrl = 'https://setalmaa.com';  
const quote=document.getElementById('quote');
const Opinionbtn=document.getElementById('opinion');
const sportbtn=document.getElementById('sport');
const culturebtn=document.getElementById('culture');
const lifestylebttn=document.getElementById('lifestyle');

const Headlines=['title_0','title_1','title_2','title_3','title_4','title_5','title_6',
    'title_7','title_8','title_9','title_10','title_11','title_12','title_13'];
const News_in_focus=['title_14','title_15','title_16'];
const Spotlight=['title_17','title_18','title_19','title_20','title_21','title_22','title_23','title_24'];
const Opinion=['title_25','title_26','title_27','title_28','title_29','title_30'];
const sport=['31','32','33','34','35','36','37','38','39','40','41','42','43'];
const allTitles = [...sport];
const mostView=['most_1','most_2','most_3','most_4','most_5','most_6','most_7','most_8','most_9','most_10','most_11','most_12','most_13','most_14','most_15','most_16','most_17','most_18','most_19','most_20'];

// RÃ©cupÃ©ration des donnÃ©es de l'article

async function fetchPageData() {
  try {
       const data = await fetchPostData();


    //   sport
    // for (let i = 0; i < sport.length; i++) {
    //     displayTitle(data, sport[i], 31+i);
        
    //   }

    //    displayContent(data,'article_31',31);

    //    displayImage(data, 'img_31',31);
    //    displayImage(data, 'img_35',35);
    //    displayImage(data, 'img_36',36);
    //    displayImage(data, 'img_37',37);
    //    displayImage(data, 'img_38',38);
    //    displayImage(data, 'img_39',39);
    //    displayImage(data, 'img_41',41);
    //    displayImage(data, 'img_42',42);

        sport.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, 17 + index));
        await displayContent(data, 'article_31', 31);
        await Promise.all([31, 35, 36, 37, 38, 39, 41, 42].map(index => displayImage(data, `img_${index}`, index)));
       


    //   mostvue

    // for (let i = 0; i < mostView.length; i++) {
    //     displayTitle(data, mostView[i],i);
        
    //   }
  
   
   
  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
  }
}

// Fonction pour récupérer les données des posts
async function fetchPostData() {
    const controller = new AbortController(); // Utilisé pour le timeout
    const timeoutId = setTimeout(() => controller.abort(), 15000); // Timeout de 5 secondes

    try {
        const response = await fetch(`${siteUrl}/wp-json/wp/v2/posts?per_page=100&page=1`, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        return response.json(); // Inutile d'utiliser await ici
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('La requête a expiré après 5 secondes');
        }
        throw new Error(`Erreur de la requête : ${error.message}`);
    } finally {
        clearTimeout(timeoutId); // Nettoyage du timeout
    }
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
async function displayTitle(data, titleid, numpost) {
    // const data = await fetchPostData(); // Supposons que les données soient déjà disponibles
    const post = data[numpost];
    const title = post.title.rendered;
    const slug = post.slug; // On récupère l'ID du post
  
    // Ajouter l'ID en tant qu'attribut data-id et mettre à jour le contenu
    const titleElement = document.getElementById(titleid);
    titleElement.innerHTML = title;
    titleElement.setAttribute('data-id', slug);

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
function displayAuthor(authorName) {
  auteur.innerHTML = authorName;
}

// Fonction pour afficher l'image à la une
// Fonction pour afficher le titre
async function displayTitle(data, titleid, categoriesid=null, numpost) {
    // const data = await fetchPostData(); // Supposons que les données soient déjà disponibles
    const post = data[numpost];
    const title = post.title.rendered;
    const slug = post.slug; // On récupère l'ID du post
    
    // console.log("CartegoriesData:",cartegoriesData.name);
    // Ajouter l'ID en tant qu'attribut data-id et mettre à jour le contenu
    const titleElement = document.getElementById(titleid);
    titleElement.innerHTML = title;
    titleElement.setAttribute('data-id', slug);
    quote.style.display = "inline";
    if (categoriesid !== null) {
      // const cartegories = await fetch(siteUrl+`/wp-json/wp/v2/categories/${categoriesId}`);
      // const cartegoriesData = await cartegories.json();
      // const categoriesElement = document.getElementById(categoriesid);
      // categoriesElement.innerHTML = cartegoriesData.name;
    const categoriesId=post.categories[0];

      try {
        const cartegoriesResponse = await fetch(`${siteUrl}/wp-json/wp/v2/categories/${categoriesId}`);
    
        // Vérification du statut de la réponse HTTP
        if (!cartegoriesResponse.ok) {
            console.error(`Erreur : ${cartegoriesResponse.status} - ${cartegoriesResponse.statusText}`);
            return; // Arrête l'exécution si la requête a échoué
        }
    
        // Conversion en JSON
        const cartegoriesData = await cartegoriesResponse.json();
    
        // Vérification de la structure des données reçues
        if (!cartegoriesData || !cartegoriesData.name) {
            console.error("Données inattendues reçues pour 'cartegoriesData'. La propriété 'name' est manquante.");
            return; // Arrête l'exécution si les données sont incorrectes
        }
    
        // Récupération de l'élément DOM
        const categoriesElement = document.getElementById(categoriesid);
    
        // Vérification de l'existence de l'élément DOM
        if (!categoriesElement) {
            console.error(`Élément avec l'ID ${categoriesid} introuvable dans le DOM.`);
            return; // Arrête l'exécution si l'élément n'existe pas
        }
    
        // Mise à jour du contenu de l'élément
        categoriesElement.innerHTML = cartegoriesData.name ? cartegoriesData.name : "Inconnue";
    
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
        categoriesElement.innerHTML=`<p>inconnu</p>`;
    }
    

  } else {
      console.log("Categorie ID n'a pas été fourni.");
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

for (let id = 0; id < allTitles.length; id++) {
    const element = allTitles[id];
    setupLinkRedirection(element);
    
}

// Fonction de transformation en slug
function stringToSlug(text) {
    return text
        .toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .trim();
}
 // Fonction pour enlever les accents d'un texte
 function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normalise et enlève les accents
}






 // Masquer le GIF et afficher le body après 5 secondes
//  setTimeout(function() {
//     // Masquer le div de chargement
//     document.getElementById('loading').style.display = 'none';

//     // Afficher le body
//     document.body.style.display = 'block';
// }, 5000); // 5000ms = 5 secondes




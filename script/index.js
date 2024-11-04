const siteUrl = 'https://setalmaa.com';  
const quote=document.getElementById('quote');
const Opinionbtn=document.getElementById('opinion');
const sportbtn=document.getElementById('sport');
const culturebtn=document.getElementById('culture');
const lifestylebttn=document.getElementById('lifestyle');

// const Headlines=['title_0','title_1','title_2','title_3','title_4','title_5','title_6',
//     'title_7','title_8','title_9','title_10','title_11','title_12','title_13'];
// const News_in_focus=['title_14','title_15','title_16'];
// const Spotlight=['title_17','title_18','title_19','title_20','title_21','title_22','title_23','title_24'];
// const Opinion=['title_25','title_26','title_27','title_28','title_29','title_30'];
// const sport=['title_31','title_32','title_33','title_34','title_35','title_36','title_37','title_38','title_39','title_40','title_41','title_42','title_43'];



const Headlines=['0','1','2','3','4','5','6','7','8','9','10','11','12','13'];
const News_in_focus=['14','15','16'];
const Spotlight=['17','18','19','20','21','22','23','24'];
const Opinion=['25','26','27','28','29','30'];
const sport=['31','32','33','34','35','36','37','38','39','40','41','42','43'];
const allTitles = [...Headlines, ...News_in_focus, ...Spotlight, ...Opinion, ...sport];
const mostView=['most_1','most_2','most_3','most_4','most_5','most_6','most_7','most_8','most_9','most_10','most_11','most_12','most_13','most_14','most_15','most_16','most_17','most_18','most_19','most_20'];

// RÃ©cupÃ©ration des donnÃ©es de l'article

// Fonction principale pour afficher les données de la page
async function fetchPageData() {
    try {
      const data = await fetchPostData();
      const imageIndexes = [0, 4, 5, 9];
  
      // Afficher les images
      await Promise.all(imageIndexes.map(index => displayImage(data, `img_${index}`, index)));
  
      // Afficher les titres et contenus des sections
      Headlines.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, index));
      await displayContent(data, 'article_0', 0);
      
      News_in_focus.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, 14 + index));
      await Promise.all([14, 15, 16].map(index => displayImage(data, `img_${index}`, index)));
  
      Spotlight.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, 17 + index));
      await Promise.all([17, 23, 24].map(index => displayContent(data, `article_${index}`, index)));
      await Promise.all([17, 18, 19, 20, 21, 22, 23, 24].map(index => displayImage(data, `img_${index}`, index)));
  
      Opinion.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, 25 + index));
      await displayContent(data, 'article_25', 25);
      await Promise.all([25, 26, 27, 28, 29, 30].map(index => displayImage(data, `img_${index}`, index)));
  
      sport.forEach((item, index) => displayTitle(data, `title_${item}`,`categories_${item}`, 31 + index));
      await displayContent(data, 'article_31', 31);
      await Promise.all([31, 35, 36, 37, 38, 39, 41, 42].map(index => displayImage(data, `img_${index}`, index)));
     
      mostView.forEach((item, index) => displayTitle(data, item,null, index));
    } catch (error) {
      showError('Erreur lors de la récupération des données.'); // Appel d'une fonction d'erreur centralisée
      console.error('Erreur lors de la récupération des données:', error);
    }
   
  }
  
  // Appel à la fonction principale une fois que la page est prête
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await fetchPageData();
    } catch (error) {
      console.error('Erreur lors de l\'affichage des données:', error);
    }
  });
  

// Fonction pour récupérer les données des posts
async function fetchPostData() {
  const response = await fetch(siteUrl+'/wp-json/wp/v2/posts?per_page=100&page=1');
 

  if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
  }
  return await response.json();
}

// Fonction pour récupérer les informations de l'auteur
// async function fetchAuthorData(authorId) {
//   const response = await fetch(`https://setalmaa.com/wp-json/wp/v2/users/${authorId}`);
//   if (!response.ok) {
//       throw new Error(`Erreur HTTP ${response.status} lors de la récupération de l'auteur`);
//   }
//   return await response.json();
// }

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
  

// Fonction pour récupérer et afficher les catégories (à implémenter)
// async function fetchCategories(categories) {
//   // Implémentation de la récupération des catégories
//   console.log("Récupération des catégories:", categories);
// }

// Fonction pour récupérer et afficher les commentaires (à implémenter)
async function fetchComments(postId) {
  // Implémentation de la récupération des commentaires
  console.log("Récupération des commentaires pour le post ID:", postId);
}


// // RÃ©cupÃ©ration des catÃ©gories
// async function fetchCategories(categoryIds) {
//     try {
//         const response = await fetch(siteUrl+'/wp-json/wp/v2/categories');
        
//         if (!response.ok) {
//             throw new Error(`HTTP error ${response.status}`);
//         }


//         const categoriesData = await response.json();
//         console.log("Categories data:", categoriesData); 

//         // Filtrer les catÃ©gories pour celles qui sont prÃ©sentes dans l'article
//         const selectedCategories = categoriesData.filter(category => categoryIds.includes(category.id));
//         console.log("Selected categories:", selectedCategories);

//         // Afficher les catÃ©gories
//         categoriesContainer.innerHTML = selectedCategories.length > 0 
//             ? selectedCategories.map(category => `<span class="badge bg-secondary me-1">${category.name}</span>`).join(' ')
//             : "<span>Aucune catÃ©gorie trouvÃ©e</span>";

//     } catch (error) {
//         console.error('Erreur lors de la rÃ©cupÃ©ration des catÃ©gories :', error);
//     }
// }

// RÃ©cupÃ©ration des commentaires
async function fetchComments(postId) {
    try {
        const response = await fetch(`${siteUrl}/wp-json/wp/v2/comments?post=${postId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const commentsData = await response.json();
        console.log("Comments data:", commentsData); 

        // Afficher les commentaires
        commentsContainer.innerHTML = commentsData.length > 0 
            ? commentsData.map(comment => `<p><strong>${comment.author_name}</strong>: ${comment.content.rendered}</p>`).join('')
            : "<p>Aucun commentaire pour cet article</p>";

    } catch (error) {
        console.error('Erreur lors de la rÃ©cupÃ©ration des commentaires :', error);
    }
}

// Ajouter un commentaire
async function addComment(postId) {
    const commentContent = 'test test';
    const authorName = authorInput.value;
    const authorEmail = emailInput.value;

    // VÃ©rification des champs
    if (!commentContent || !authorName || !authorEmail) {
        alert('Tous les champs doivent Ãªtre remplis');
        return;
    }

    try {
        const response = await fetch(siteUrl+'/wp-json/wp/v2/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: postId,
                author_name: authorName,
                author_email: authorEmail,
                content: commentContent
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const newComment = await response.json();
        console.log('Nouveau commentaire ajoutÃ© :', newComment);

        // Ajouter le commentaire dans la liste des commentaires
        commentsContainer.innerHTML += `<p><strong>${newComment.author_name}</strong>: ${newComment.content.rendered}</p>`;

        // RÃ©initialiser le formulaire
        commentForm.reset();

    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
    }
}




function setupLinkRedirection(linkId) {
    const linkElement = document.getElementById(linkId);
    if (!linkElement) {
        console.error(`Aucun élément trouvé avec l'ID: ${linkId}`);
        return; // Sortie si l'élément n'existe pas
    }
    addComment(12992);
    fetchComments(12992);
    // Ajouter un écouteur d'événement "click" pour rediriger l'utilisateur
    linkElement.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien

        const slug = this.getAttribute('data-id');
        if (!slug) {
            console.error("Aucun attribut 'data-id' trouvé pour cet élément.");
            return; // Sortir si le slug est manquant
        }

        console.log(`ID du post cliqué : ${slug}`);

        // Rediriger vers une URL basée sur le slug
        window.location.href = `pages/article.html?slug=${slug}`; // Modifiez ce chemin si nécessaire
    });
}


// }
allTitles.forEach((item ) => setupLinkRedirection(`title_${item}`));



// menue button clique

const buttonMappings = {
    Opinionbtn: "pages/opinion.html",
    sportbtn: "pages/sport.html",
    culturebtn: "pages/culture.html",
    lifestylebttn: "pages/lifestyle.html"
  };
  
  // Ajout des gestionnaires d'événements de manière dynamique
  Object.keys(buttonMappings).forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault(); // Optionnel, selon le besoin
        window.location.href = buttonMappings[buttonId];
      });
    } else {
      console.error(`Le bouton avec l'ID ${buttonId} n'existe pas.`);
    }
  });
  



// $(document).ready(function(){
//     $(".owl-carousel").owlCarousel();
//   });


//   button scroll top


// Affiche ou cache le bouton en fonction du défilement
window.onscroll = function() {
    console.log("scroll");
    let button = document.getElementById("topButton");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        button.style.display = "block"; // Afficher le bouton
       
    } else {
        button.style.display = "none"; // Cacher le bouton
        console.log("scroll");
    }
};

// Fonction pour faire défiler vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Animation fluide
    });
}

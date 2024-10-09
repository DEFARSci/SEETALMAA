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
const sport=['title_31','title_32','title_33','title_34','title_35','title_36','title_37','title_38','title_39','title_40','title_41','title_42','title_43'];
const allTitles = [...Headlines, ...News_in_focus, ...Spotlight, ...Opinion, ...sport];
const mostView=['most_1','most_2','most_3','most_4','most_5','most_6','most_7','most_8','most_9','most_10','most_11','most_12','most_13','most_14','most_15','most_16','most_17','most_18','most_19','most_20'];

// RÃ©cupÃ©ration des donnÃ©es de l'article

async function fetchPageData() {
  try {
       const data = await fetchPostData();
        displayImage(data, 'img_0',0);
        displayImage(data,'img_4',4);
        displayImage(data, 'img_5',5);
        displayImage(data, 'img_9',9);

       for (let i = 0; i < Headlines.length; i++) {
        await displayTitle(data, Headlines[i], i);
      }
      
      // const post = data[0];
      
       
      await displayContent(data,'article_0',0); // content.rendered);

     

    //    News_in_focus

       for (let i = 0; i < News_in_focus.length; i++) {
        displayTitle(data, News_in_focus[i], 14+i);
      }
      await displayImage( data,'img_14',14);
      await displayImage( data,'img_15',15);
      await displayImage( data,'img_16',16);

    //  Spotlight
    for (let i = 0; i < Spotlight.length; i++) {
        displayTitle(data, Spotlight[i], 17+i);
       
      }
      await displayContent(data,'article_17',17);
      await displayContent(data,'article_23',23);
      await displayContent(data,'article_24',24);
      
      await displayImage(data, 'img_17',17);
      await displayImage(data, 'img_18',18);
      await displayImage(data, 'img_19',19);
      await displayImage(data, 'img_20',20);
      await displayImage(data, 'img_21',21);
      await displayImage(data, 'img_22',22);
      await displayImage(data, 'img_23',23);
      await displayImage(data, 'img_24',24);
     
    //  Opinion
    for (let i = 0; i < Opinion.length; i++) {
        displayTitle(data, Opinion[i], 25+i);
      }
      await displayContent(data,'article_25',25);

      await displayImage(data, 'img_25',25);
      await displayImage(data, 'img_26',26);
      await displayImage(data, 'img_27',27);
      await displayImage(data, 'img_28',28);
      await displayImage(data, 'img_29',29);
      await displayImage(data, 'img_30',30);

    //   sport
    for (let i = 0; i < sport.length; i++) {
        displayTitle(data, sport[i], 31+i);
        
      }

      await displayContent(data,'article_31',31);

      await displayImage(data, 'img_31',31);
      await displayImage(data, 'img_35',35);
      await displayImage(data, 'img_36',36);
      await displayImage(data, 'img_37',37);
      await displayImage(data, 'img_38',38);
      await displayImage(data, 'img_39',39);
      await displayImage(data, 'img_41',41);
      await displayImage(data, 'img_42',42);


       


    //   mostvue

    for (let i = 0; i < mostView.length; i++) {
        displayTitle(data, mostView[i],i);
        
      }
    // await  displayTitle(data,'most_1',0);
    // await  displayTitle(data,'most_2',1);
    // await  displayTitle(data,'most_3',2);
    // await  displayTitle(data,'most_4',3);
    // await  displayTitle(data,'most_5',4);
    // await  displayTitle(data,'most_6',5);
    // await  displayTitle(data,'most_7',6);
    // await displayTitle(data,'most_8',7);
    // await displayTitle(data,'most_9',8);
    // await displayTitle(data,'most_10',9);

    // await displayTitle(data,'most_11',10);
    // await displayTitle(data,'most_12',11);
    // await displayTitle(data,'most_13',12);
    // await displayTitle(data,'most_14',13);
    // await displayTitle(data,'most_15',14);
    // await displayTitle(data,'most_16',15);
    // await displayTitle(data,'most_17',16);
    // await displayTitle(data,'most_18',17);
    // await displayTitle(data,'most_19',18);
    // await displayTitle(data,'most_20',19);
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
async function displayTitle(data, titleid, numpost) {
    // const data = await fetchPostData(); // Supposons que les données soient déjà disponibles
    const post = data[numpost];
    const title = post.title.rendered;
    const slug = post.slug; // On récupère l'ID du post
  
    // Ajouter l'ID en tant qu'attribut data-id et mettre à jour le contenu
    const titleElement = document.getElementById(titleid);
    titleElement.innerHTML = title;
    titleElement.setAttribute('data-id', slug);
    quote.style.display = "inline";
  
    
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

// Fonction pour récupérer et afficher les catégories (à implémenter)
async function fetchCategories(categories) {
  // Implémentation de la récupération des catégories
  console.log("Récupération des catégories:", categories);
}

// Fonction pour récupérer et afficher les commentaires (à implémenter)
async function fetchComments(postId) {
  // Implémentation de la récupération des commentaires
  console.log("Récupération des commentaires pour le post ID:", postId);
}


// RÃ©cupÃ©ration des catÃ©gories
async function fetchCategories(categoryIds) {
    try {
        const response = await fetch(siteUrl+'/wp-json/wp/v2/categories');
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }


        const categoriesData = await response.json();
        console.log("Categories data:", categoriesData); 

        // Filtrer les catÃ©gories pour celles qui sont prÃ©sentes dans l'article
        const selectedCategories = categoriesData.filter(category => categoryIds.includes(category.id));
        console.log("Selected categories:", selectedCategories);

        // Afficher les catÃ©gories
        categoriesContainer.innerHTML = selectedCategories.length > 0 
            ? selectedCategories.map(category => `<span class="badge bg-secondary me-1">${category.name}</span>`).join(' ')
            : "<span>Aucune catÃ©gorie trouvÃ©e</span>";

    } catch (error) {
        console.error('Erreur lors de la rÃ©cupÃ©ration des catÃ©gories :', error);
    }
}

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
    const commentContent = commentInput.value;
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
async function getCategories(Url) {
    try {
        // Envoi de la requête GET pour récupérer les catégories
        const response = await fetch(`${Url}/wp-json/wp/v2/categories`);

        // Vérification si la requête a été réussie
        if (!response.ok) {
            throw new Error(`Erreur : ${response.statusText}`);
        }

        // Extraction des données en format JSON
        const categories = await response.json();

        // Affichage des catégories récupérées
        console.log('Catégories récupérées :', categories[1]);

        // Retourne les catégories
        return categories;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
    }
}

// Utilisation de la fonction
// Remplacer par l'URL du site WordPress
// getCategories(siteUrl);




// Utilisation des fonctions
// (async function() {
//     const siteUrl = 'https://setalmaa.com';  // Remplacez par l'URL de votre site WordPress
//     const categories = await getCategories(siteUrl);
    
//     // Supposons que vous souhaitez récupérer les articles de la première catégorie récupérée
//     if (categories && categories.length > 0) {
//         const categoryId = categories[0].id;  // Vous pouvez sélectionner l'ID de la catégorie que vous voulez
//         const posts = await getPostsByCategory(siteUrl, categoryId);
//         console.log(`Articles dans la catégorie "${categories[0].name}":`, posts);
//     }
// })();

// Appel Ã  la fonction principale
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
        // Récupérer le texte du lien
        // const linkText = removeAccents(linkElement.textContent);

        // // Transformer le texte en slug
        // const slug = stringToSlug(linkText);
        // console.log("slug :", slug);

        // // Rediriger vers une URL basée sur le slug
         window.location.href = `pages/article.html?slug=${slug}`; // Modifiez ce chemin si nécessaire
    });
}
// setupLinkRedirection('title_1');
// setupLinkRedirection('title_2');
// setupLinkRedirection('title_3');
// setupLinkRedirection('title_4');
// setupLinkRedirection('title_5');
// setupLinkRedirection('title_6');
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



// menue button clique

Opinionbtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("click");
    window.location.href = "pages/opinion.html";
});
sportbtn.addEventListener('click', () => {
    window.location.href = "pages/sport.html";
});
culturebtn.addEventListener('click', () => {
    window.location.href = "pages/culture.html";
});
lifestylebttn.addEventListener('click', () => {
    window.location.href = "pages/lifestyle.html";
});



$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });
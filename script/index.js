
let arraydata = [];
const auteur = document.getElementById('auteur');
const title = document.getElementById('title');
const img = document.getElementById('img_1');
const article = document.getElementById('article');
const categoriesContainer = document.getElementById('categories'); // Conteneur pour les catÃ©gories
const commentsContainer = document.getElementById('comments'); // Conteneur pour les commentaires
const commentForm = document.getElementById('commentForm'); // Formulaire pour ajouter des commentaires
const commentInput = document.getElementById('commentInput'); // Champ pour Ã©crire le commentaire
const authorInput = document.getElementById('authorInput'); // Champ pour le nom de l'auteur
const emailInput = document.getElementById('emailInput'); // Champ pour l'email de l'auteur

// RÃ©cupÃ©ration des donnÃ©es de l'article

async function fetchPageData() {
  try {
       const data = await fetchPostData();
      
      // const post = data[0];
      
      await displayImage(data, 'img_1',0);
      await displayImage(data, 'img_2',5);
      await displayImage(data, 'img_3',6);
      await displayTitle(data,'title_1',0);
      await displayContent(data,'article_1',0); // content.rendered);

      // 1
      await displayTitle(data,'title_2',1);
    
      // 2
      await displayTitle(data,'title_3',3);
      
      // 3
      await displayTitle(data,'title_4',4);

      // 4
      await displayTitle(data,'title_5',5);

      // 5
      await displayTitle(data,'title_6',6);

      // 6
      await displayImage(data,'img_4',7)
      await displayTitle(data,'title_7',7);
      // 7
      await displayTitle(data,'title_8',8);
      // 8
      await displayTitle(data,'title_9',9);
      // 
      await displayTitle(data,'title_10',10);


      await displayTitle(data,'title_11',40);
      await displayTitle(data,'title_12',41);
      await displayTitle(data,'title_13',42);
      await displayTitle(data,'title_14',43);


      await displayTitle(data,'first_title',11);
      await displayImage( data,'first_img',11);

      // Section-deux 1
      await displayTitle(data,'second_title',12);
      await displayContent(data,'first_article',12);
      await displayImage( data,'second_img',12);

      // Section-deux 2
      await displayTitle(data,'third_title',45);
      await displayContent(data,'second_article',45);
      await displayImage(data, 'third_img',45);
      
      // Section-trois
      await displayTitle(data,'title_un',14);
      await displayContent(data,'article_un',14);
      await displayImage(data, 'img_un',14);

      // Section-trois 1
      await displayTitle(data,'title_deux',15);
      await displayImage(data, 'img_deux',15);

      // Section-trois A_1
      await displayTitle(data,'title_a1',16);
      await displayImage( data,'img_a1',16);

       // Section-trois A_2
       await displayTitle(data,'title_a2',17);
       await displayImage( data,'img_a2',17);

        // Section-trois A_3
        await displayTitle(data,'title_a3',18);
        await displayImage(data, 'img_a3',18);

        // Section-trois A_4
        await displayTitle(data,'title_a4',19);
        await displayImage(data, 'img_a4',19);

        // Section-trois B
        await displayTitle(data,'title_b',20);
        await displayImage(data, 'img_b',20);
        await displayContent(data,'article_b',20);

        // Section-trois C
        await displayTitle(data,'title_c',21);
        await displayImage( data,'img_c',21);
        await displayContent(data,'article_c',21);

        // Section-quatre
        await displayTitle(data,'title_quatre',22);
        await displayContent(data,'article_quatre',22);
        await displayImage( data,'img_quatre',22);

        // Section-quatre A
        await displayTitle(data,'title_4a',23);
        await displayImage( data,'img_4a',23);

        // Section-quatre B
        await displayTitle(data,'title_4b',24);
        await displayImage(data, 'img_4b',24);

        // Section-quatre C
        await displayTitle(data,'title_4c',25);
        await displayImage( data,'img_4c',25);

        // Section-quatre D
        await displayTitle(data,'title_4d',26);
        await displayImage(data, 'img_4d',26);
        // await displayContent(data,'article_4d',26);

        // Section-quatre E
        await displayTitle(data,'title_4ee',27);
        await displayImage( data,'img_4ee',27);

        // Section-cinq
        await displayTitle(data,'title_cinq',28);
        await displayContent(data,'article_cinq',28);
        await displayImage( data,'img_cinq',28);

        //Section-cinq A
        await displayTitle(data,'title_5a',29);
        //Section-cinq B
        await displayTitle(data,'title_5b',30);
        //Section-cinq C
        await displayTitle(data,'title_5c',31);

        //Section-cinq D1
        await displayTitle(data,'title_5d1',32);
        await displayImage( data,'img_5d1',32);
        //Section-cinq D2
        await displayTitle(data,'title_5d2',33);
        await displayImage( data,'img_5d2',33);
        //Section-cinq D3
        await displayTitle(data,'title_5d3',32);
        await displayImage( data,'img_5d3',32);
        //Section-cinq D4
        await displayTitle(data,'title_5d4',33);
        await displayImage( data,'img_5d4',33);

        //Section-cinq E1
        await displayTitle(data,'title_5e1',34);
        await displayImage( data,'img_5e1',34);

        //Section-cinq E2
        await displayTitle(data,'title_5e2',35);

        //Section-cinq F1
        await displayTitle(data,'title_5f1',36);
        await displayImage(data, 'img_5f1',36);
        
        //Section-cinq F2
        // await displayTitle(data,'title_5f2',37);

        //Section-cinq G1
        await displayTitle(data,'title_5g1',38);
        await displayImage(data, 'img_5g1',38);
        
        //Section-cinq G2
        await displayTitle(data,'title_5g2',39);

      //Section-deux

      displayTitle(data,'first_title',40);
      displayImage(data, 'first_img',40);

      // Section-deux 1
      displayTitle(data,'second_title',41);
      displayContent(data,'first_article',41);
      displayImage( data,'second_img',41);

      // Section-deux 2
      displayTitle(data,'third_title',42);
      displayContent(data,'second_article',42);
      displayImage( data,'third_img',42);
      
      // await fetchCategories(post.categories);
      // await fetchComments(post.id);

      // return data;
      // console.log(data);


    //   mostvue
    await  displayTitle(data,'most_1',0);
    await  displayTitle(data,'most_2',1);
    await  displayTitle(data,'most_3',2);
    await  displayTitle(data,'most_4',3);
    await  displayTitle(data,'most_5',4);
    await  displayTitle(data,'most_6',5);
    await  displayTitle(data,'most_7',6);
    await displayTitle(data,'most_8',7);
    await displayTitle(data,'most_9',8);
    await displayTitle(data,'most_10',9);

    await displayTitle(data,'most_1d',10);
    await displayTitle(data,'most_2d',11);
    await displayTitle(data,'most_3d',12);
    await displayTitle(data,'most_4d',13);
    await displayTitle(data,'most_5d',14);
    await displayTitle(data,'most_6d',15);
    await displayTitle(data,'most_7d',16);
    await displayTitle(data,'most_8d',17);
    await displayTitle(data,'most_9d',18);
    await displayTitle(data,'most_10d',19);
  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
  }
}

// Fonction pour récupérer les données des posts
async function fetchPostData() {
  const response = await fetch('https://setalmaa.com//wp-json/wp/v2/posts?per_page=100&page=1');
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
  const response = await fetch(`https://setalmaa.com/wp-json/wp/v2/media/${mediaId}`);
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
        const response = await fetch('https://setalmaa.com/wp-json/wp/v2/categories');
        
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
        const response = await fetch(`https://setalmaa.com/wp-json/wp/v2/comments?post=${postId}`);
        
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
        const response = await fetch('https://setalmaa.com/wp-json/wp/v2/comments', {
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
async function getCategories(siteUrl) {
    try {
        // Envoi de la requête GET pour récupérer les catégories
        const response = await fetch(`${siteUrl}/wp-json/wp/v2/categories`);

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
const siteUrl = 'https://setalmaa.com';  // Remplacer par l'URL du site WordPress
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
      await fetchPageData();
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
         window.location.href = `/article.html?slug=${slug}`; // Modifiez ce chemin si nécessaire
    });
}
setupLinkRedirection('title_1');
setupLinkRedirection('title_2');
setupLinkRedirection('title_3');
setupLinkRedirection('title_4');
setupLinkRedirection('title_5');
setupLinkRedirection('title_6');


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

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
      // const data = await fetchPostData();
      
      // const post = data[0];
      
      displayTitle('title_1',0);
      displayContent('article_1',0); // content.rendered);
      displayImage( 'img_1',0);

      // 1
      displayTitle('title_2',2);
    
      // 2
      displayTitle('title_3',3);
      
      // 3
      displayTitle('title_4',4);

      // 4
      displayImage( 'img_2',5);
      displayTitle('title_5',5);

      // 5
      displayImage( 'img_3',6);
      displayTitle('title_6',6);

      // 6
      displayImage('img_4',7)
      displayTitle('title_7',7);
      // 7
      displayTitle('title_8',8);
      // 8
      displayTitle('title_9',9);
      // 
      displayTitle('title_10',10);

      //Section-deux

      displayTitle('first_title',0);
      displayImage( 'first_img',0);

      // Section-deux 1
      displayTitle('second_title',2);
      displayContent('first_article',0);
      displayImage( 'second_img',5);

      // Section-deux 2
      displayTitle('third_title',2);
      displayContent('first_article',0);
      displayImage( 'second_img',5);
      
      // await fetchCategories(post.categories);
      // await fetchComments(post.id);

      // return data;
      // console.log(data);
  } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
  }
}

// Fonction pour récupérer les données des posts
async function fetchPostData() {
  const response = await fetch('https://setalmaa.com/wp-json/wp/v2/posts');
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
async function displayTitle(titleid,numpost) {
  const data = await fetchPostData();
  const post = data[numpost];
  const title = post.title.rendered;

  document.getElementById(titleid).innerHTML = title;
}

// Fonction pour afficher le contenu de l'article
async function displayContent(contentid,numpost) {
  const data = await fetchPostData();
  const post = data[numpost];
  const content = post.content.rendered;
  const mots = content.split(' ');
  document.getElementById(contentid).innerHTML = mots.slice(0, 50).join(' ') + '...';
}

// Fonction pour afficher l'auteur
function displayAuthor(authorName) {
  auteur.innerHTML = authorName;
}

// Fonction pour afficher l'image à la une
async  function displayImage(imageId,numpost) {
  const data = await  fetchPostData();  
 
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

// Appel Ã  la fonction principale
 // Appel de la fonction fetchPageData pour récupérer et afficher les données, y compris les images
 document.addEventListener('DOMContentLoaded', async () => {
  try {
      await fetchPageData();
  } catch (error) {
      console.error('Erreur lors de l\'affichage des données:', error);
  }
});
    


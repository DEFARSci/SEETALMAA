const siteUrl = 'https://setalmaa.com'; // URL de votre site WordPress
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');
const postId = null;




// const commentForm = document.getElementsByClassName('commentForm');

// Fonction utilitaire pour les requêtes API
async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur : ${response.statusText}`);
        return response.json();
    } catch (error) {
        console.error('Erreur de requête:', error);
        return null;
    }
}


// Récupérer l'image à la une
async function fetchFeaturedImage(mediaId) {
    const mediaUrl = `${siteUrl}/wp-json/wp/v2/media/${mediaId}`;
    const media = await fetchApi(mediaUrl);
    return media ? media.source_url : null;
}

// Récupérer l'article en fonction du slug
async function fetchArticleBySlug(slug) {
    const apiUrl = `${siteUrl}/wp-json/wp/v2/posts?slug=${slug}`;
    const articles = await fetchApi(apiUrl);
    
    if (articles && articles.length > 0) {
        displayArticle(articles[0]);
    } else {
        document.getElementById('article').innerHTML = '<p>Aucun article trouvé.</p>';
    }
}
async function fetchArticleIdBySlug(slug) {
    const apiUrl = `${siteUrl}/wp-json/wp/v2/posts?slug=${slug}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Erreur de requête : ${response.status}`);
        }
        
        const articles = await response.json();
        
        // Vérifiez si un article a été trouvé avec ce slug
        if (articles.length > 0) {
            return articles[0].id;
        } else {
            throw new Error('Aucun article trouvé avec ce slug.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID de l\'article :', error);
        return null;
    }
}

// Exemple d'utilisation

// fetchArticleIdBySlug('votre-slug-ici').then(articleId => {
//     if (articleId) {
//         console.log('ID de l\'article :', articleId);
//     } else {
//         console.log('Article non trouvé.');
//     }
// });



// Afficher l'article sur la page
async function displayArticle(article) {
    try {
        const [featuredImageUrl, categoriesData, author] = await Promise.all([
            fetchFeaturedImage(article.featured_media),
            fetchCategoryName(article.categories[0]),
            getAuthorById(article.author)
        ]);

        // Construire et afficher le contenu de l'article
        document.getElementById('article').innerHTML = `
            <h2>${article.title.rendered}</h2>
            ${featuredImageUrl ? `<img class="featured-image mb-3" src="${featuredImageUrl}" alt="${article.title.rendered}">` : ""}
            <div>${article.content.rendered}</div>
        `;
        
        document.getElementById('categories').innerHTML = categoriesData;
        toggleVisibility(['toggleFormButton', 'footer', 'author', 'commentaire'], 'block');

        // Bouton de partage
        document.getElementById('shareBtn').addEventListener('click', () => {
            shareArticle(article.title.rendered, window.location.href);
        });

        // Récupérer et afficher les commentaires
        fetchComments(article.id);
        // addComment(214543);
         postId = article.id;

    } catch (error) {
        console.error("Erreur lors de l'affichage de l'article :", error);
    }
}

// Récupérer le nom de la catégorie
async function fetchCategoryName(categoryId) {
    const category = await fetchApi(`${siteUrl}/wp-json/wp/v2/categories/${categoryId}`);
    return category ? category.name : 'Catégorie inconnue';
}

// Récupérer les informations de l'auteur
async function getAuthorById(authorId) {
    const author = await fetchApi(`${siteUrl}/wp-json/wp/v2/users/${authorId}`);
    return author || { name: 'Inconnu' };
}

// Fonction pour afficher plusieurs éléments en même temps
function toggleVisibility(elementIds, displayStyle) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = displayStyle;
    });
}

// Partager l'article
async function shareArticle(title, url) {
    const shareButton = document.getElementById('shareBtn');
    const originalButtonText = `<i class="fas fa-share-alt "></i> ${shareButton.textContent}`;

    if (navigator.share) {
        try {
            await navigator.share({ title, url });
        } catch (error) {
            console.log('Erreur lors du partage:', error);
        }
    } else {
        try {
            await navigator.clipboard.writeText(url);
            shareButton.textContent = "Lien copié !";
            setTimeout(() => shareButton.innerHTML = originalButtonText, 3000);
        } catch (error) {
            console.error('Échec de la copie du lien', error);
        }
    }
}

// Afficher et ajouter des commentaires
async function fetchComments(postId) {
    const commentsData = await fetchApi(`${siteUrl}/wp-json/wp/v2/comments?post=${postId}`);
    const commentsContainer = document.getElementById("comid");
    
    if (commentsData && commentsData.length > 0) {
        commentsContainer.innerHTML = commentsData.map(comment => {
            const formattedDate = new Date(comment.date).toLocaleDateString('fr-FR', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
            return `
                   
            <div class="comment">
                <div class="comment-content">
                    <div class="comment-author">${comment.author_name}</div>
                    <div class="comment-date">Publié le ${formattedDate}</div>
                    <div class="comment-text">
                        ${comment.content.rendered}
                    </div>
                </div>
            </div>`;
    }).join('')
       
    } else {
        commentsContainer.innerHTML =`<h2 class="comments-title">Commentaires</h2>
            <div class="comment">
            <p>Aucun commentaire pour cet article</p>
            </div>`
         ;
    }
}
document.getElementById("toggleFormButton").addEventListener("click", function() {
    const form = document.getElementById("commentForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
  });
// async function addComment(postId) {
//     const username = 'alphaibrahimas95gmail.com'; // Remplacez par l'email de l'utilisateur
//     const password = '#Alphaosw1995'; // Remplacez par le mot de passe de l'utilisateur
//     const headers = new Headers();
// headers.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
// headers.append('Content-Type', 'application/json');

// fetch('https://setalmaa.com/wp-json/wp/v2/comments', {
//   method: 'POST',
//   headers: headers,
//   body: JSON.stringify({
//     post: postId,       // Remplacez par l'ID de l'article
//     content: 'Votre commentaire ici',
//     author_name: 'Votre Nom',
//     author_email: 'user@example.com' // Remplacez par votre email
//   })
// })
// .then(response => response.json())
// .then(data => console.log('Commentaire ajouté:', data))
// .catch(error => console.error('Erreur lors de l\'ajout du commentaire:', error));

// }



document.getElementById("commentForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    try {
        // const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Proxy public
        // const apiUrl = `${proxyUrl}https://setalmaa.com/wp-json/wp/v2/comments`;
        
        const apiUrl = `${siteUrl}/wp-json/wp/v2/posts?slug=${slug}`;
        
        // Obtenir l'article par son slug
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Erreur lors de la récupération de l'article");

        const articles = await response.json();

        // Vérifie que l'article existe
        if (articles.length === 0) {
            document.getElementById("responseMessage").innerText = "Article introuvable.";
            return;
        }

        const articleId = articles[0].id;
      
        // Récupération des informations de l'auteur et du contenu du commentaire
        const authorName = document.getElementById("authorName").value;
        const authorEmail = document.getElementById("authorEmail").value;
        const content = document.getElementById("content").value;

        const commentData = {
            post: articleId,
            content: content,
            author_name: authorName,
            author_email: authorEmail
        };
console.log(commentData);
        // Envoi du commentaire
        const commentResponse = await fetch(`${siteUrl}/wp-json/wp/v2/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Ajouter le jeton JWT si requis
                // "Authorization": "Bearer VOTRE_TOKEN_JWT"
            },
            body: JSON.stringify(commentData)
        });

        if (!commentResponse.ok) {
            throw new Error("Erreur lors de l'ajout du commentaire");
        }

        // Confirmation de l'ajout du commentaire
        document.getElementById("responseMessage").innerText = "Commentaire ajouté avec succès !";
        document.getElementById("commentForm").reset();

    } catch (error) {
        document.getElementById("responseMessage").innerText = "Erreur : " + error.message;
    }
});




// Gestion du slug dans l'URL


if (slug) {
    fetchArticleBySlug(slug);
} else {
    location.href = '../index.html';
    document.getElementById('article').innerHTML = '<p>Veuillez fournir un slug dans l\'URL.</p>';
}

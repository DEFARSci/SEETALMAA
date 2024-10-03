async function fetchFeaturedImage(mediaId) {
    const siteUrl = 'https://setalmaa.com'; // Remplacez par l'URL de votre site WordPress
    const mediaUrl = `${siteUrl}/wp-json/wp/v2/media/${mediaId}`;

    try {
        const response = await fetch(mediaUrl);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de l'image à la une : ${response.statusText}`);
        }
        const media = await response.json();
        return media.source_url; // Retourne l'URL de l'image à la une
    } catch (error) {
        console.error('Erreur :', error);
        return null; // Retourne null en cas d'erreur
    }
}
// Fonction pour récupérer l'article en fonction du slug
async function fetchArticleBySlug(slug) {
    const siteUrl = 'https://setalmaa.com'; // Remplacez par l'URL de votre site WordPress
    const apiUrl = `${siteUrl}/wp-json/wp/v2/posts?slug=${slug}`;
    

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de l'article : ${response.statusText}`);
        }
        const articles = await response.json();
        console.log(articles)
        
        // Vérifier si l'article existe
        if (articles.length > 0) {
            displayArticle(articles[0]);
        } else {
            document.getElementById('article').innerHTML = '<p>Aucun article trouvé.</p>';
        }
    } catch (error) {
        console.error('Erreur :', error);
        document.getElementById('article').innerHTML = '<p>Une erreur est survenue lors de la récupération de l\'article.</p>';
    }
}

// Fonction pour afficher l'article sur la page
async function displayArticle(article) {
       // Récupérer l'image à la une
       const featuredImageUrl = await fetchFeaturedImage(article.featured_media);

        // Construire le contenu de l'article
        let articleContent = `
            <h2>${article.title.rendered}</h2>
        `;

        // Afficher l'image à la une si elle existe
        if (featuredImageUrl) {
            articleContent += `<img class="featured-image mb-3" src="${featuredImageUrl}" alt="${article.title.rendered}">`;
        }

        // Ajouter le contenu de l'article
        articleContent += `<div>${article.content.rendered}</div>`;
        document.getElementById('article').innerHTML = articleContent;

        document.getElementById('shareBtn').classList.remove('hidden');

        // Ajouter un écouteur d'événement pour le bouton de partage
        document.getElementById('shareBtn').addEventListener('click', function () {
            shareArticle(article.title.rendered, window.location.href);
});
}

// Récupérer le slug de l'URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug'); // Exemple : https://votre-site.com/article.html?slug=mon-super-article

if (slug) {
    fetchArticleBySlug(slug);
} else {
    document.getElementById('article').innerHTML = '<p>Veuillez fournir un slug dans l\'URL.</p>';
}

 // Fonction pour partager l'article
 async function shareArticle(title, url) {
    const shareButton = document.getElementById('shareBtn');
    const originalButtonText =`<i class="fas fa-share-alt "></i> `+shareButton.textContent;

    if (navigator.share) {
        // Utilisation de l'API Web Share
        try {
            await navigator.share({
                title: title,
                url: url
            });
            console.log('Article partagé avec succès.');
        } catch (error) {
            console.log('Erreur lors du partage:', error);
        }
    } else {
        // Si l'API Web Share n'est pas disponible, copier l'URL dans le presse-papier
        try {
            await navigator.clipboard.writeText(url);
            shareButton.textContent = "Lien copié !"; // Changer le texte du bouton
            console.log('Lien copié dans le presse-papier');

            // Réinitialiser le texte du bouton après 5 secondes
            setTimeout(() => {
                shareButton.innerHTML = originalButtonText; // Remettre le texte d'origine
            }, 3000); // 5000 millisecondes = 5 secondes
        } catch (error) {
            console.error('Échec de la copie du lien dans le presse-papier', error);
        }
    }
}



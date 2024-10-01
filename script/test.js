let arraydata = [];
const auteur = document.getElementById('auteur');
const title = document.getElementById('title');
const img = document.getElementById('img');
const categoriesContainer = document.getElementById('categories'); // Conteneur pour les catégories
const commentsContainer = document.getElementById('comments'); // Conteneur pour les commentaires
const commentForm = document.getElementById('commentForm'); // Formulaire pour ajouter des commentaires
const commentInput = document.getElementById('commentInput'); // Champ pour écrire le commentaire
const authorInput = document.getElementById('authorInput'); // Champ pour le nom de l'auteur
const emailInput = document.getElementById('emailInput'); // Champ pour l'email de l'auteur

// Récupération des données de l'article
async function fetchPageData() {
    try {
        const response = await fetch('https://setalmaa.com/wp-json/wp/v2/posts');
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log(data[0]);

        // Afficher le contenu de l'article
        const article = data[0].content.rendered;

        // Récupérer et afficher le titre de l'article
        title.innerHTML = data[0].title.rendered;

        // Récupérer l'auteur de l'article
        const authorId = data[0].author;
        const authorResponse = await fetch(`https://setalmaa.com/wp-json/wp/v2/users/${authorId}`);
        const authorData = await authorResponse.json();
        auteur.innerHTML = `Auteur: ${authorData.name}`;

        // Récupérer l'image à la une
        const featuredMediaId = data[0].featured_media;
        const mediaResponse = await fetch(`https://setalmaa.com/wp-json/wp/v2/media/${featuredMediaId}`);
        
        if (!mediaResponse.ok) {
            throw new Error(`HTTP error ${mediaResponse.status}`);
        }

        const mediaData = await mediaResponse.json();
        const imageUrl = mediaData.source_url;
        img.innerHTML = `<img src="${imageUrl}" alt="${data[0].title.rendered}" width="440" height="274" />`;

        // Récupérer et afficher les catégories
        await fetchCategories(data[0].categories);

        // Récupérer et afficher les commentaires
        await fetchComments(data[0].id);

        // Gestion du formulaire pour ajouter un commentaire
        commentForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Empêcher le rechargement de la page
            await addComment(data[0].id);
        });

        return data;

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        throw error;
    }
}

// Récupération des catégories
async function fetchCategories(categoryIds) {
    try {
        const response = await fetch('https://setalmaa.com/wp-json/wp/v2/categories');
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const categoriesData = await response.json();
        console.log("Categories data:", categoriesData); 

        // Filtrer les catégories pour celles qui sont présentes dans l'article
        const selectedCategories = categoriesData.filter(category => categoryIds.includes(category.id));
        console.log("Selected categories:", selectedCategories);

        // Afficher les catégories
        categoriesContainer.innerHTML = selectedCategories.length > 0 
            ? selectedCategories.map(category => `<span class="badge bg-secondary me-1">${category.name}</span>`).join(' ')
            : "<span>Aucune catégorie trouvée</span>";

    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
    }
}

// Récupération des commentaires
async function fetchComments(postId) {
    try {
        const response = await fetch(`https://setalmaa.com/wp-json/wp/v2/comments?post=${postId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);

 
let arraydata = [];
const auteur = document.getElementById('auteur');
const title = document.getElementById('title');
const img = document.getElementById('img');
const categoriesContainer = document.getElementById('categories'); // Conteneur pour les catégories
const commentsContainer = document.getElementById('comments'); // Conteneur pour les commentaires
const commentForm = document.getElementById('commentForm'); // Formulaire pour ajouter des commentaires
const commentInput = document.getElementById('commentInput'); // Champ pour écrire le commentaire
const authorInput = document.getElementById('authorInput'); // Champ pour le nom de l'auteur
const emailInput = document.getElementById('emailInput'); // Champ pour l'email de l'auteur

// Récupération des données de l'article
async function fetchPageData() {
    try {
        const response = await fetch('https://setalmaa.com/wp-json/wp/v2/posts');
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log(data[0]);

        // Afficher le contenu de l'article
        const article = data[0].content.rendered;

        // Récupérer et afficher le titre de l'article
        title.innerHTML = data[0].title.rendered;

        // Récupérer l'auteur de l'article
        const authorId = data[0].author;
        const authorResponse = await fetch(`https://setalmaa.com/wp-json/wp/v2/users/${authorId}`);
        const authorData = await authorResponse.json();
        auteur.innerHTML = `Auteur: ${authorData.name}`;

        // Récupérer l'image à la une
        const featuredMediaId = data[0].featured_media;
        const mediaResponse = await fetch(`https://setalmaa.com/wp-json/wp/v2/media/${featuredMediaId}`);
        
        if (!mediaResponse.ok) {
            throw new Error(`HTTP error ${mediaResponse.status}`);
        }

        const mediaData = await mediaResponse.json();
        const imageUrl = mediaData.source_url;
        img.innerHTML = `<img src="${imageUrl}" alt="${data[0].title.rendered}" width="440" height="274" />`;

        // Récupérer et afficher les catégories
        await fetchCategories(data[0].categories);

        // Récupérer et afficher les commentaires
        await fetchComments(data[0].id);

        // Gestion du formulaire pour ajouter un commentaire
        commentForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Empêcher le rechargement de la page
            await addComment(data[0].id);
        });

        return data;

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        throw error;
    }
}

// Récupération des catégories
async function fetchCategories(categoryIds) {
    try {
        const response = await fetch('https://setalmaa.com/wp-json/wp/v2/categories');
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const categoriesData = await response.json();
        console.log("Categories data:", categoriesData); 

        // Filtrer les catégories pour celles qui sont présentes dans l'article
        const selectedCategories = categoriesData.filter(category => categoryIds.includes(category.id));
        console.log("Selected categories:", selectedCategories);

        // Afficher les catégories
        categoriesContainer.innerHTML = selectedCategories.length > 0 
            ? selectedCategories.map(category => `<span class="badge bg-secondary me-1">${category.name}</span>`).join(' ')
            : "<span>Aucune catégorie trouvée</span>";

    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
    }
}

// Récupération des commentaires
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
        console.error('Erreur lors de la récupération des commentaires :', error);
    }
}

// Ajouter un commentaire
async function addComment(postId) {
    const commentContent = commentInput.value;
    const authorName = authorInput.value;
    const authorEmail = emailInput.value;

    // Vérification des champs
    if (!commentContent || !authorName || !authorEmail) {
        alert('Tous les champs doivent être remplis');
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
        console.log('Nouveau commentaire ajouté :', newComment);

        // Ajouter le commentaire dans la liste des commentaires
        commentsContainer.innerHTML += `<p><strong>${newComment.author_name}</strong>: ${newComment.content.rendered}</p>`;

        // Réinitialiser le formulaire
        commentForm.reset();

    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
    }
}

// Appel à la fonction principale
fetchPageData()
    .then(data => {
        arraydata = data;
        console.log("mon array est ", arraydata);
    })

let arraydata = [];
const auteur = document.getElementById('auteur');
const title = document.getElementById('title');
const img = document.getElementById('img');
const categoriesContainer = document.getElementById('categories'); // Conteneur pour les catégories

async function fetchPageData() {
    try {
        const response = await fetch('https://setalmaa.com/wp-json/wp/v2/posts');
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`); 
        }

        const data = await response.json();
        console.log(data[0]);
        const article = data[0].content.rendered;

        // Récupérer l'ID de l'image à la une
        const featuredMediaId = data[0].featured_media;

        // Récupérer les détails de l'image à la une
        const mediaResponse = await fetch(`https://setalmaa.com/wp-json/wp/v2/media/${featuredMediaId}`);
        
        if (!mediaResponse.ok) {
            throw new Error(`HTTP error ${mediaResponse.status}`);
        }

        const mediaData = await mediaResponse.json();
        const imageUrl = mediaData.source_url;

        // Afficher l'image
        img.innerHTML = `<img src="${imageUrl}" alt="${data[0].title.rendered}" width="440" height="274" />`;

        // Récupérer et afficher les catégories
        await fetchCategories(data[0].categories);

        return data;

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        throw error;
    }
}

async function fetchCategories(categoryIds) {
    try {
        // Récupérer les catégories
        const response = await fetch('https://setalmaa.com/wp-json/wp/v2/categories');
        
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const categoriesData = await response.json();

        // Filtrer les catégories pour celles qui sont présentes dans les articles
        const selectedCategories = categoriesData.filter(category => categoryIds.includes(category.id));

        // Afficher les catégories
        categoriesContainer.innerHTML = selectedCategories.map(category => `<span class="badge bg-secondary me-1">${category.name}</span>`).join(' ');

    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
    }
}

fetchPageData()
    .then(data => {
        arraydata = data;
        console.log("mon array est ", arraydata);
    });
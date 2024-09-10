// Fonction pour récupérer des données d'une API et les stocker dans un tableau
const apiKey = "9466e1b4462e459ba89007ac9952bb6e";
var data = [];
async function fetchDataAndStoreInArray(apiUrl) {
    try {
        // Faire la requête pour obtenir les données depuis l'API
        let response = await fetch(apiUrl);

        // Vérifier si la réponse est correcte (code 200)
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        // Convertir la réponse en JSON
        let data = await response.json();

        // Créer un tableau pour stocker les données
        let dataArray = [];

        // Parcourir les données et les ajouter dans le tableau
        // Supposons que data est un tableau d'objets
        if (Array.isArray(data)) {
            dataArray = [...data];  // Cloner directement les données si c'est un tableau
        } else {
            dataArray.push(data);   // Si c'est un objet unique, on le met dans le tableau
        }

        // Afficher le tableau dans la console
         console.log("Données récupérées et stockées dans le tableau :", dataArray[0].articles[0]);

        // Retourner le tableau si nécessaire
        return dataArray;
    } catch (error) {
        // Gérer les erreurs en cas de problème
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Exemple d'utilisation de la fonction
let apiUrl = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey="+apiKey+"";  

 data= fetchDataAndStoreInArray(apiUrl);
// const title = document.getElementById("titles-list");
// for (let i = 0; i < dataArray[0].articles.length; i++) {
//     const li = document.createElement("li");
//     li.innerHTML = dataArray[0].articles[i].title;
//     title.appendChild(li);
// }
// console.log(data[0].articles.length);
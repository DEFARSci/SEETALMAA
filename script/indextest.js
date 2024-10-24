window.onscroll = function() {
    console.log("scroll");
    let button = document.getElementById("topButton");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        button.style.display = "block"; // Afficher le bouton
       
    } else {
        button.style.display = "none"; // Cacher le bouton
        
    }
};

// Fonction pour faire défiler vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Animation fluide
    });
}


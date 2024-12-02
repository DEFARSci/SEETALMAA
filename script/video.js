$(document).ready(function () {
    $('.video-carousel').slick({
        slidesToShow: 1.2,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        appendDots: $('.custom-dots'),
        centerMode: true,
        centerPadding: '7.5%',
        responsive: [
        {
        breakpoint: 1024, // Tablettes larges
        settings: {
            slidesToShow: 1.2,
            centerPadding: '5%',
            arrows: true // Garder les flèches sur tablettes
        }
    },
    {
        breakpoint: 768, // Tablettes et mobiles
        settings: {
            slidesToShow: 1,
            centerPadding: '0',
            arrows: true // Désactiver les flèches sur mobile
        }
    },
    {
        breakpoint: 480, // Très petits écrans
        settings: {
            slidesToShow: 1,
            centerPadding: '0',
            dots: true, // Garder les points pour la navigation
            arrows: true, // Toujours désactivé ici
            
        }
    }
]
        
    });

    // Initialisation du carousel de podcast mis à jour
    $('.podcast-carousel').slick({
        slidesToShow: 4.2,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });
});
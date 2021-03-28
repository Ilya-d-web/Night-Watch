$(document).ready(function () {
    $('.slider').slick({
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 400,
        easing: 'ease-in-out',
        autoplay: true,
        autoplaySpeed: 3500,
        draggable: false,
        touchThreshold: 8,
        waitForAnimate: true,
        variableWidth: true,
        responsive: [{
            breakpoint: 767.98,
            settings: {
                arrows: false,
            },
        }],
    });
})
$(document).ready(function () {
    let scrollOffset = 0;

    $('.icon-menu').on("click", function () {
        toggleClassActive();
        //Смена класса active у элементов menu и icon

        if ($('.menu__body').hasClass('active')) {
            stopPropagationIcon();
            //Остановка клика по icon-menu
            stopPropagationMenu();
            //Остановка клика по menu__body

            $('.header__content').on("click", function (event) {
                removeClassActive();
            });
            //Закрытие burger кликом по header
        }
    });

    $(window).on("resize", function () {
        if (window.matchMedia('(min-width: 768px)').matches) {
            removeClassActive();
        }
    });
    //Проверка экрана на смену ширины

    $(window).on("scroll", function () {
        let beginH = $("#begin").innerHeight();
        scrollOffset = $(this).scrollTop();

        if (scrollOffset > beginH - 38) {
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
    });
    //Фиксирование позиции burger во время скрола

    $('a.menu__link').on("click", function () {
        removeClassActive();
        //Закрытие burger при прокрутке к якорю

        $("html, body").animate({
            scrollTop: ($($(this).attr("href")).offset().top + -80) + "px"
        }, {
            duration: 1000,
            easing: "swing",
        });
    });
    //Плавная прокрутка
});
//Главная функция страницы, которая срабатывает после загрузки содержимого

function removeClassActive() {
    $('.icon-menu').removeClass('active');
    $('.menu__body').removeClass('active');
    $('body').removeClass('no-scroll');
}
//Удаление класса active
function toggleClassActive() {
    $('.icon-menu').toggleClass('active');
    $('.menu__body').toggleClass('active');
    $('body').toggleClass('no-scroll');
}
//Смена класса active
function stopPropagationIcon() {
    $('.icon-menu').on("click", function (event) {
        event.stopPropagation();
    });
}
//Остановка клика по icon-menu
function stopPropagationMenu() {
    $('.menu__body').on("click", function (event) {
        event.stopPropagation();
    });
}
//Остановка клика по menu__body
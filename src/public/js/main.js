$(document).ready(function ($) {
    AOS.init();
    $('.owl-carousel').owlCarousel({
        loop: false,
        margin: 10,
        dots: false,
        nav: true,
        items: 5,
    });
    var owl = $('.owl-carousel');
    owl.owlCarousel();
    $('.next-btn').click(function () {
        owl.trigger('next.owl.carousel');
    });
    $('.prev-btn').click(function () {
        owl.trigger('prev.owl.carousel');
    });
    $('.prev-btn').addClass('disabled');
    $(owl).on('translated.owl.carousel', function (event) {
        if ($('.owl-prev').hasClass('disabled')) {
            $('.prev-btn').addClass('disabled');
        } else {
            $('.prev-btn').removeClass('disabled');
        }
        if ($('.owl-next').hasClass('disabled')) {
            $('.next-btn').addClass('disabled');
        } else {
            $('.next-btn').removeClass('disabled');
        }
    });
    var mySwiper = new Swiper('.swiper-container', {
        // Các Parameters
        direction: 'horizontal',
        loop: true,

        // Nếu cần pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Nếu cần navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Nếu cần scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
    var mySwiper2 = new Swiper('.swiper-container-doitac', {
        slidesPerView: 8,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        autoplay: 5000,
        speed: 800,
        autoplayDisableOnInteraction: false,
    });
   
});


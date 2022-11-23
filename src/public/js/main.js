$(document).tooltip({
    items: 'img, [data-geo], [title]',
    content: function () {
        var element = $(this);
        if (element.is('[data-geo]')) {
            var text = element.text();
            return (
                "<img class='map' alt='" +
                text +
                "' src='http://maps.google.com/maps/api/staticmap?" +
                'zoom=11&size=350x350&maptype=terrain&sensor=false&center=' +
                text +
                "'>"
            );
        }
        if (element.is('[title]')) {
            return element.attr('title');
        }
        if (element.is('img')) {
            return element.attr('alt');
        }
    },
});

$(document).ready(function ($) {
    AOS.init({
        duration: 1000,
    });
    const tobii = new Tobii();

    //gallery
    $('#lightSlider').lightSlider({
        gallery: true,
        item: 1,
        loop: true,
        slideMargin: 0,
        slideMove: 1,
        thumbItem: 3,
        slideMargin: 10,
        speed: 400, //ms'
        auto: true,
        pause: 5000,
        enableDrag: true,
    });

    $('.owl-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 5,
        responsiveClass: true,
        responsive: {
            0: {
                nav: false,
                items: 2,
            },
            480: {
                nav: false,
                items: 3,
            },
            769: {
                nav: true,
                items: 5,
            },
        },
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
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 8,
                spaceBetween: 50,
            },
        },
    });
    // back-to-top
    var mybutton = document.getElementById('back-to-top');
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (mybutton != null) {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.style.display = 'block';
            } else {
                mybutton.style.display = 'none';
            }
        }
    }

    if ($('[name="payment_method"]').val() == 'bacs') {
        $('#collapseOne').collapse('show');
    }
    $('[name="payment_method"]').on('change', function () {
        if ($(this).val() === 'bacs') {
            $('#collapseOne').collapse('show');
        } else {
            $('#collapseOne').collapse('hide');
        }
    });

    $(window).on('load', function () {
        if ($(window).width() > 600) {
            setTimeout(function () {
                $('#TuVanModal').modal('show');
            }, 1800000);
        }
    });

    $('.list-inline-item').click(function () {
        let current = $(this).children('a');
        let prev = $(this).siblings().children('a');
        current.addClass('chose');
        prev.removeClass('chose');
    });

    $('.search-form__submit').click(function () {
        let key = $('.search-form__input').val();
        window.location.replace(`/san-pham/tim-kiem?key=${key}`);
    });
});

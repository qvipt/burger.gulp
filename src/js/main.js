function setEventsSlider() {
    var burger = document.querySelector('#burger');
    if (burger) {
        burger.addEventListener('click', function () {
            var buregerMenu = document.querySelector('#burger');
            if (burgerMenu) {
                burgerMenu.style.display = 'block';
            }
        });
    }

    var burgerMenuClose = document.querySelector('.burger-menu-close');
    if (burgerMenuClose) {
        burgerMenuClose.addEventListener('click', function () {
            var buregerMenu = document.querySelector('#burger');
            if (burgerMenu) {
                burgerMenu.style.display = 'none';
            }
        });
    }

    var consistBlock = document.querySelector('.consist__block');
    if (consistBlock) {
        consistBlock.addEventListener('mouseover', function () {
            console.log('over');
            var consist = document.querySelector('.consist__menu');
            if (consist) {
                console.log('display:block');
                consist.style.display = 'block';
            }
        })
        consistBlock.addEventListener('mouseout', function () {
            var consist = document.querySelector('.consist__menu');
            if (consist) consist.style.display = 'none';
        })
    }

    //  Slider routine

    var right = document.querySelector('.right');
    var left = document.querySelector('.left');
    var slider = document.querySelector('.slider__list');
    var countSlide = document.querySelectorAll('.slider__item').length;
    var currentSlide = 0;

    right.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentSlide == countSlide - 1) return;
        currentSlide++;
        slider.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
    });

    left.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentSlide == 0) return;
        currentSlide--;
        slider.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
    });
}

//  jQuery one page slider

function setEventsOnePagerjQuery() {
    const sections = $('.section');
    const display = $('.maincontent');
    const fixedItems = $('.fixed-menu__link');

    let isScroll = false;

    const gotoSection = secNumber => {
        // console.log(secNumber);

        const position = `${secNumber * -100}%`;

        if (isScroll) return;

        isScroll = true;

        sections.eq(secNumber).addClass('active').siblings().removeClass('active');

        display.css({
            'transform': `translate(0, ${position})`,
            '-webkit-transform': `translate(0, ${position})`
        });


        fixedItems.removeClass('fixed-menu__link--active');
        fixedItems.eq(secNumber).addClass('fixed-menu__link--active');

        setTimeout(() => {
            isScroll = false;
        }, 200);
    }

    scroll = direction => {
        var currentSection = sections.filter('.active').index();

        if (direction == 'down' && currentSection < sections.length - 1) {
            currentSection++;
            gotoSection(currentSection);
        };

        if (direction == 'up' && currentSection > 0) {
            currentSection--;
            gotoSection(currentSection);
        }
    }

    $(document).on({
        wheel: e => {
            const delta = e.originalEvent.deltaY;
            if (delta > 0) scroll('down');
            if (delta < 0) scroll('up');
        },
        keydown: e => {
            switch (e.keyCode) {
                case 38:
                    scroll('up');
                    break;
                case 40:
                    scroll('down');
                    break;
            }
        }
    });

    $('[scrollTo]').on('click', e => {
        e.preventDefault;

        if ($(e.currentTarget).hasClass('burger-menu-item')) {
            $('#burgerMenu').css({
                'display': 'none'
            });
        }

        const scrollTo = $(e.currentTarget).attr('scrollTo');
        // console.log(scrollTo);
        gotoSection(scrollTo);
    });

    $('.arrowdown').on('click', e => {
        scroll('down');
    });

}

function setEventsMenu() {
    $('.menu__link').on('click', e => {
        e.preventDefault;

        var item = $(e.currentTarget).parent().siblings('.menu__acco-content');

        $('.menu__acco-content').not(item).removeClass('menu__acco-content--active');

        item.toggleClass('menu__acco-content--active');
    });
}

function setYandexMap() {
    ymaps.ready(init);
    var myMap;

    function init() {
        myMap = new ymaps.Map("mapID", {
            center: [59.91817154, 30.30557800],
            controls: ['zoomControl'],
            zoom: 12
        });

        myMap.behaviors.disable('scrollZoom');

        var myPlacemark1 = new ymaps.Placemark([59.93121219, 30.25786075], {
            balloonContent: 'Бегом сюда!'
        }, {
                iconLayout: 'default#image',
                iconImageHref: '../img/svg/map-marker.svg'
            });
        myMap.geoObjects.add(myPlacemark1);

    }
}

function setReviewBox() {
    $('.review__more').on('click', e => {
        e.preventDefault;
        $('.review__msg-bg').css('display', 'block');
    });

    $('.close__link').on('click', e => {
        e.preventDefault;
        $('.review__msg-bg').css('display', 'none');
    });
}
function setTeamAcco() {
    $('.team__acco-trigger').on('click', e => {
        e.preventDefault;

        // console.log('trigger');

        var item = $(e.currentTarget).parent();

        $('.team__acco-item').not(item).removeClass('team__acco-item--active');

        item.addClass('team__acco-item--active');
    })
}

function setFormEvents() {
    $('.form__clearbtn').on('click', e => {
        e.preventDefault;
        $('#orderForm')[0].reset();
    });

    $('.form__orderbtn').on('click', e => {
        e.preventDefault;
        $.ajax('server.php', {
            type: "POST",
            data: $('#orderForm').serialize()
        })
            .done(function (data) {
                alert('SUCCESS');
            })
            .fail(function (data) {
                alert('FAIL');
            })
    });
}

setEventsSlider();
setEventsOnePagerjQuery();
setEventsMenu();
setYandexMap();
setReviewBox();
setTeamAcco();
setFormEvents();



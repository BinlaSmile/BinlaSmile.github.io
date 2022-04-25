var alphaDust = function () {

    var _menuOn = false;

    function initPostHeader() {
        $('.main .post').each(function () {
            var $post = $(this);
            var $header = $post.find('.post-header.index');
            var $title = $post.find('h1.title');
            var $readMoreLink = $post.find('a.read-more');

            var toggleHoverClass = function () {
                $header.toggleClass('hover');
            };

            $title.hover(toggleHoverClass, toggleHoverClass);
            $readMoreLink.hover(toggleHoverClass, toggleHoverClass);
        });
    }

    function _menuShow () {
        $('nav a').addClass('menu-active');
        $('.menu-bg').show();
        $('.menu-item').css({opacity: 0});
        TweenLite.to('.menu-container', 1, {padding: '0 40px'});
        TweenLite.to('.menu-bg', 1, {opacity: '0.92'});
        TweenMax.staggerTo('.menu-item', 0.5, {opacity: 1}, 0.3);
        _menuOn = true;

        $('.menu-bg').hover(function () {
            $('nav a').toggleClass('menu-close-hover');
        });
    }

    function _menuHide() {
        $('nav a').removeClass('menu-active');
        TweenLite.to('.menu-bg', 0.5, {opacity: '0', onComplete: function () {
            $('.menu-bg').hide();
        }});
        TweenLite.to('.menu-container', 0.5, {padding: '0 100px'});
        $('.menu-item').css({opacity: 0});
        _menuOn = false;
    }

    function initMenu() {

        $('nav a').click(function () {
            if(_menuOn) {
                _menuHide();
            } else {
                _menuShow();
            }
        });

        $('.menu-bg').click(function (e) {
            if(_menuOn && e.target === this) {
                _menuHide();
            }
        });
    }

    function initBinlaLogo(){
        var eyeBallLeft = document.getElementById('eye-ball-l');
        var eyeBallRight = document.getElementById('eye-ball-r');
        var mouth = document.getElementById('mouth');
        if(eyeBallLeft && eyeBallRight && mouth){
            addEventListener('mousemove', function(e) {
                var e = e || window.event;
                _setPos(eyeBallLeft,e,3);
                _setPos(eyeBallRight,e,3);
                _setPos(mouth,e,2);
            },false)
        }
    }

    function initToolBar(){
        var backTop = document.querySelector(".back-top");
        var time = null;
        window.onscroll = function () {
            backTop.style.opacity = (document.documentElement.scrollTop <= 240)? document.documentElement.scrollTop/240 : 1;
            backTop.style.display = backTop.style.opacity == 0? 'none':'flex';
        }
        backTop.onclick = function () {
            var step = document.documentElement.scrollTop;
            time = window.setInterval(function () {
                step -= 100;
                if (step <= 0) {
                    window.clearInterval(time);
                }
                window.scrollTo(0, step);
            }, 10);
        }
    }

    function displayArchives() {
        $('.archive-post').css({opacity: 0});
        TweenMax.staggerTo('.archive-post', 0.4, {opacity: 1}, 0.15);
    }
    
    function displayTagAndCat(){
        $('.tag-cat').css({opacity: 0});
        TweenMax.staggerTo('.tag-cat', 0.6, {opacity: 1}, 0.15);
    }

    function _setPos(item,moveEvent,moveRange){
        let leftX = moveEvent.clientX - (item.offsetLeft - item.offsetWidth / 2);
        let leftY = moveEvent.clientY - (item.offsetTop - item.offsetHeight / 2);
        let leftPointRadius = Math.floor(_radius({ x: leftX, y: leftY }));
        let pointRadian = Math.atan2(leftX, leftY);
        let itemXY= _posXY(moveRange, pointRadian);
        item.style.cssText = `left:${itemXY.x}px; top: ${itemXY.y}px;`;
    }

    function _posXY(radius, radian) {
        return {
            x: Math.sin(radian) * radius,
            y: Math.cos(radian) * radius,
        }
    }

    function _radius(pos) {
        return Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
    }

    return {
        initPostHeader: initPostHeader,
        initMenu: initMenu,
        initBinlaLogo: initBinlaLogo,
        initToolBar:initToolBar,
        displayArchives: displayArchives,
        displayTagAndCat: displayTagAndCat
    };
}();


$(document).ready(function () {
    alphaDust.initPostHeader();
    alphaDust.initMenu();
    alphaDust.initBinlaLogo();
    alphaDust.initToolBar();
    alphaDust.displayArchives();
    alphaDust.displayTagAndCat();
});
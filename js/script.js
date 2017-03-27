/*
* Navbar Functions
*/
var previousColor;
var currentSection;
var isScrolling = false;
function scrollHandler() {
    locationHashHandler();
    setNavBarClass();
}
function locationHashHandler() {
    $('.section').each(function () {
        if ($(this).offset().top < window.pageYOffset + 10 && $(this).offset().top + $(this).height() > window.pageYOffset + 10) {
            revealSocialMedias($(this).attr('id'));
            setCurrentSection($(this).attr('id'));
            setPaginationActive($(this).attr('id'));

        }
    });
}
function setCurrentSection(sectionId) {
    currentSection = sectionId;
    window.location.hash = currentSection;
}
function setPaginationActive(sectionId) {
    var activePagination = $('.move.active');
    if (activePagination.attr('id').split('-')[0] !== sectionId) {
        var sectionLink = $(["#", sectionId, "-link"].join(""));
        activePagination.removeClass('active');
        sectionLink.addClass('active');
    }
}
function revealSocialMedias(sectionId) {
    if (sectionId !== currentSection) {
        if (sectionId === "home") {
            $('.navbar .unveil').css({ opacity: 0 });
        } else {
            $('.navbar .unveil').css({ opacity: 1 });
            if (sectionId === "communities") {
                resizePhone();
            }
        }
    }
}
var sections = {
    "global": "navbar-orange",
    "services": "navbar-green",
    "communities": "navbar-blue",
    "team": "navbar-blugreen",
    "home": "navbar-transparent"
}
function setNavBarClass() {
    if ($(".navbar").offset().top > 50) {
        if (currentSection) {
            $(".navbar").removeClass(previousColor);
        }
        previousColor = sections[currentSection];
        $('.navbar').addClass(previousColor);
    }
}
function scrollToHandler() {
    var targetId = ['#', $(this).attr("id").split("-")[0]].join('');
    var target = $(targetId);
    if (targetId !== location.hash) {
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 700);
            $(".move.active").removeClass('active');
            $(this).addClass('active');
        }
    }
}
/*
* Subscribe Functions
*/
function submitSubscriber() {
    var email = $('#email').val();
    if (emailValidator(email)) {
        $.ajax({
            url: './php/check.php',
            data: { email: email },
            type: 'POST',
            success: function (msg) {
                var status = msg.split(':');
                status = parseInt(status[0]);
                if (!status) {
                    status = 200;
                }
                subscribeHandler(status);
            }
        });
    } else {
        subscribeHandler(403);
    }
}
function emailValidator(email) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test(email);
}
function subscribeHandler(status) {
    var message = statusHandler(status);
    $('#subscribeMessage').text(message);
    $('.subscribe-message').removeClass('closed');
    setTimeout(function () {
        $('.subscribe-message').addClass('closed');
    }, 1000);
}
function statusHandler(status) {
    status = parseInt(status);
    var result;
    switch (status) {
        case 403:
            result = "Entrez une adresse mail valide";
            break;
        case 400:
            result = "Vous êtes déjà inscrit à notre newsletter";
            break;
        case 200:
            result = "Vous n'avez plus qu'à confirmer par mail :)";
            break;
    }
    return result;
}
/*
* Community Functions
*/
//var innerPhoneBox = getSvgPositions('inner-phone');
function beginHoverCommunityCallback() {
    innerPhoneBox = getSvgPositions('inner-phone');
    $('#overlay').css({ transition: "1s", top: innerPhoneBox.top + innerPhoneBox.top / 10, left: innerPhoneBox.left + 5, width: innerPhoneBox.width - 10, height: innerPhoneBox.height - innerPhoneBox.height / 5 });
}
function endHoverCommunityCallback() {
    $('#overlay').css({ left: innerPhoneBox.left - innerPhoneBox.width, transition: "1s" });
}
function resizePhone() {
    innerPhoneBox = getSvgPositions('inner-phone');
    $('#background-blue').css({ top: innerPhoneBox.top + innerPhoneBox.top / 20, left: innerPhoneBox.left - innerPhoneBox.width, width: innerPhoneBox.width, height: innerPhoneBox.height - innerPhoneBox.height / 10 });
    $('#background').css({ top: innerPhoneBox.top + innerPhoneBox.top / 20, left: innerPhoneBox.left + 5, width: innerPhoneBox.width - 10, height: innerPhoneBox.height - innerPhoneBox.height / 10 });
    $('.phone-logo').css({ top: innerPhoneBox.top + innerPhoneBox.height / 4, left: innerPhoneBox.left, width: innerPhoneBox.width, height: 'auto' });
}
function beginHoverGlobeCallback() {
    var id = $(this).attr('id');
    var svgPosition = getSvgPositions(id);
    var isBig = window.matchMedia("(min-width: 761px)").matches;
    var text;
    var top = 120, left = 120;
    if (!isBig) {
        top = 50;
        left = 0;
    }
    switch (id) {
        case "refresh":
            text = "Échangez des services collaboratifs, des informations fiables et authentiques avec des voyageurs et des locaux !";
            if (isBig) {
                left = 360;
                top = 20;
            } else {
                left = -120;
                top = 70;
            }
            break;
        case "people":
            text = "Rencontrez et intégrez des communautés de passionnés partageant des centres d’intérêts communs "
            if (isBig) {
                left = 370;
                top = 20;
            } else {
                left = -120;
            }
            break;
        case "sablier":
            text = "Accédez à tous les besoins liés au voyage sur une seule solution. Gain de temps garanti !"
            if (isBig) {
                left = -150;
                top = 0;
            } else {
                top = 170;
                left = 50;
            }
            break;
    }
    $('#globeTooltipMobile').css({ top: svgPosition.top - top, left: svgPosition.left - left });
    $('.tooltip-inner-mobile').text(text);
    $('#globeTooltipMobile').addClass('content-appear');
    $('.tooltip-text-mobile').addClass('text-appear');
    $('.tooltip-inner-mobile').addClass('inner-appear');
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) {
        setTimeout(function () {
            $('#globeTooltipMobile').removeClass('content-appear');
            $('.tooltip-text-mobile').removeClass('text-appear');
            $('.tooltip-inner-mobile').removeClass('inner-appear');
        }, 2000);
    }
}
function endHoverGlobeCallback() {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (!isMobile.matches) {
        $('#globeTooltipMobile').removeClass('content-appear');
        $('.tooltip-text-mobile').removeClass('text-appear');
        $('.tooltip-inner-mobile').removeClass('inner-appear');
    }
}
/*
* SVG functions
*/
function getSvgPositions(svgId) {
    var svgElement = document.getElementById(svgId);
    return svgElement.getBoundingClientRect();
}
/*
* View initialisation
*/
function setTooltipPosition(svgId, tooltipId) {
    var svgPosition = getSvgPositions(svgId);
    $(tooltipId).css({ top: svgPosition.top - 160, left: svgPosition.left - 60, display: "block" })
}
function setTooltipsPosition() {
    setTooltipPosition('people', "#globeTooltipPeople");
    setTooltipPosition('sablier', "#globeTooltipSablier");
    setTooltipPosition('refresh', "#globeTooltipRefresh");
}
$(function () {
    $('.unveil').unveil(200, function () {
        $(this).load(function () {
            this.style.opacity = 1;
        });
    });
    var isMobile = window.matchMedia("(max-width: 760px)");
    currentSection = window.location.hash;
    scrollHandler();
    $(document).scroll(scrollHandler);
    $('#submit-subscribe').click(submitSubscriber);
    $('.icone').hover(beginHoverCommunityCallback, endHoverCommunityCallback);
    $('.round').hover(beginHoverGlobeCallback, endHoverGlobeCallback);
    /*setTimeout(function () {
        if (!isMobile.matched) {
            //$.scrollify(scrollifyOptions);
        }
        setTimeout(function () {
            resizePhone();
        }, 1000);
    }, 1000);*/
    $(".move").on("click", scrollToHandler);
});







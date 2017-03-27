/*
* Navbar Functions
*/
var previousColor;
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        setNavBarClass();
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

function setNavBarClass() {
    var section = location.hash;
    if (previousColor) {
        $(".navbar-fixed-top").removeClass(previousColor);
    }
    switch (section) {
        case "#services":
            $(".navbar-fixed-top").addClass("navbar-green");
            previousColor = "navbar-green";
            break;
        case "#communities":
            $(".navbar-fixed-top").addClass("navbar-blue");
            previousColor = "navbar-blue";
            break;
        case "#team":
            $(".navbar-fixed-top").addClass("navbar-blugreen");
            previousColor = "navbar-blugreen";
            break;
    }
}
/*
* Scrollify Handlers and Options
*/
function beforeScrollifyCallback(i, sections) {
    console.log(i);
    var ref = sections[i].attr("data-section-name");
    $(".pagination-custom .active").removeClass("active");
    $(".pagination-custom").find("a[href=\"#" + ref + "\"]").addClass("active");
}
function afterResizeScrollifyCallback(i, sections) {
    $.scrollify.update();
    //var ref = sections[i].attr("data-section-name");
    /*if (ref === "global") {
        setTooltipsPosition();
    }*/
}
var scrollifyOptions = {
    section: ".section",
    scrollbars: true,
    scrollSpeed: 700,
    standardScrollElements: ".team-container, .services",
    before: beforeScrollifyCallback,
    afterResize: afterResizeScrollifyCallback
};
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
    $('#overlay').css({ transition: "1s", top: innerPhoneBox.top, left: innerPhoneBox.left, width: innerPhoneBox.width, height: innerPhoneBox.height });
}
function endHoverCommunityCallback() {
    $('#overlay').css({ left: innerPhoneBox.left - innerPhoneBox.width, transition: "1s" });
}
function resizePhone() {
    innerPhoneBox = getSvgPositions('inner-phone');
    $('.phone-logo').css({ top: innerPhoneBox.top + innerPhoneBox.height / 4, left: innerPhoneBox.left, width: innerPhoneBox.width, height: 'auto' });
}
function beginHoverGlobeCallback() {
    console.log('hover');
    var id = $(this).attr('id');
    var svgPosition = getSvgPositions(id);
    var isBig = window.matchMedia("(min-width: 761px)");
    if (isBig.matches) {
        $('#globeTooltipMobile').css({ top: svgPosition.top - 120, left: svgPosition.left - 120});
    } else {
        $('#globeTooltipMobile').css({ top: svgPosition.top - 200, left: svgPosition.left - 40});
    }
    
    $('#globeTooltipMobile').addClass('content-appear');
    $('.tooltip-text-mobile').addClass('text-appear');
    $('.tooltip-inner-mobile').addClass('inner-appear');
}
function endHoverGlobeCallback() {
    $('#globeTooltipMobile').removeClass('content-appear');
    $('.tooltip-text-mobile').removeClass('text-appear');
    $('.tooltip-inner-mobile').removeClass('inner-appear');
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
    $(tooltipId).css({ top: svgPosition.top - 160, left: svgPosition.left - 60, display: "block"})
}
function setTooltipsPosition () {
    setTooltipPosition('people', "#globeTooltipPeople");
    setTooltipPosition('sablier', "#globeTooltipSablier");
    setTooltipPosition('refresh', "#globeTooltipRefresh");
}
$(function () {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    //collapseNavbar();
    //$(window).scroll(collapseNavbar);
    // Responsive Menu
    //$(window).resize(resizePhone);
    /*$('.navbar-collapse ul li a').click(function () {
        if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
            $('.navbar-toggle:visible').click();
        }
    });*/
    //resizePhone();
    $('#submit-subscribe').click(submitSubscriber);
    $.scrollify(scrollifyOptions);
    $('.icone').hover(beginHoverCommunityCallback, endHoverCommunityCallback);
    $('.round').hover(beginHoverGlobeCallback, endHoverGlobeCallback);
    /*if (isMobile.matches) {
        console.log('mobile');
        
    } else {
        console.log('desktop');
    }*/
    $(".pagination-custom a").on("click", $.scrollify.move);
});







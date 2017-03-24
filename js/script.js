/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// Navbar smooth scroll
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
var innerPhone = document.getElementById('inner-phone');
var innerPhoneBox = innerPhone.getBoundingClientRect();
function resizePhone() {
    innerPhone = document.getElementById('inner-phone');
    innerPhoneBox = innerPhone.getBoundingClientRect();
    $('.phone-logo').css({ top: innerPhoneBox.top + innerPhoneBox.height / 4, left: innerPhoneBox.left, width: innerPhoneBox.width, height: 'auto' });
}
// Scrolling page -> jQuery Easing plugin
$(function () {
    //collapseNavbar();
    //$(window).scroll(collapseNavbar);
    // Responsive Menu
    //$(window).resize(resizePhone);
    $('.navbar-collapse ul li a').click(function () {
        if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
            $('.navbar-toggle:visible').click();
        }
    });
    $.scrollify({
        section: ".section",
        scrollbars: true,
        scrollSpeed: 700,
        standardScrollElements: ".team-container",
        before: function (i, sections) {
            console.log(i);
            var ref = sections[i].attr("data-section-name");
            $(".pagination-custom .active").removeClass("active");
            $(".pagination-custom").find("a[href=\"#" + ref + "\"]").addClass("active");
        },
        afterResize: function (lol, mdr) {
            $.scrollify.update();
        }
    });
    //resizePhone();
    $('.icone').hover(function () {
        innerPhone = document.getElementById('inner-phone');
        innerPhoneBox = innerPhone.getBoundingClientRect();
        $('#overlay').css({ transition: "1s", top: innerPhoneBox.top, left: innerPhoneBox.left, width: innerPhoneBox.width, height: innerPhoneBox.height });
    }, function () {
        console.log('mouseleave icone');
        $('#overlay').css({ left: innerPhoneBox.left - innerPhoneBox.width, transition: "1s" });
    });
    $(".pagination-custom a").on("click", $.scrollify.move);
});






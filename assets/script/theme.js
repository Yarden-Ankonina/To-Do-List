const THEME = document.querySelector(".fa-tint");
const LIGHT = document.querySelector(".fa-lightbulb");
let htmlTheme = document.querySelector("html");
let hueCounter = 0;


THEME.addEventListener('click', function () {
    hueCounter += 30;
    htmlTheme.style.filter = "hue-rotate(" + hueCounter + "deg)";
});

LIGHT.addEventListener('click', function () {
    if (htmlTheme.hasAttribute('data-theme')) {
        htmlTheme.removeAttribute('data-theme', 'light');
    }
    else {
        htmlTheme.setAttribute('data-theme', 'light');
    }
    hueCounter = 0;
    htmlTheme.style.filter = "hue-rotate(" + hueCounter + "deg)";
});

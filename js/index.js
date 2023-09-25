var images = document.querySelectorAll(".slider img");
var prev = document.querySelector(".slider .prev");
var next = document.querySelector(".slider .next");

var index = 0;

var timer;

function switchImage() {
    for (var i = 0; i < images.length; i++) {
        images[i].className = "";
    }
    images[index].className = "active";
}

function autoPlay() {
    timer = setInterval(function () {
        index++;
        if (index >= images.length) {
            index = 0;
        }
        switchImage();
    }, 3000);
}

autoPlay();

prev.onclick = () => {
    index--;
    if (index < 0) {
        index = images.length - 1;
    }
    switchImage();
};

next.onclick = () => {
    index++;
    if (index >= images.length) {
        index = 0;
    }
    switchImage();
};

var slider = document.querySelector(".slider");
slider.onmouseover = function () {
    clearInterval(timer);
};
slider.onmouseout = function () {
    autoPlay();
};
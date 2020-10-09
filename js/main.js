document.addEventListener("DOMContentLoaded", function () {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, options);

    if (instance.isOpen) {
        console.log("Hell yeah");
    }
});

const options = {
    onCloseStart: function () {
        document.querySelector("body").style.transition = "all .2s";
        document.querySelector("body").style.paddingLeft = "0px";
    },
    onOpenStart: function () {
        document.querySelector("body").style.transition = "all .2s";
        document.querySelector("body").style.paddingLeft = "300px";
    },
    preventScrolling: false,
};

$(".card").hover(
    function () {
        $(this).removeClass("z-depth-1").addClass("z-depth-3");
    },
    function () {
        $(this).removeClass("z-depth-3").addClass("z-depth-1");
    }
);

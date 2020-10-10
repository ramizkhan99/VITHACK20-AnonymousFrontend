document.addEventListener("DOMContentLoaded", function () {
    var elem = document.querySelector(".sidenav");
    var instanceInit = M.Sidenav.init(elem, options);
    if (instanceInit.isOpen) {
        document.querySelector("#expand-sidenav").style.left +=
            elem.offsetWidth - 30 + "px";
        document.querySelector("#expand-sidenav > i").innerHTML =
            "chevron_left";
    }
});

const options = {
    onCloseStart: function () {
        document.querySelector("*").style.transition = "all .2s";
        document.querySelector("*").style.paddingLeft = "0px";
    },
    onOpenStart: function () {
        document.querySelector("*").style.transition = "all .2s";
        document.querySelector("*").style.paddingLeft = "300px";
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

$("#expand-sidenav").on("click", function () {
    $(".sidenav").toggleClass("sidenav-fixed");
    const instance = M.Sidenav.init(
        document.querySelector(".sidenav"),
        options
    );
    if (instance.isOpen) {
        document.querySelector("#expand-sidenav").style.left +=
            document.querySelector(".sidenav").offsetWidth - 30 + "px";
        document.querySelector("#expand-sidenav > i").innerHTML =
            "chevron_left";
    } else {
        document.querySelector("#expand-sidenav").style.left -=
            document.querySelector(".sidenav").offsetWidth - 30 + "px";
        document.querySelector("#expand-sidenav > i").innerHTML =
            "chevron_right";
    }
    instance.close();
});

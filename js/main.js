const API = "http://127.0.0.1:3768";

document.addEventListener("DOMContentLoaded", function () {
    var elem = document.querySelector(".sidenav");
    var instanceInit = M.Sidenav.init(elem, options);
    if (instanceInit.isOpen) {
        document.querySelector("#expand-sidenav").style.left +=
            elem.offsetWidth - 30 + "px";
        document.querySelector("#expand-sidenav > i").innerHTML =
            "chevron_left";
    }

    fetch(`${API}/predict`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            bpData: [
                1.1945259042033236,
                1.2991202346041055,
                0.6314760508308895,
                2.378299120234604,
                1.1759530791788857,
                1.0625610948191593,
                1.750733137829912,
                1.41544477028348,
                2.145650048875855,
                1.0733137829912023,
            ],
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
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

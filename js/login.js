$(".card").hover(
    function () {
        $(this).removeClass("z-depth-1").addClass("z-depth-3");
    },
    function () {
        $(this).removeClass("z-depth-3").addClass("z-depth-1");
    }
);

$(".card-action > button").hover(
    function () {
        $("#login-btn").css("display", "none").toggle("fast");
    },
    function () {
        $("#login-btn").css("display", "block").toggle("fast");
    }
);

$("#login").submit(function (e) {
    e.preventDefault();
    console.log("Form submitted");
    window.location = "/dashboard.html";
});

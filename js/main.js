const API = "http://127.0.0.1:3768";
let ecg_data = [];
let bp_data = [];

document.addEventListener("DOMContentLoaded", function () {
    var elem = document.querySelector(".sidenav");
    var instanceInit = M.Sidenav.init(elem, options);
    if (instanceInit.isOpen) {
        document.querySelector("#collapse-sidenav").style.left +=
            elem.offsetWidth - 30 + "px";
        document.querySelector("#collapse-sidenav > i").innerHTML =
            "chevron_left";
    }
    const bpData = fetch(`${API}/predict`, {
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
            populateBpData(data.predictions.bpData);
            renderChart(data.predictions.bpData, "bp_chart");
        })
        .catch((error) => {
            console.log(error);
        });

    // const ecgData = fetch(`${API}/predict`, {
    //     method: "POST",
    //     mode: "cors",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({

    //     })
    // })
});

const options = {
    onCloseStart: function () {
        document.querySelector("*").style.transition = "all .2s";
        document.querySelector("*").style.paddingLeft = "0px";
        $("#expand-sidenav").css("display", "block");
        $("#collapse-sidenav").css("display", "none");
    },
    onOpenStart: function () {
        document.querySelector("*").style.transition = "all .2s";
        document.querySelector("*").style.paddingLeft = "300px";
        $("#expand-sidenav").css("display", "none");
        $("#collapse-sidenav").css("display", "block");
    },
    preventScrolling: false,
};

$("#expand-sidenav").on("click", function () {
    $(".sidenav").toggleClass("sidenav-fixed");
    const instance = M.Sidenav.init(
        document.querySelector(".sidenav"),
        options
    );
});

function populateBpData(data) {
    bp_data = data;
    if (document.querySelector("#bp").style.display !== "none") {
        console.log("here");
        renderChart(bp_data, "bp_detailed");
    }
}

$("#collapse-sidenav").on("click", function () {
    $(".sidenav").toggleClass("sidenav-fixed");
    const instance = M.Sidenav.init(
        document.querySelector(".sidenav"),
        options
    );
    instance.close();
});

$(".sidenav > li > a").on("click", function (e) {
    $("section").css("display", "none");
    $($(this).attr("href")).css("display", "block");
});

$("nav a").click(function (e) {
    $("section").css("display", "none");
    $($(this).attr("href")).css("display", "block");
});

$(".selectable").click(function (e) {
    $("section").css("display", "none");
    $($(this).attr("data-section")).css("display", "block");
});

const selectedFile = document
    .getElementById("input")
    .addEventListener("change", function () {
        var fr = new FileReader();
        fr.onload = function () {
            fetch(`${API}/predict`, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ecgData: fr.result,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    ecg_data = data.predictions.ecgData;
                    document.querySelector("#input").style.display = "none";
                    document.querySelector("#ecg_rhythm").innerHTML =
                        ecg_data.rhythm;
                    document.querySelector("#ecg_message").innerHTML =
                        ecg_data.message;
                })
                .catch((err) => console.log(err));
        };

        fr.readAsText(this.files[0]);
    });

// Chart.js stuff here
function renderChart(apiData, id) {
    var ctx = document.getElementById(id).getContext("2d");
    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [...Array(apiData.length).keys()],
            datasets: [
                {
                    label: "Blood Pressure",
                    data: apiData,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
}

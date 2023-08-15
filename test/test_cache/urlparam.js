
function init() {

    let url = new URL(window.location.href);
    let params = url.searchParams;

    params.forEach(function (value, key) {

        if (key === "param1") {
            document.getElementById("param1").textContent = value;
        }
        if (key === "param2") {
            document.getElementById("param2").textContent = value;
        }
    });
}

init();
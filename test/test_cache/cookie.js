
const COOKIE_NAME = "lastvisit";

function save_cookie() {
    document.cookie = COOKIE_NAME + "=" + new Date();
}

function delete_cookie() {
    document.cookie = COOKIE_NAME + "=; max-age=0";
}

function init() {
    document.getElementById("param1").textContent = document.cookie;
}
init();
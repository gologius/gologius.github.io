
function add_autocomplete_attribute(elm_name) {
    var date = new Date();
    yyyymmddhhmmss = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2) + date.getMilliseconds();

    var elm = document.getElementsByName(elm_name);
    elm[0].setAttribute("autocomplete", yyyymmddhhmmss);
}

add_autocomplete_attribute("hainame");
add_autocomplete_attribute("hainame2");
add_autocomplete_attribute("haizip");
add_autocomplete_attribute("haijusyo");
add_autocomplete_attribute("haitel");
add_autocomplete_attribute("haitel2");
add_autocomplete_attribute("renname");
add_autocomplete_attribute("rentel");

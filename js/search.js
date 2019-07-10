$(function () {
    if (getQueryVariable("keyword")) {
        $("#search-keyword").val(getQueryVariable("keyword"));
        search(getQueryVariable("keyword"));
    }
    $("#search-keyword").change(function () {
        window.location.href = changeURLArg(window.location.href, 'keyword', $("#search-keyword").val());
    });
})
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
}
function search(keyword) {
    let result = [];
    $.get("json/articles.json", {}, function (articles) {
        console.info(articles);
        articles = articles || {};
        let note = articles.note || [];
        note.forEach(function (item, i) {
            item = item || {};
            if (item.title.indexOf(keyword) != -1
                || item.user.indexOf(keyword) != -1
                || item.date.indexOf(keyword) != -1
                || item.lable.indexOf(keyword) != -1
                || item.content.indexOf(keyword) != -1) {
                result.push(item);
            };
        });
        let lable = ""
        result.forEach(function (item, i) {
            lable += "<article>"
                + "    <h3>" + item.title + "</h3>"
                + "    <p>" + item.content.substring(0, 200) + "</p>"
                + "</article>";
        });
        $("#article-list").html(lable);
    });
}

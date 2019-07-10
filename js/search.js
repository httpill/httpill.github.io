$(function(){
    if(getQueryVariable("keyword")) {
        search(getQueryVariable("keyword"));
    }
    $("#search-keyword").change(function(){
        search($("#search-keyword").val());
    });
})
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++){
        var pair = vars[i].split("=");
        if (pair[0] == variable){
            return pair[1];
        }
    }
    return false;
}
let result = [];
function search(keyword){
    $.get("json/articles.json", {}, function (articles){
        console.info(articles);
        articles = articles || {};
        let note = articles.note || [];
        note.forEach(function(item, i){
            item = item || {};
            if(item.title.indexOf(keyword) != -1
                || item.user.indexOf(keyword) != -1
                || item.date.indexOf(keyword) != -1
                || item.lable.indexOf(keyword) != -1
                || item.content.indexOf(keyword) != -1){
                result.push(item);
            };
        });
        let lable = ""
        result.forEach(function(item, i){
            lable += "<article>"
                    + "    <h3>" + item.title + "</h3>"
                    + "    <p>" + item.content.substring(0, 200) + "</p>"
                    + "</article>";
        });
        $("#article-list").html(lable);
    });
}

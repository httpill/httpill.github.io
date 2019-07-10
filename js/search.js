$(function(){
    $.get("json/articles.json",{},function(res){
        console.info(res);
    });
})
// 
// 
var topics = ["baby yoda", "yoda", ];
// 
function topicInfo() {
    event.preventDefault();
    var cors = "https://cors-anywhere.herokuapp.com/";
    var queryURL = cors + "https://imgflip.com/memegenerator/" +
    q;
    var q = $(this).attr("data-topic");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        console.log(q);
        console.log(res);
        var results = res.data;
        for (var i = 0; i < 10; i++) {
            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].data.memes[i].url);
            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#meme-section").prepend(animalDiv);
            
            
        }
    });
};
//
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic-btn");
        a.attr("data-topic", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}
// 
$("#run-search").on("click", function (event) {
    event.preventDefault();
    var topic = $("#search-term").val();
    topics.push(topic);
    renderButtons();
});
// 
$(document).on("click", ".topic-btn", topicInfo);
renderButtons();

function clear() {
    $("#meme-section").empty();
}
// 
$("#clear-all").on("click", clear);

/*
TODO:
- initialize firebase  
- connect to  yoda translator api without access errors
- connect to meme generator api without access errors
- on click event to take user input
- pass user input through yoda translator
- populate new phrase from yoda
- make bank of memes for user to pick from
- user choses meme
- user appends phrase to top or bottom of meme (top = text0, bottom = text1)
- use publish button as on click event to store user created memes in firebase

TODO: current errors:
-connection issue with api (key error could by information or api)
*/
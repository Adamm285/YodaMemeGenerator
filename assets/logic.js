// 
// 
var topics = ["baby yoda", "yoda", ];
// 
function topicInfo() {
    event.preventDefault();
    var q = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" +
        q + "&api_key=roxSMmfrpjx5oCeWIrawLb3xWGXfKDnN";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        console.log(q);
        console.log(res.data);
        var results = res.data;
          for (var i = 0; i < 10; i++) {
            var animalDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
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
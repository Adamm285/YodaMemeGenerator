// 
// 
var topics = ["you will hold my beer", "yoda is so cute", ];
// works fine just turned off for testing
// function topicInfo() {
//     var cors = "https://cors-anywhere.herokuapp.com/";
//     var queryURL = cors + "https://yodish.p.rapidapi.com/yoda.json?text=" +
//         "babyyoda";
//     var q = $(this).attr("data-topic");
//     var settings = {

//         "async": true,
//         "crossDomain": true,
//         "url": "https://yodish.p.rapidapi.com/yoda.json?text=" + q,
//         "method": "POST",
//         "headers": {
//             "x-rapidapi-host": "yodish.p.rapidapi.com",
//             "x-rapidapi-key": "8cbc079c1dmsh23d13dcb3653048p16f423jsn635842feeaf6",
//             "content-type": "application/x-www-form-urlencoded"
//         },
//         "data": {}
//     }
//     $.ajax(settings).done(function (response) {
//         $("#trans-section").append(response.contents.translated + " - ");
//         console.log(response.contents.translated);
//     });
// };
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
//$(document).on("click", ".topic-btn", topicInfo);
renderButtons();
$("#run-search").on("click", function (event) {
    event.preventDefault();
    var topic = $("#yoda-term").val();
    topics.push(topic);
    renderButtons();
});
// end of yoda translator section
// 
// 
// 
// 
// Meme collection section
var topics2 = ["yoda", "baby yoda"];

function imgGet() {
    var y = topics2;
    var cors = "https://cors-anywhere.herokuapp.com/";
    var queryURL = cors + "https://pixabay.com/api/?key=14379886-8edf494d6e4585af70ecf3230&q=" +
        y + "&image_type=photo";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (let i = 0; i < 5; i++) {
            var newImg = $("<img>");
            $(newImg).attr("src", response.hits.largeImageURL);
            $("#trans-section").append(newImg);
        };
    });
};
// 
$("#meme-search").on("click", function (event) {
    event.preventDefault();
    var topic2 = $("#meme-term").val();
    topics2.push(topic2);
    imgGet();
});
// 
function renderImage() {
    $("#meme-section").empty();
    for (var j = 0; j < topics2.length; j++) {
        var b = $("<button>");
        b.addClass("meme-btn");
        b.attr("meme-topic", topics2[j]);
        b.text(topics2[j]);
        $("#meme-section").append(b);
    }
}
renderImage();
// 
$(document).on("click", ".meme-btn", imgGet);
imgGet();
// 
function clear() {
    $("#meme-section").empty();
    $("#trans-section").empty();
}
// 
$("#clear-all").on("click", clear);

/*
TODO:
- initialize firebase  
- connect to  yoda translator api without access errors *completed - Adam*
- connect to meme generator api without access errors
- on click event to take user input *completed 
- pass user input through yoda translator
- populate new phrase from yoda
- make bank of memes for user to pick from
- user choses meme
- user appends phrase to top or bottom of meme (top = text0, bottom = text1)
- use publish button as on click event to store user created memes in firebase

TODO: current errors:
-connection issue with api (key error could by information or api)
*/
function renderImage(tr) {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic-btn");
        a.attr("data-topic", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}
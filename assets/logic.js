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


// Meme collection section
var topics2 = ["yoda", "baby yoda"];

function imgGet() {
    $("#trans-section").empty()
    var topic2 = $("#meme-term").val();
    var cors = "https://cors-anywhere.herokuapp.com/";
    var queryURL = cors + "https://pixabay.com/api/?key=14379886-8edf494d6e4585af70ecf3230&q=" + topic2 + "&image_type=photo";

    // var y = $(this).attr("meme-data");
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //for loop to generate images from api
        for (let i = 0; i < 5; i++) {
            var newImg = $("<img>").addClass("userMeme");
            $(newImg).attr("src", response.hits[i].largeImageURL);
            $("#meme-section").prepend(newImg);
        };

        //on click to select the user image
        $(".userMeme").on("click", function () {
            console.log(this)
            $(this).addClass("selectedImg");

            //function to put selected image into a canvas
            function makeMeme() {

                var canvas = document.getElementById('myCanvas'),
                    context = canvas.getContext('2d');
                    topText = $("#top-text").val();
                make_base();

                function make_base() {

                    base_image = new Image();
                    base_image.src = $('.selectedImg').attr('src');
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.fillStyle = "#3e3e3e";
                    context.font = "16px Arial";
                    base_image.onload = function () {
                        context.drawImage(base_image, 0, 0, 480, 480);
                        context.fillText(topText, 20, canvas.height - 20);
                    }
                }

                $("#trans-section").append();
            };

            makeMeme();

            $("#meme-section").empty();
        });

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
$("#run-search").on("click", function (event) {
    event.preventDefault();
    var topic = $("#yoda-term").val();
    topics.push(topic);
    renderButtons();
    imgGet();
});
//
//$(document).on("click", ".topic-btn", topicInfo);
renderButtons();
$(document).on("click", ".topic-btn", imgGet);

function clear() {
    $("#meme-section").empty();
    $("#trans-section").empty();
}
// 
$("#clear-all").on("click", clear);

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
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
            $("#trans-section").prepend(newImg);
        };

        //on click to select the user image
        $(".userMeme").on("click", function () {
            console.log(this)
            $(this).appendTo("#meme-section");
            $(this).addClass("selectedImg");
            $("#trans-section").empty();

            //function to put selected image into a canvas
            function makeMeme () {
                
                //creates canvas and sets 2d property
                var canvas = $("<canvas>");
                var context = $(canvas).get('2d');

                //gives image path and makes new img for canvas
                var imgPath = $('.selectedImg').attr('src');
                var imgObj = new Image();
                
                //making the new image source the chosen image path
                imgObj.src = imgPath
                
                //vars for the x an y axis
                var x = 0;
                var y = 0;

                //function to draw the image onto the canvas
                //TODO: fix draw image property error
                imgObj.onload = function () {
                    context.drawImage(imgObj, x, y);
                };
                console.log(".imgCanvas")
                console.log(context)
            };
            makeMeme();
        });
    });
};






/*
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function drawBackgroundImage(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = $(".selectedImg");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function getRandomImageSize(min, max, width, height) {
    const ratio = width / height; // Used for aspect ratio
    width = getRandomInt(min, max);
    height = width / ratio;
    return {
        width,
        height
    };
}

function drawSalt(src, canvas, ctx) {
    // Create an image object. (Not part of the dom)
    const image = new Image();
    image.src = src;

    // After the image has loaded, draw it to the canvas
    image.onload = function () {
        for (let i = 0; i < 8; i++) {
            const randomX = getRandomInt(10, canvas.width / 2);
            const randomY = getRandomInt(canvas.height - 300, canvas.height);
            const dimensions = getRandomImageSize(20, 100, image.width, image.height);
            ctx.drawImage(image, randomX, randomY, dimensions.width, dimensions.height);
        }
    }
    return image;
}

onload = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    drawBackgroundImage(canvas, ctx);
    const saltImage = drawSalt('http://res.cloudinary.com/dlwnmz6lr/image/upload/v1526005050/chadwick-boseman-inspired-workout-program-wide_phczey.webp', canvas, ctx);
};

*/

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
//$(document).on("click", ".topic-btn", topicInfo, imgGet);
renderButtons();
$(document).on("click", ".topic-btn", imgGet);

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
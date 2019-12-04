// 
//
var firebaseConfig = {
    apiKey: "AIzaSyBK1fc65gakM648BQv8vzKYXlwXANIziCw",
    authDomain: "meme-generator-88fd0.firebaseapp.com",
    databaseURL: "https://meme-generator-88fd0.firebaseio.com",
    projectId: "meme-generator-88fd0",
    storageBucket: "gs://meme-generator-88fd0.appspot.com",
    messagingSenderId: "224407351995",
    appId: "1:224407351995:web:54bc95a22f657d7fa36f9e"
};
// 
// Initialized Firebase
firebase.initializeApp(firebaseConfig);
// 
var database = firebase.database();
var storageRef = firebase.storage().ref();
// 
var str = $('#yoda-term').val();
var info;
var base_image;
var context;
var topText;
var canvas = document.getElementById("myCanvas");
var topics2 = [];
var topics = ["hold my beer, you will", "so cute is yoda"];
// 
// works fine just turned off for testing
// 
function topicInfo() {
    str = $('#yoda-term').val();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": encodeURI("https://yodish.p.rapidapi.com/yoda.json?text=" + str),
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "yodish.p.rapidapi.com",
            "x-rapidapi-key": "8cbc079c1dmsh23d13dcb3653048p16f423jsn635842feeaf6",
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {}
    }
    console.log(encodeURI("https://yodish.p.rapidapi.com/yoda.json?text=" + str));
    $.ajax(settings).done(function (response) {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topic-btn");
            a.attr("data-topic", topics[i]);
            a.text(response.contents.translated);
            $("#buttons-view").append(a);
            $(".topic-btn").click(function () {
                console.log("clicked");
                info = $(this).text();
                console.log(info);
                $("#top-text").val(info);
            });
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
        // a.text(response.contents.translated);
        $("#buttons-view").append(a);
        $(".topic-btn").click(function () {
            console.log("clicked");
            info = $(this).text();
            console.log(info);
            $("#top-text").val(info);
        });
    }
}
//
// $(document).on("click", ".topic-btn", topicInfo);
// renderButtons();
// 
$("#term-search").on("click", function (event) {
    event.preventDefault();
    topicInfo();
    var topic = $("#yoda-term").val();
    topics.push(topic);
    renderButtons();
    console.log();

});
// end of yoda translator section
// 
$(document).ready(function () {
    // Meme collection section
    function imgGet() {
        var topic2 = $("#meme-term").val();
        var cors = "https://cors-anywhere.herokuapp.com/";
        var queryURL = cors + "https://pixabay.com/api/?key=14379886-8edf494d6e4585af70ecf3230&q=" +
            topic2 + "&image_type=photo";
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

                    console.log(canvas);
                    context = canvas.getContext('2d');
                    imgSrc = $('.selectedImg').attr('src');
                    console.log(imgSrc)
                    make_base();
                };

                function clearDiv() {
                    $("#meme-section").empty();
                }

                makeMeme();
                clearDiv();
                console.log(canvas)
            });
        });
    };

    //
    function make_base() {
        console.log(canvas)
        console.log("world");
        topText = $("#top-text").val();
        bottomText = $("#bottom-text").val();
        base_image = new Image();
        base_image.src = imgSrc;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = canvas.width;
        context.textAlign = 'center';
        context.fillStyle = "#ffffff";
        context.font = "50px Arial";
        console.log(base_image);
        // 
        base_image.onload = function () {
            context.drawImage(base_image, 0, 0, 480, 480);
            context.fillText(topText, 240, canvas.height - 420);
            context.fillText(bottomText, 240, canvas.height - 20);
        }
    };

    // 
    $("#top-btn").click(function () {
        console.log("testing");
        make_base();
    });
    //second button 
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
    // $(document).on("click", ".topic-btn", topicInfo);
    renderButtons();
    // $(document).on("click", ".topic-btn", imgGet);

    // 
    function clear() {
        $("#meme-section").empty();
        $("#trans-section").empty();
    }
    $("#clear-all").on("click", clear);
    // end of Meme section
    // 
    $("#submit-btn").on("click", function () {
        console.log("clicked")
        createFile();
    })
    async function createFile() {

        var imgArray = base_image.src.split('/');
        var imageFileName = imgArray[imgArray.length - 1];
        console.log(imgArray[imgArray.length - 1])

        let response = await fetch(base_image.src);
        let data = await response.blob();
        let metadata = {
            type: 'image/jpeg'
        };
        let file = new File([data], imageFileName, metadata);

        console.log(file)
        var filename = imageFileName.split(".")
        storageRef.child('images/' + filename[0]).put(file).then(function (snapshot) {
            console.log('Uploaded a blob or file!');
        });

        // var uploadTask = storageRef.child('images/' + "apple").put(file);
        // ... do something with the file or return it
    }


});
// End of Code
//
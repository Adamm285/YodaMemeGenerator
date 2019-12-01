// 
// 
// 
var firebaseConfig = {
    apiKey: "AIzaSyBK1fc65gakM648BQv8vzKYXlwXANIziCw",
    authDomain: "meme-generator-88fd0.firebaseapp.com",
    databaseURL: "https://meme-generator-88fd0.firebaseio.com",
    projectId: "meme-generator-88fd0",
    storageBucket: "meme-generator-88fd0.appspot.com",
    messagingSenderId: "224407351995",
    appId: "1:224407351995:web:54bc95a22f657d7fa36f9e"
};
// 
// Initialized Firebase
firebase.initializeApp(firebaseConfig);
// 
var database = firebase.database();
// var storage = firebase.storage().ref();
var base_image;
var context;
var topText;
var canvas;
var imgSrc;
var topics2 = [];
var topics = ["you will hold my beer", "yoda is so cute", ];
// 
// works fine just turned off for testing
// 
// function topicInfo() {
//     var cors = "https://cors-anywhere.herokuapp.com/";
//     var queryURL = cors + "https://yodish.p.rapidapi.com/yoda.json?text=" +
//         "q";
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
// 
$("#run-search").on("click", function (event) {
    event.preventDefault();
    var topic = $("#yoda-term").val();
    topics.push(topic);
    renderButtons();
});
// end of yoda translator section
// 
// Meme collection section
function imgGet() {
    $("#trans-section").empty()
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
                canvas = document.getElementById('myCanvas')
                context = canvas.getContext('2d');
                imgSrc = $('.selectedImg').attr('src');
                make_base();
                $("#trans-section").append();
            };
            makeMeme();
            $("#meme-section").empty();
        });
    });
};
// 
function make_base() {
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
}
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
//$(document).on("click", ".topic-btn", topicInfo);
renderButtons();
$(document).on("click", ".topic-btn", imgGet);
// 
function clear() {
    $("#meme-section").empty();
    $("#trans-section").empty();
}
$("#clear-all").on("click", clear);
// end of Meme section
// 
// FireBase Section
// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image) {
    // var canvas = document.createElement("canvas");
    // canvas.width = image.width;
    // canvas.height = image.height;
    // canvas.getContext("2d").drawImage(image, 0, 0);

    var cors = "https://cors-anywhere.herokuapp.com/";
    // var image = new Image();
    // image.src = cors + imgSrc;;
    var filename = cors + imgSrc;
    //console.log("Archivo: " + filename);
    // take any image
    // let imag = document.querySelector('.selectedImg');
    // var reader = new FileReader();
    // reader.onloadend = function (evt) {
    //   var blob = new Blob([evt.target.result], { type: "image/jpeg" });
    //   var storageUrl = filename;
    //   var storageRef = firebase.storage().ref(storageUrl);
    //  // console.warn(file); // Watch Screenshot
    //   var uploadTask = storageRef.put(blob);
    // }
    // reader.onerror = function (e) {
    //     console.log("Failed file read: " + e.toString());
    // };
    // reader.readAsArrayBuffer(file);

    var arrayBufferView = new Uint8Array("./assets/images/yoda1.jpg");
    var blob = new Blob([arrayBufferView], {
        type: "image/jpg"
    });
    var storageRef = firebase.storage().ref(filename);
    var uploadTask = storageRef.put(blob);

    return canvas;
}

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");

    return image;
}
//TODO: get image to save in firebase/ fix tainted error
$("#submit-btn").click(function () {
    var cors = "https://cors-anywhere.herokuapp.com/";
    var blobImg = new Image();
    blobImg.crossOrigin = 'anonymous';
    blobImg.src = cors + imgSrc;
    console.log(blobImg.src)
    convertImageToCanvas(blobImg)

    // var canvas = document.getElementById("myCanvas")
    // canvas.toBlob(function (blob) {
    //     var newImg = document.createElement('img'),
    //         url = URL.createObjectURL(blob)
    //     newImg.onload = function () {
    //         // no longer need to read the blob so it's revoked
    //         URL.revokeObjectURL(url)
    //     }
    //     newImg.src = url
    //    // database.ref().push(newImg);
    // })
    // .toBlob(function (blob) {
    //     var blobImg = new Image();
    //     blobImg.crossOrigin = 'anonymous';
    //     blobImg.src = blob;
    //     database.ref().push(blobImg);
    // });
});
// end of FireBase Section
// 
// animated background section
var user_configuration = {

    // "circle" or "square"
    shape: "circle",

    // star size in pixels
    initial_size: "12px",

    // final size of the stars after expansion 
    final_size: "64px",

    // how fast the stars get bigger, in milliseconds
    expand_speed: "1s",

    // how long until the star fades out
    fade_delay: "0.5s",

    // how long the star fades for
    fade_duration: "0.5s",

    // The variety of colors of the stars. Can be any CSS complient color (eg. HEX, rgba, hsl)
    colors: ["hsla(62, 50%,50%, 0.5)", "rgba(255,255,255,0.5)", "hsla(180, 72%, 52%, 0.5)"],

    // how often a new wave of stars pop-out (in milliseconds. Bigger==longer)
    frequency: 100,

    // how many stars pop out per wave
    density: 1,

    // whether the stars disappear after they are created
    keep_lit: false,

    // whether the stars rotate through out their expansion
    rotation: true,

    // how much of the element's area the stars will show up in (0-1)
    coverage: 1,

    // the elements the script will target based on the class name
    target_class: '.starlight'

};
// End of Code 
//
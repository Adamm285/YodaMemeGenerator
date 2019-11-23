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
function topicInfo() {
    fetch("https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=Top%20text&bottom=Bottom%20text", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
        "x-rapidapi-key": "8cbc079c1dmsh23d13dcb3653048p16f423jsn635842feeaf6",
      }
    })
.then(response => response.body)
    .then(body => {
        body.getReader()
            .read()
            .then(({
                value,
                done
            }) => {
                var ascii = new Uint8Array(value);
                var b64encoded = btoa(String.fromCharCode.apply(null, ascii));
                console.log(b64encoded)
                $('#container').html(`<img src="data:image/jpeg;base64, ${b64encoded}"/>`);

            })
            .catch(err => {
                console.log(err);
            });
    })
};
// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=Top%20text&bottom=Bottom%20text",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
// 		"x-rapidapi-key": "8cbc079c1dmsh23d13dcb3653048p16f423jsn635842feeaf6"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
//     event.preventDefault();
//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=Top%20text&bottom=Bottom%20text",
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
//             "x-rapidapi-key": "8cbc079c1dmsh23d13dcb3653048p16f423jsn635842feeaf6"
//         }
//     }

//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         var img = $('img').attr("src", "data:image/jpg;base64, " + response)
//         $('.meme-table').append(img);
//     });


// var data = null;

// var xhr = new XMLHttpRequest();
// // xhr.withCredentials = true;

// // xhr.addEventListener("readystatechange", function () {
// //     if (this.readyState === this.DONE) {
// //         console.log(this.responseText);
// //     }
// // });

// xhr.open("GET", cors + "ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=yoda&top=Top%20text&bottom=Bottom%20text");
// // xhr.setRequestHeader("x-rapidapi-host", "ronreiter-meme-generator.p.rapidapi.com");
// xhr.setRequestHeader("x-rapidapi-key", "8cbc079c1dmsh23d13dcb3653048p16f423jsn635842feeaf6");

// xhr.send(data);
// console.log();
// xhr.onload = function(){
//     data= JSON.parse(xhr.data);
//     console.log(data);

// }


// $.ajax().done(function (response) {
//     var memeImage = $("<img>");
//     memeImage.attr("src", "data:image/jpeg;" + response);
// $("#meme-section").prepend(memeImage);
//     console.log(response);
// });
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (res) {
//     console.log("---------------\nURL: " + queryURL + "\n---------------");
//     console.log(q);
//     console.log(res);
//     var results = res.data;
//     for (var i = 0; i < 10; i++) {
//         var memeDiv = $("<div>");
//         // var p = $("<p>").text("Rating: " + results[i].rating);

//         // memeDiv.append(p);
//         memeDiv.append(memeImage);
//         


//     }
// });

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
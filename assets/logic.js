// 
// 
var topics = ["baby yoda", "yoda", ];
// 
function topicInfo() {
    event.preventDefault();
    
    "success": true,
    "data": {
        "memes": [
            {
                "id": "61579",
                "name": "One Does Not Simply",
                "url": "https://i.imgflip.com/1bij.jpg",
                "width": 568,
                "height": 335,
                "box_count": 2
            },
            {
                "id": "101470",
                "name": "Ancient Aliens",
                "url": "https://i.imgflip.com/26am.jpg",
                "width": 500,
                "height": 437,
                "box_count": 2
            }
            // probably a lot more memes here..
        ]
    }
}
    
    $.ajax(settings).then(function (res) {
        // console.log("---------------\nURL: " + queryURL + "\n---------------");
        // console.log(q);
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

/*
TODO:
- initialize firebase  
- connect to  yoda translator api without access errors
- connect to meme generator api without access errors
- on click event to take user input
- pass user input through yoda translator
- populate new phrase from yoda
- user choses meme
- user appends phrase to top or bottom of meme
- store user created memes in firebase

TODO: current errors:
-connection issue with api (key error could by information or api)
*/
var url = "https://api.giphy.com/v1/gifs/search?api_key=Bj9MQo2Akd7Vm9bP8JzWlsHeEHNW2OC5"
var queryTopic = "&q=" //requires anything
var limit = "&limit=10" //requires integer 10 by default
var englishTag = "&lang=en" //english by default
var rating = "&rating=PG" //pg by default
var off = "&offset="
var offset = 0;
// url + query + limit + offset + rating + lang tag
var gifArr = []
var holdCurr = "";


function getGifs(pass) {
    $.ajax({
        url: url + queryTopic + pass + limit + off + offset + rating + englishTag,
        type: 'GET',
        success: function (res) {
            gifArr = res.data;
            appendGifs();
        }
    });
}

function appendGifs() {
    for (var i = 0; i < gifArr.length; i++) {

        $('.display').append(`
        <div class="gif">
            <img class="card" data_value = ${gifArr[i].images.downsized_medium.url} 
            src=${gifArr[i].images.downsized_still.url} alt="unable to load"
            style="width:350px; height:350px;">
            <h3>Rating: ${gifArr[i].rating}</h3>
        </div>
        `)

    }
}

$(document).on("click", ".topic", function () {
    $('.display').html('');
    offset = 0;
    var temp = $(this).attr('value');
    getGifs(temp);
    $('.more').css("display","block");
});

$(document).on("click", ".card", function () {
    var temp = $(this).attr('data_value');
    var currImg = $(this).attr('src');
    $(this).attr('data_value', currImg);
    $(this).attr('src', temp);
});

$(document).on("click", ".addBtn", function (e) {
    e.preventDefault();
    if (document.getElementById('topicName').value != '' && document.getElementById('topicName').value != null) {
        holdCurr = document.getElementById('topicName').value;
        console.log(holdCurr)
        $('.nav').append(`
    <li><a class="topic" value=${holdCurr}>${holdCurr}</a></li>
    `);
        document.getElementById('topicName').value = '';
    }
});
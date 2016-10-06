$("#search").click(function() {
    var searchTerm = $("#searchbox").val();

    var url = "https://en.wikipedia.org//w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + searchTerm;
    $("#results-block").text("");

    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "jsonp",
        success: function (data) {
            var resultsArray = data["query"].search;
            showOutput(resultsArray);
        },
        error: function (errorMessage) {
            $("#results-block").append("<h3 class='text-center'>Sorry, no results found</h3>");
        }
    });

});

function showOutput(resultsArray) {
    console.log(resultsArray);
    if(resultsArray.length == 0) {
        $("#results-block").append("<h3 class='text-center'>Sorry, no results found</h3>");
    } else {
        for (item in resultsArray) {
            console.log(resultsArray[item]);
            var titleName = resultsArray[item].title;
            var wikipediaLink = "<h3><a target='_blank' href='https://en.wikipedia.org/wiki/" + titleName + "'>" + titleName + "</a></h3>";
            console.log(wikipediaLink);
            var snippet = "<p>" + resultsArray[item].snippet + "<p>";
            var hr = "<hr>";
            var HTMLtoAppend = wikipediaLink + snippet + hr;
            $("#results-block").append(HTMLtoAppend);
        }
    }
}

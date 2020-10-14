$(function () {
    let location = window.location.href.toString();

    if (location.includes('old.reddit.com')) {
        chrome.runtime.onMessage.addListener(getOldRedditHeadlines)
    } else {
        chrome.runtime.onMessage.addListener(getNewRedditHeadlines)
    }

});

function getNewRedditHeadlines() {
    let titles = [];
    $("body").find('h3').each(function (i) {
        let title = $(this).text();
        if (title != '') {
            // console.log(title);
            titles.push(title);
        }
    });

    save(titles);
}



function getOldRedditHeadlines() {
    let titles = [];
    $("body").find('*').each(function (i) {
        let id = $(this).attr('id');

        if (id != undefined) {
            if (id.includes("thing")) {
                let title = $(this).children(".entry").children(".top-matter").children(".title").children(".title").text();
                // console.log(title);
                titles.push(title);
            }
        }

    });

    save(titles);
}

function save(array) {
    for (element of array) {
        $.post({
            url: "http://localhost:8000/save",
            data: {
                title: element
            }
        }).done(function (e) {
            console.log('done:');
            console.log(e);
        }).fail(function (e) {
            console.log('error:');
            console.log(e);
        })
    }
}
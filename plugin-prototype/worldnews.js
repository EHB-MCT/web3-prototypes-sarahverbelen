$(function () {
    let location = window.location.href.toString();

    if (location.includes('old.reddit.com')) {
        // chrome.runtime.onMessage.addListener(getOldRedditHeadlines)
    } else {
        chrome.runtime.onMessage.addListener(getNewRedditInfo)
    }

});

function getNewRedditInfo() {
    let posts = getNewRedditHeadlines();

    let newPosts = [];

    for(let post of posts) {
        post.karma = getNewRedditKarma(post.headNode);
        post.user = getNewRedditUser(post.headNode);


        // because ads don't get up or downvotes, this filters out ads
        if(post.karma != undefined) { 
            newPosts.push(post);
        }

    }
   
    // console.log(newPosts);
    save(newPosts);

}

function getNewRedditKarma(headNode) {
    let id = headNode.attr('id');
    if(id != undefined) {
        let karma = $("#vote-arrows-" + id).children('div').text();
        return karma;
    } else {
        return undefined;
    }
}

function getNewRedditUser(headNode) {
    let fullUser = headNode.find("a[href*='/user/']").text();
    let user = fullUser.split('/');
    return user[1];
}

// this function gets the title of the post,
// as well as the jquery node that everything is inside of (the uppermost div of the post)
function getNewRedditHeadlines() {
    let posts = [];

    $("body").find('h3').each(function (i) {
        let title = $(this).text();
        if (title != '') {
            // console.log(title);
            posts.push({title: title, headNode: $(this).parent().parent().parent().parent().parent().parent().parent().parent()});
        }

    });

    return posts;
}

// old reddit is not yet updated with the new functions and such
// function getOldRedditHeadlines() {
//     let titles = [];
//     $("body").find('*').each(function (i) {
//         let id = $(this).attr('id');

//         if (id != undefined) {
//             if (id.includes("thing")) {
//                 let title = $(this).children(".entry").children(".top-matter").children(".title").children(".title").text();
//                 // console.log(title);
//                 titles.push(title);
//             }
//         }

//     });

//     return titles;
// }

function save(array) {
    for (element of array) {
        $.post({
            url: "http://localhost:8000/save",
            data: {
                title: element.title,
                karma: element.karma,
                user: element.user
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
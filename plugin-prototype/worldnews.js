$(function () {
    

    $("body").find('*').each(function (i) {
        let id = $(this).attr('id');

        if (id != undefined) {
            if (id.includes("thing")) {
                let title = $(this).children(".entry").children(".top-matter").children(".title").children(".title").text();
                console.log(title);

                // to do: format in nice json
                // to do: save in mongo database
            }
        }

    });

});
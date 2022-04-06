
function get(url, success, error) {
    $.ajax({

        url: url,
        type: "GET",
        headers: {
            'companyId': COMPANY_ID
        },
        // Notice! JSONP <-- P (lowercase)
        success: function (json) {
            success(json)

        },
        error: function (error) {
            error(error);

            console.log(error);
        }
    });

}
function post(url,obj, success, error) {
    $.ajax({

        url: url,
        type: "POST",
        headers: {
            'companyId': COMPANY_ID
        },
        data: obj,

        // Notice! JSONP <-- P (lowercase)
        success: function (json) {
            success(json)

        },
        error: function (msg) {
            error(msg);

           console.log(msg);
        }
    });

}

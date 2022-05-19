// $('#sidebar').toggleClass('active');
let userObj = null;
let notificaitonId;
$(document).ready(function () {
    userObj = JSON.parse(persistanceMemoryRetrieve("userInfo"));
    try {
        if (userObj.userId == undefined || userObj.userId == '') {
            showToastError(NOT_AUTHORIZED)
            navigate(SIGNIN_PAGE);
        }
    } catch (error) {
        showToastError(NOT_AUTHORIZED)
        navigate(SIGNIN_PAGE);
    }
    setHeader();
    
    initilizeDataTable();
    getNotifications();
    $('.modal-body').css('height', $(window).height());
    $('.modal-body').css('width', $(window).width());
   
    $("#btnClose").click(function () {
        $(".modal .close").click()
    });
    $("#btnNotificationDelete").click(function () {
        if (userObj.roleType == ROLE_TYPE_COMPANY_ADMIN) {

            var deleteNotificationObject = {
                "userId": userObj.userId,
                "notificationId":notificaitonId
            }

            post(BASE_URL + END_POINT_DELETE_NOTIFICATION, deleteNotificationObject, function success(json) {

                showToast(json.message);
                $(".modal .close").click()
               getNotifications();

            },
                function error(error) {
                    showToast(ERROR);

                });

        } else {
            showToast(NOT_AUTHORIZED)
        }



    });
    $("#btnSendNotification").click(function () {
        console.log("send send send")
        if (userObj.roleType == ROLE_TYPE_COMPANY_ADMIN) {

            var obj = {
                "branchId": userObj.branchId,
                "userId":userObj.userId, 
                "title":$('#txtTitle').val(),
                "msg":$('#txtMsg').val(),
                "toUserId":"0"
            }
            createNotification(obj,"Send Notification")

        }
        else{
            showToastError(NOT_AUTHORIZED)
        }


    });
    
});


let table = null;
function initilizeDataTable() {
    table = $('#dtNotificationTable').DataTable({
        columnDefs: [
            {
                "targets": [5],
                "visible": false,
                "searchable": false
            },
           
            {
                "targets": [0],
                className: 'classDataTable'


            },
          
            {
                "targets": [1],
                className: 'elipsisText'
            },
        ]
    });
}


let userId = null;
function getNotifications() {

    table.clear().draw();
    $("#dtNotification").html(loader);
    get(BASE_URL + END_POINT_GET_NOTIFICATIONS+userObj.userId,
        function success(json) {
            var className = 'badge bg-success';
           
            var row = "";
            if (json.success) {
                for (let x = 0; x < json.data.length; x++) {
                    className = json.data[x].status == 'SENT' ? 'badge bg-success' : 'badge bg-danger'
           
                    table.row.add([json.data[x].title,
                    json.data[x].msg,
                    json.data[x].createdDateTime,
                    json.data[x].completedDateTime,
                    '<span class="'+className+'">'+json.data[x].status+'</span>',
                    json.data[x].notificaitonId,
                  ]).draw(false);
                    //  row += '<tr><td><a style=" text-decoration: underline;cursor: pointer;color:blue; "  >'+json.data[x].branchName+'</a>' + json.data[x].branchAddress + '</td><td>' + json.data[x].areaName + '</td>	<td>' + json.data[x].cityName + '</td><td> <span class="badge bg-success">Active</span></td> </tr>';
                }

                $("#dtNotificationTable tbody").html(row);
               
                table.draw();
            } else {
                $("#dtNotificationTable tbody").html(noDataFound);
               
              
               // showToastError(ERROR);

            }

        },

        function error() { });


    $('#dtNotificationTable tbody').on('click', 'tr', function () {
        notificaitonId = table.row(this).data()[5];
        let title = table.row(this).data()[0];
        console.log("Title "+title)
        let msg = table.row(this).data()[1];
        $("#txtTitle").val(title);
        $("#txtMsg").text(msg);

        $(".modal").modal('show');




    });
}

function createNotification(obj, text) {
    $('#btnSendNotification').html(loader);
    post(BASE_URL + END_POINT_CREATE_NOTIFICATION, obj,
        function success(json) {
            console.log("====== resposne ========");
            console.log(JSON.stringify(json));

            if (json.success) {
                showToast(json.message);
                $(".modal .close").click()
                getNotifications();

            } else {

                showToastError(json.message);

            }
            $('#btnSendNotification').html(text);

        },
        function error(error) {
            $('#btnSendNotification').html(text);

            showToastError(ERROR);
        });

        
}

var map = null;
var marker;






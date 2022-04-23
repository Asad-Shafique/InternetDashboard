// $('#sidebar').toggleClass('active');
let userObj = null;
let branchId = 0;
let complaintId = 0;
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
    getBranches();
    getComplaintTypes();
    getComplaints();
    roleBasedView();
    getStatus();


    // $('#btnCreateUserAsync').css("display","none")
    $('#btnDeleteUserAsync').css("display", "none");

    //  getBranches();
    $('.modal-body').css('height', $(window).height());
    $('.modal-body').css('width', $(window).width());
    $("#btnCreateUser").click(function () {

    });
    $("#btnClose").click(function () {
        $(".modal .close").click()
    });
    $("#btnCreateUser").click(function () {

        $("#btnCreateUserAsync").html("Create User");
        setTimeout(function () {
            if (map == null || map == undefined) {
                initMap();
            }
            goToCurrentLocation();
        }, 2000);

    });
    $("#btnUpdateComplaint").click(function () {
        let valueSelected = $('#dropdownStatusModal :selected').val()
        
        let obj = {
            'userId':userObj.userId,
            'complaintId':complaintId,
            'status':valueSelected
        }

         updateComplaint(obj)

    });



    $('#dropdownBranch').on('change', function (e) {
        let valueSelected = $('#dropdownBranch :selected').text()
        console.log(table);
        if (valueSelected == 'All') {
            table.search('').draw();
        } else {
            table.search(valueSelected).draw();
        }

    });
    $('#dropDownComplaintTypes').on('change', function (e) {
        let valueSelected = $('#dropDownComplaintTypes :selected').text()

        if (valueSelected == 'All') {
            table.search('').draw();
        } else {
            table.search(valueSelected).draw();
        }

    });
    $('#dropdownStatus').on('change', function (e) {
        let valueSelected = $('#dropdownStatus :selected').text()
        if (valueSelected == 'All') {
            table.search('').draw();
        } else {
            table.search(valueSelected).draw();
        }
    });
    $('#dropdownStatus').on('change', function (e) {
        let valueSelected = $('#dropdownStatus :selected').text()
        if (valueSelected == 'All') {
            table.search('').draw();
        } else {
            table.search(valueSelected).draw();
        }
    });



});


function updateComplaint(obj) {

    $("#btnUpdateComplaint").html(loader);
    post(BASE_URL + END_POINT_UPDATE_COMPLAINT_STATUS, obj, function success(json) {
        $("#btnUpdateComplaint").html("Update Complaint");

        if (json.success) {
            showToast(json.message);
            $(".modal .close").click()
            getComplaints();
        }
        else {
            showToastError(json.message)
        }

    },
        function error(error) {
            $("#btnUpdateComplaint").html("Update Complaint");

            showToast(ERROR);

        });

}
function createUser(obj) {
    $("#btnCreateUserAsync").html(loader);
    post(BASE_URL + END_POINT_CREATE_USER, obj, function success(json) {
        $("#btnCreateUserAsync").html("Create User");

        if (json.success) {
            showToast(json.message);
            $(".modal .close").click()
            getCompanyUsers();
        }
        else {
            showToastError(json.message)
        }

    },
        function error(error) {
            $("#btnCreateUserAsync").html("Create User");

            showToast(ERROR);

        });



}
function updateUser(obj) {
    $("#btnCreateUserAsync").html(loader);
    post(BASE_URL + END_POINT_UPDATE_USER, obj, function success(json) {
        $("#btnCreateUserAsync").html("Update User");

        if (json.success) {
            showToast(json.message);
            $(".modal .close").click()
            getCompanyUsers();
        }
        else {
            showToastError(json.message)
        }

    },
        function error(error) {
            $("#btnCreateUserAsync").html("Create User");

            showToast(ERROR);

        });



}
function getComplaintTypes() {
    //get branches
    get(BASE_URL + END_PINT_GET_COMPLAINT_TYPE,
        function success(json) {
            $('#dropDownComplaintTypes').append($('<option>', {
                value: "All",
                text: "All"
            }));

            $.each(json.data, function (i, item) {
                $('#dropDownComplaintTypes').append($('<option>', {
                    value: item.complaintTypeId,
                    text: item.complaintTitle
                }));
            });



        }, function error(error) {

            showToastError("Error getting packages");

        })
}


function getStatus() {
    //get branches
    get(BASE_URL + END_POINT_GET_STATUS + STATUS_TYPE_GENERAL,
        function success(json) {


            $.each(json.data, function (i, item) {
                if (item.statusId != "00" && item.statusId != "01") {
                    $('#dropdownStatus').append($('<option>', {
                        value: item.statusId,
                        text: item.status
                    }));
                    $('#dropdownStatusModal').append($('<option>', {
                        value: item.statusId,
                        text: item.status
                    }));

                }
            });



        }, function error(error) {

            showToastError("Error getting packages");

        })
    get(BASE_URL + END_POINT_GET_STATUS + STATUS_TYPE_ON_ACCEPT,
        function success(json) {


            $.each(json.data, function (i, item) {
                $('#dropdownStatus').append($('<option>', {
                    value: item.statusId,
                    text: item.status
                }));
                // $('#dropdownStatusModal').append($('<option>', {
                //     value: item.statusId,
                //     text: item.status
                // }));
            });


        }, function error(error) {

            showToastError("Error getting packages");

        })
    get(BASE_URL + END_POINT_GET_STATUS + STATUS_TYPE_ON_COMPLAINT_FORM,
        function success(json) {
            $.each(json.data, function (i, item) {
                $('#dropdownStatus').append($('<option>', {
                    value: item.statusId,
                    text: item.status
                }));
                $('#dropdownStatusModal').append($('<option>', {
                    value: item.statusId,
                    text: item.status
                }));
            });
        }, function error(error) {
            showToastError("Error getting packages");

        })
    get(BASE_URL + END_POINT_GET_STATUS + STATUS_TYPE_ON_ADMIN_FORM,
        function success(json) {
            $.each(json.data, function (i, item) {

                $('#dropdownStatusModal').append($('<option>', {
                    value: item.statusId,
                    text: item.status
                }));
            });
        }, function error(error) {
            showToastError("Error getting packages");

        })

    $('#dropdownStatus').append($('<option>', {
        value: "All",
        text: "All"
    }));
}

function getBranches() {
    //get branches
    get(BASE_URL + END_PONT_GET_COMPANY_BRANCHES + userObj.userId,
        function success(json) {

            $('#dropdownBranch').append($('<option>', {
                value: 'All',
                text: 'All'
            }));
            $.each(json.data, function (i, item) {
                $('#dropdownBranch').append($('<option>', {
                    value: item.branchId,
                    text: item.branchName
                }));
            });
            $.each(json.data, function (i, item) {
                $('#crDropdownBranch').append($('<option>', {
                    value: item.branchId,
                    text: item.branchName
                }));
            });

        }, function error(error) {

            showToastError("Error getting Areas");

        })
}
let table = null;
function initilizeDataTable() {
    table = $('#dtComplaintTable').DataTable({
        columnDefs: [

            {
                "targets": [8],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [9],
                "visible": false,
                "searchable": true
            },
            {
                "targets": [10],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [11],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [12],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [13],
                "visible": false,
                "searchable": false
            },

            {
                "targets": [14],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [15],
                "visible": false,
                "searchable": false
            },

            {
                "targets": [0],
                className: 'classDataTable'
            },
            {
                "targets": [4],
                className: 'elipsisText'
            },

        ]
    });


    $('#dtComplaintTable tbody').on('click', 'tr', function () {
        let lat = table.row(this).data()[11];
        let lng = table.row(this).data()[12];
        complaintId = table.row(this).data()[8];
        console.log(table.row(this).data()[8] + ':' + table.row(this).data()[0])
        $('#txtCustName').text(table.row(this).data()[0])
        $('#txtCustMobileNo').text(table.row(this).data()[1])
        $('#txtCustAddress').text(table.row(this).data()[2])
        $('#txtComplaintType').text(table.row(this).data()[3])
        $('#txtComplaint').text(table.row(this).data()[4])
        $('#txtStatus').text(table.row(this).data()[14])
        $('#txtTechnicianName').text(table.row(this).data()[6])
        $('#txtComaplaintDateTime').text(table.row(this).data()[5])
        $('#txtAcceptedDateTime').text(table.row(this).data()[10])
        $("#dropdownStatusModal").val(table.row(this).data()[15]).trigger('change');
      
        let status = table.row(this).data()[14]
        let className = status == 'Pending' ? 'badge bg-warning' :
            status == 'In Progress' ? 'badge bg-info' :
                status == 'Resolved' ? 'badge bg-success' : 'badge bg-danger';
        $('#txtStatus').addClass(className)
        $('#imageDiv').css("display", "flex");

        $(".modal").modal('show');
        setTimeout(function () {
            if (map == null || map == undefined) {
                initMap();
            }
            gotoLocation(lat, lng)
        }, 2000);

        getComplaintImages(complaintId);
    });



}

function getComplaintImages(id) {
    get(BASE_URL + END_POINT_GET_COMPLAINT_IMAGES_BY_COMPLAINT_ID + id,
        function success(json) {
            let div = '';
            let carouselClass = 'carousel-item active';
            try {
                $.each(json.data, function (i, item) {
                    console.log(item.imgUrl)
                    if (i > 0) { carouselClass = 'carousel-item'; }


                    div += '<div class="' + carouselClass + '"><img class="d-block img-fluid" src=' + item.imgUrl + '></div>'
                    // $('#imageCarousel').append($('<div class="carousel-item item active"><img class="d-block img-fluid" src=' + item.imgUrl + '></div>'));
                    console.log(div);
                    $('.carousel-inner').html(div);

                });
            }
            catch (error) {
                // showToastError("No image found");
                $('#imageDiv').css("display", "none");
            }
            $('#carouselExampleControls').carousel();
        },
        function error(error) {

        });

}

function getComplaints() {
    table.clear().draw();
    $("#dtComplaint").html(loader);
    get(BASE_URL + END_POINT_GET_COMPLAINT_FOR_AGENT + userObj.userId + "&branchId=" + branchId,
        function success(json) {
            var row = '';
            var className = 'badge bg-success';

            for (let x = 0; x < json.data.length; x++) {
                className = json.data[x].status == 'Pending' ? 'badge bg-warning' :
                    json.data[x].status == 'In Progress' ? 'badge bg-info' :
                        json.data[x].status == 'Resolved' ? 'badge bg-success' : 'badge bg-danger';

                table.row.add(
                    [json.data[x].customerName,
                    json.data[x].customerMobile,
                    json.data[x].customerAddress,
                    json.data[x].complaintTitle,
                    json.data[x].complaintDesc + 'asdlkasdjlkajsdlaksjdlkasjdl alsdkjasldkjaslkd alsdkjasldkjasd alskdasldkj ',
                    json.data[x].createdDateTime,
                    json.data[x].technicianName,
                    '</td><td> <span class="' + className + '">' + json.data[x].status + '</span></td>',

                    json.data[x].complaintId,
                    json.data[x].acceptBy,
                    json.data[x].acceptedDateTime,
                    json.data[x].lat,
                    json.data[x].lng,
                    json.data[x].branchName,
                    json.data[x].status,
                    json.data[x].statusId






                    ]
                ).draw(true);

                //       row += '<tr><td><a style=" text-decoration: underline;cursor: pointer;color:blue; "  >'+json.data[x].branchName+'</a>' + json.data[x].branchAddress + '</td><td>' + json.data[x].areaName + '</td>	<td>' + json.data[x].cityName + '</td><td> <span class="badge bg-success">Active</span></td> </tr>';
            }

            $("#dtComplaintTable tbody").html(row);

            table.draw();

        },
        function error(error) {


        });
}
function getCompanyRoles() {
    get(BASE_URL + END_PONT_GET_COMPANY_ROLES,
        function success(json) {
            $('#dropdownRole').append($('<option>', {
                value: 'All',
                text: 'All'
            }));
            $.each(json.data, function (i, item) {
                // console.log(JSON.stringify(item));
                $('#dropdownRole').append($('<option>', {
                    value: item.roleId,
                    text: item.roleName
                }));
            });
            $.each(json.data, function (i, item) {
                // console.log(JSON.stringify(item));
                $('#crDropdownRole').append($('<option>', {
                    value: item.roleId,
                    text: item.roleName
                }));
            });


        },
        function error(error) {

        });
}





var map = null;
var marker;
function initMap() {

    map = L.map('map').setView([0, 0], 1);
    L.tileLayer(OPEN_STREET_MAP, {
        attribution: OPNE_STREET_MAP_CONTRIBUTOR

    }).addTo(map);
    map.invalidateSize();
    map.on('click', function (e) {
        if (marker)
            map.removeLayer(marker);
        console.log(e.latlng); // e is an event object (MouseEvent in this case)

        $('#txtLat').val(e.latlng.lat);
        $('#txtLng').val(e.latlng.lng);
        var branchIcon = new L.icon({
            iconUrl: PERSON_IMAG,
            iconSize: [40, 40]
        })
        marker = L.marker(e.latlng, { icon: branchIcon }).addTo(map);
    });


}
function goToCurrentLocation() {
    if (marker) { map.removeLayer(marker); }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('--- Your Position: ---');
            console.log('Lat: ' + position.coords.latitude);
            var lat = position.coords.latitude;
            console.log('Long: ' + position.coords.longitude);
            var lng = position.coords.longitude;
            console.log('---------------------');
            var abc = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
            var zoom = 15;

            map.flyTo([lat, lng], zoom, {
                "animate": true,
                "pan": {
                    "duration": 10
                }
            });

        }, function (error) {
            console.log(error);
        })
    }




}
function gotoLocation(lat, lng) {
    if (marker) {
        map.removeLayer(marker);
    }
    var branchIcon = new L.icon({
        iconUrl: PERSON_IMAG,
        iconSize: [40, 40]
    })
    var zoom = 16;
    map.flyTo([lat, lng], zoom, {
        "animate": true,
        "pan": {
            "duration": 10
        }
    });
    L.marker([lat, lng], { icon: branchIcon }).addTo(map);
}

function roleBasedView() {

    if (userObj.roleType == ROLE_TYPE_COMPANY_ADMIN) {
        $('#btnDeleteBranch').show();

    }
    else {
        $('#btnDeleteBranch').hide();

    }
}

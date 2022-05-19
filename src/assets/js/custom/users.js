// $('#sidebar').toggleClass('active');
let userObj = null;
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
    getCompanyUsers();
    roleBasedView();
    getBranches();
    getCompanyRoles();
    getPackages();
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
    $("#btnCreateUserAsync").click(function () {

        let lat = $("#txtLat").val();
        let lng = $("#txtLng").val();
        let firstName = $("#txtFirstName").val();
        let regId = $("#txtRegId").val();
        let mobileNo = $("#txtMobileNo").val();
        let cnicNo = $("#txtCnicNo").val();
        let address = $("#txtAddress").val();
        let email = $("#txtEmail").val();
        let loginId = $("#txtLoginId").val();
        let password = $("#txtPassword").val();

        let status = $("#crDropDownStatus  :selected").val();
        let package = $("#crDropDownPackage  :selected").val();
        let branch = $("#crDropdownBranch  :selected").val();
        let role = $("#crDropdownRole  :selected").val();


        if (status == '') { showToastError("Please select status"); return; }
        if (package == '') { showToastError("Please select package"); return; }
        if (branch == '') { showToastError("Please select branch"); return; }
        if (role == '') { showToastError("Please select role"); return; }
        if (firstName == '') { showToastError("Please enter first name"); return; }
        // if (lastName == '') { showToastError("Please enter last name"); return; }
        if (mobileNo == '') { showToastError("Please enter mobile no"); return; }
        if (cnicNo == '') { showToastError("Please enter cnic no"); return; }
        if (address == '') { showToastError("Please enter address"); return; }
        if (password == '') { showToastError("Please enter password"); return; }


        if ($('#btnCreateUserAsync').text() == "Create User") {
            var signUpObj = {
                "branchId": branch,
                "roleId": role,
                "packageId": package,
                "firstName": firstName,
                "lastName": "",
                "email": email,
                "mobile": mobileNo,
                "cnic": cnicNo,
                "loginId": loginId,
                "mobile2": "",
                "address": address,
                "lat": lat,
                "lng": lng,
                "password": password,
                "status": status,
				 "registrationId": regId
            }
            createUser(signUpObj);

        } else {
            var updatedObj = {
                "updatedBy": userObj.userId,
                "userId": userId,
                "branchId": branch,
                "roleId": role,
                "packageId": package,
                "firstName": firstName,
                "lastName": "",
                "email": email,
                "mobile": mobileNo,
                "cnic": cnicNo,
                "loginId": loginId,
                "mobile2": "",
                "address": address,
                "lat": lat,
                "lng": lng,
                "status": status,
                "password": password,
                "selfieUrl": "",
                "cnicFront": "",
                "cnicBack": "",
				"registrationId":regId

            }
            updateUser(updatedObj);
        }

        //  createUser(signUpObj);

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
    $('#dropdownRole').on('change', function (e) {
        let valueSelected = $('#dropdownRole :selected').text()
        console.log(table);
        if (valueSelected == 'All') {
            table.search('').draw();
        } else {
            table.search(valueSelected).draw();
        }

    });
    $('#crDropDownPackageCategory').on('change', function (e) {
        let valueSelected = $('#crDropDownPackageCategory :selected').val()
        getPackagesType(valueSelected);
    });


});
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
function getPackages() {
    //get branches
    get(BASE_URL + END_PONT_GET_PACKAGES_TYPE,
        function success(json) {


            $.each(json.data, function (i, item) {
                console.log(item);
                $('#crDropDownPackageCategory').append($('<option>', {
                    value: item.packageId,
                    text: item.packageType
                }));
            });


            getPackagesType($('#crDropDownPackageCategory :selected').val())

        }, function error(error) {

            showToastError("Error getting packages");

        })
}
function getPackagesType(id) {
    //get branches
    $('#crDropDownPackage').empty();
    get(BASE_URL + END_POINT_GET_PACKAGES_BY_ID + id,
        function success(json) {

            $.each(json.data, function (i, item) {
                console.log(item);
                $('#crDropDownPackage').append($('<option>', {
                    value: item.companyPackageId,
                    text: item.packageName
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
                console.log(item);
                $('#crDropDownStatus').append($('<option>', {
                    value: item.statusId,
                    text: item.status
                }));
            });


        }, function error(error) {

            showToastError("Error getting packages");

        })
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
    table = $('#dtUserTable').DataTable({
        columnDefs: [
            {
                "targets": [7],
                "visible": false,
                "searchable": false
            },
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
                "targets": [16],
                "visible": false,
                "searchable": false
            },
			 {
                "targets": [17],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [0],
                className: 'classDataTable'


            }
        ]
    });


    $('#dtUserTable tbody').on('click', 'tr', function () {
        userId = table.row(this).data()[7];
        let lat = table.row(this).data()[13];
        let lng = table.row(this).data()[14];
       
       let fullName = table.row(this).data()[0];
       let split = fullName.split(" ");
        let firstName = split[0]
        let lastName = split[1]
       
       
       
        let mobileNo = table.row(this).data()[1];
        let cnicNo = table.row(this).data()[2];
        let address = table.row(this).data()[3];
        let email = "";
        let loginId = table.row(this).data()[4];
        let password = table.row(this).data()[12];

        let statusId = table.row(this).data()[16];
        let packageId = table.row(this).data()[10];
        let branchId = table.row(this).data()[8];
        let roleId = table.row(this).data()[15];
        let registrationId = table.row(this).data()[17];
        

        $("#txtLng").val(lng)
        $("#txtLat").val(lat);
        $("#crDropDownStatus").val(statusId).trigger('change');
        $("#crDropDownPackage").val(packageId).trigger('change');
        // $("#crDropDownPackageCategory").val(statusId).trigger('change');
        $("#crDropdownBranch").val(branchId).trigger('change');
        $("#crDropdownRole").val(roleId).trigger('change');
        $("#txtFirstName").val(firstName);
        $("#txtRegId").val(registrationId);
        $("#txtMobileNo").val(mobileNo);
        $("#txtCnicNo").val(cnicNo);
        $("#txtAddress").val(address);
        $("#txtEmail").val(email);
        $("#txtLoginId").val(loginId);
        $("#txtPassword").val(password);
        $(".modal").modal('show');

        // $('#branchName').val(branchName);
        // $('#branchAddress').val(branchAddress)
        // $('#txtLat').val(branchLat)
        // $('#txtLng').val(branchLng)
        $('#btnCreateUserAsync').text("Update User")

        setTimeout(function () {
            if (map == null || map == undefined) {
                initMap();
            }
            gotoLocation(lat, lng)
        }, 2000);




    });



}


function getCompanyUsers() {
    table.clear().draw();
    $("#dtUsers").html(loader);
    get(BASE_URL + END_PONT_GET_COMPANY_USERS + userObj.userId,
        function success(json) {
            var row = '';
            var className = 'badge bg-success';
            for (let x = 0; x < json.data.length; x++) {
                className = json.data[x].status == 'Active' ? 'badge bg-success' : 'badge bg-danger'
                table.row.add([json.data[x].firstName + ' ' + json.data[x].lastName,
                json.data[x].mobile,
                json.data[x].cnic,
                json.data[x].address,
                json.data[x].loginId,
                json.data[x].roleName,
                '</td><td> <span class="' + className + '">' + json.data[x].status + '</span></td>',
                json.data[x].userId,
                json.data[x].branchId,
                json.data[x].branchName,
                json.data[x].companyPackageId,
                json.data[x].packageName,
                json.data[x].password,
                json.data[x].lat,
                json.data[x].lng,
                json.data[x].roleId,
                json.data[x].statusId,
				json.data[x].registrationId,
                ]
                ).draw(true);

                //       row += '<tr><td><a style=" text-decoration: underline;cursor: pointer;color:blue; "  >'+json.data[x].branchName+'</a>' + json.data[x].branchAddress + '</td><td>' + json.data[x].areaName + '</td>	<td>' + json.data[x].cityName + '</td><td> <span class="badge bg-success">Active</span></td> </tr>';
            }

            $("#dtUserTable tbody").html(row);

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

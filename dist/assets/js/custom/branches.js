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
    roleBasedView();
    getAreas();
    initilizeDataTable();
    getBranches();
    $('.modal-body').css('height', $(window).height());
    $('.modal-body').css('width', $(window).width());
    $("#btnCreateBranch").click(function () {
        $('#btnDeleteBranch').hide();
   
        branchId = null;
        $('#btnCreateBranchAsync').text("Create Branch")
        setTimeout(function () {
            if (map == null || map == undefined) {
                initMap();
            }
            goToCurrentLocation();
        }, 2000);

    });
    $("#btnClose").click(function () {
        $(".modal .close").click()
    });
    $("#btnDeleteBranch").click(function () {
        console.log(obj.roleType)
        if (userObj.roleType == ROLE_TYPE_COMPANY_ADMIN) {

            var deleteBranchObj = {
                "branchId": branchId,
            }

            post(BASE_URL + END_PONT_DELETE_BRANCH, deleteBranchObj, function success(json) {

                showToast(json.message);
                $(".modal .close").click()
                getBranches();

            },
                function error(error) {
                    showToast(ERROR);

                });

        } else {
            showToast(NOT_AUTHORIZED)
        }



    });
    $("#btnCreateBranchAsync").click(function () {
        let areaId = $('#dropdownAreas :selected').val();
        let branchName = $("#branchName").val();
        let branchAddress = $("#branchAddress").val();
        let branchLat = $('#txtLat').val();
        let branchLng = $('#txtLng').val();
        if (branchName == '' || branchAddress == '' || branchLat == '' || branchLng == '') {
            $('input[type="text"],input[type="password"]').css("border", "2px solid red");
            $('input[type="text"],input[type="password"]').css("box-shadow", "0 0 3px red");
            showToastError("Please fill all fields.");
        } else {
            let text = "";
            if (branchId == null || branchId == undefined) {

                var obj = {
                    "areaId": areaId,
                    "branchName": branchName,
                    "branchAddress": branchAddress,
                    "branchLat": branchLat,
                    "branchLng": branchLng
                };
                text = "Update Branch";
            }
            else {

                var obj = {
                    "branchId": branchId,
                    "areaId": areaId,
                    "branchName": branchName,
                    "branchAddress": branchAddress,
                    "branchLat": branchLat,
                    "branchLng": branchLng
                };
                text = "Create Branch";
            }
            console.log(JSON.stringify(obj));
            createBranch(obj, text);
        }
    });
});

function getAreas() {
    //get branches
    get(BASE_URL + END_PONT_GET_COMPANY_AREAS,
        function success(json) {
            console.log(JSON.stringify(json));

            console.log("length = " + json.data.length);
            $.each(json.data, function (i, item) {
                console.log(JSON.stringify(item));
                $('#dropdownAreas').append($('<option>', {
                    value: item.areaId,
                    text: item.areaName
                }));
            });

        }, function error(error) {

            showToastError("Error getting Areas");

        })
}
let table = null;
function initilizeDataTable() {
    table = $('#dtBranchesTable').DataTable({
        columnDefs: [
            {
                "targets": [5],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [6],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [7],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [0],
                className: 'classDataTable'


            }
        ]
    });
}


let branchId = null;
function getBranches() {

    table.clear().draw();
    $("#dtBranches").html(loader);
    get(BASE_URL + END_PONT_GET_COMPANY_BRANCHES,
        function success(json) {
            console.log(JSON.stringify(json));
            var row = "";
            if (json.success) {
                for (let x = 0; x < json.data.length; x++) {
                    table.row.add([json.data[x].branchName,
                    json.data[x].branchAddress,
                    json.data[x].areaName,
                    json.data[x].cityName,
                        '</td><td> <span class="badge bg-success">Active</span></td>',
                    json.data[x].branchId,
                    json.data[x].branchLat,
                    json.data[x].branchLng]).draw(false);
                    //  row += '<tr><td><a style=" text-decoration: underline;cursor: pointer;color:blue; "  >'+json.data[x].branchName+'</a>' + json.data[x].branchAddress + '</td><td>' + json.data[x].areaName + '</td>	<td>' + json.data[x].cityName + '</td><td> <span class="badge bg-success">Active</span></td> </tr>';
                }

                $("#dtBranchesTable tbody").html(row);
                table.row
                table.draw();
            } else {

                showToastError(ERROR);

            }

        },

        function error() { });


    $('#dtBranchesTable tbody').on('click', 'tr', function () {
        branchId = table.row(this).data()[5];
        let branchName = table.row(this).data()[0];
        let branchAddress = table.row(this).data()[1];
        let branchLat = table.row(this).data()[6];
        let branchLng = table.row(this).data()[7];
        $(".modal").modal('show');

        $('#branchName').val(branchName);
        $('#branchAddress').val(branchAddress)
        $('#txtLat').val(branchLat)
        $('#txtLng').val(branchLng)
        $('#btnCreateBranchAsync').text("Update Branch")

        setTimeout(function () {
            if (map == null || map == undefined) {
                initMap();
            }
            gotoLocation(branchLat, branchLng)
        }, 2000);




    });
}

function createBranch(obj, text) {
    $('#btnCreateBranchAsync').html(loader);
    post(BASE_URL + END_PONT_CREATE_BRANCH, obj,
        function success(json) {
            console.log("====== resposne ========");
            console.log(JSON.stringify(json));

            if (json.success) {
                showToast(json.message);
                $(".modal .close").click()
                getBranches();

            } else {

                showToastError(json.message);

            }
            $('#btnCreateBranchAsync').html(text);

        },
        function error(error) {
            $('#btnCreateBranchAsync').html(text);

            showToastError(ERROR);
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
            iconUrl: BRANCH_IMAG,
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
        iconUrl: BRANCH_IMAG,
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

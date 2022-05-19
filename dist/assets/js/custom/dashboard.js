let userObj = null;
var zoom = 11;
var iconType;

$(document).ready(function () {

	userObj = JSON.parse(persistanceMemoryRetrieve("userInfo"));
	console.log(userObj)
	try {
		if (userObj.userId == undefined || userObj.userId == '') {
			showToastError(NOT_AUTHORIZED)
			navigate(SIGNIN_PAGE);
		}
	} catch (error) {
		showToastError(NOT_AUTHORIZED)
		navigate(SIGNIN_PAGE);
	}
	showToast("Welcome " + userObj.firstName + " " + userObj.lastName);
	setHeader();
	initMap();
	$("#txtBranches").html(loader);
	$("#txtActiveUsers").html(loader);
	$("#txtInActiveUsers").html(loader);
	$("#txtTotalComplaints").html(loader);
	$("#txtInProgressComplaints").html(loader);
	$("#txtResolvedComplaints").html(loader);
	$("#txtRejectedComplaints").html(loader);
	$("#txtPendingComplaints").html(loader);

	get(BASE_URL + END_PONT_GET_COMPANY_STATS + userObj.userId, function success(json) {
		if (json.success) {

			$("#txtBranches").html(json.data[0].activeBranches);
			$("#txtActiveUsers").html(json.data[0].activeUsers);
			$("#txtInActiveUsers").html(json.data[0].inActiveUsers);
			$("#txtTotalComplaints").html(json.data[0].totalComplaints);
			$("#txtInProgressComplaints").html(json.data[0].inProgressComplaints);
			$("#txtResolvedComplaints").html(json.data[0].resolvedComplaints);
			$("#txtRejectedComplaints").html(json.data[0].rejectedComplaints);
			$("#txtPendingComplaints").html(json.data[0].pendingComplaints);



		} else {
			sohwToastError(ERROR);
		}



	}, function error(error) {
		sohwToastError(ERROR);
	});

	$('#dropDownDisplay').on('change', function (e) {
		let filterBy = $('#dropDownDisplay :selected').text()
		$('#dropDownStatus').empty();
		if (filterBy == "Users") {
			$.each(userStatus, function (i, item) {
				$('#dropDownStatus').append($('<option>', {
					value: item.statusId,
					text: item.status
				}));
			});
		}
		if (filterBy == "Branches") {
			$.each(userStatus, function (i, item) {
				$('#dropDownStatus').append($('<option>', {
					value: item.statusId,
					text: item.status
				}));
			});
		}

		if (filterBy == "Complaints") {
			$.each(complaintStatus, function (i, item) {
				$('#dropDownStatus').append($('<option>', {
					value: item.statusId,
					text: item.status
				}));
			});
		}

		if (filterBy == "All") {
			$('#dropDownStatus').empty();

		}
		getLocations(filterBy, "");
	});
	$('#imgCurrentLocation').on('click', function (e) {
		goToCurrentLocation();
	});



	$.each(display, function (i, item) {
		$('#dropDownDisplay').append($('<option>', {
			value: item,
			text: item
		}));
	});


	$('#dropDownStatus').on('change', function (e) {
		let filterBy = $('#dropDownDisplay :selected').text()
		let status = $('#dropDownStatus :selected').val()
		
		getLocations(filterBy, status);
	});
});

function getLocations(filterBy, status) {

	let obj = {
		'userId': userObj.userId,
		'filterBy': filterBy,
		'status': status

	}
	//console.log(obj)
	post(BASE_URL + END_POINT_GET_LOCATIONS, obj, function success(json) {


		if (json.success) {

			$(".leaflet-marker-icon").remove();
			$(".leaflet-popup").remove();
			$.each(json.data.branches, function (i, item) {

				addMarkers(item.lat, item.lng, BRANCH, i == 0 ? true : false)
			});
			$.each(json.data.users, function (i, item) {
				addMarkers(item.lat, item.lng, USERS,  i == 0 ? true : false)
			});
			$.each(json.data.complaints, function (i, item) {
				addMarkers(item.lat, item.lng, COMPLAINT,  i == 0 ? true : false)
			});
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


var map = null;
var marker;
function initMap() {

	map = L.map('map').setView([0, 0], 1);
	L.tileLayer(OPEN_STREET_MAP, {
		attribution: OPNE_STREET_MAP_CONTRIBUTOR

	}).addTo(map);

	map.invalidateSize();

	getLocations("", "");

}
function goToCurrentLocation() {
	if (marker) { map.removeLayer(marker); }
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			var abc = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
			var zoom = 15;

			map.flyTo([lat, lng], zoom, {
				"animate": true,
				"pan": {
					"duration": 10
				}
			});

		}, function (error) {
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
function addMarkers(lat, lng, type, isFocus) {

	if (type == BRANCH) {
		iconType = new L.icon({
			iconUrl: BRANCH_IMAG,
			iconSize: [40, 40]
		})
	}
	if (type == USERS) {
		iconType = new L.icon({
			iconUrl: PERSON_IMAG,
			iconSize: [40, 40]
		})
	}
	if (type == COMPLAINT) {
		iconType = new L.icon({
			// className: 'my-div-icon',
			iconUrl: COMPLAINT_IMAG,
			// html: '<img class="my-div-image" height=10px;width:10px; src="'+COMPLAINT_IMAG+'"/>'+
			// '<span class="my-div-span">RAF Banff Airfield</span>',
			iconSize: [40, 40]
		})
	}

	if (isFocus) {
		map.flyTo([lat, lng], zoom, {
			"animate": true,
			"pan": {
				"duration": 10
			}
		});
	}
	L.marker([lat, lng], { icon: iconType }).addTo(map);


}


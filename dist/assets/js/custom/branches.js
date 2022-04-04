$(document).ready(function () {

    let obj = JSON.parse(persistanceMemoryRetrieve("userInfo"));
    try{
    if (obj.userId == undefined || obj.userId == '') {
        showToastError(NOT_AUTHORIZED)
        navigate(SIGNIN_PAGE);
    }

	}
	catch(error){
	 showToastError(NOT_AUTHORIZED)
        navigate(SIGNIN_PAGE);	
	}
	
	$('.modal-body').css('height', $(window).height());
    $('.modal-body').css('width', $(window).width());
    
    let table = $('#dtBranchesTable').DataTable();

    $("#dtBranches").html(loader);
    get(BASE_URL + END_PONT_GET_COMPANY_BRANCHES,
        function success(json) {
        console.log(JSON.stringify(json));
        var row = "";
        if (json.success) {
            for (let x = 0; x < json.data.length; x++) {
                table.row.add(['<td><a href="a.html">' + json.data[x].branchName + '</a></td>', json.data[x].branchAddress, json.data[x].areaName,
                        json.data[x].cityName, '</td><td> <span class="badge bg-success">Active</span></td>']).draw(false);
                row += '<tr> <td><a style=" text-decoration: underline;" href="">' + json.data[x].branchName + '</a></td><td>' + json.data[x].branchAddress + '</td><td>' + json.data[x].areaName + '</td>	<td>' + json.data[x].cityName + '</td><td> <span class="badge bg-success">Active</span></td> </tr>';
            }

            $("#dtBranchesTable tbody").html(row);
        } else {

            showToastError(ERROR);

        }

    },

        function error() {});



$("#btnCreateBranch").click(function(){
	 showToast("Opening Branch creation");
	 setTimeout(function() {
      initMap();
  }, 2000);
	 
});

   

});
function initMap() {
 var map = L.map('map').setView([0,0],1);
 L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Nq3OKvZqH8jU9LKbrybO',{
	 attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
	 
 }).addTo(map);
map.invalidateSize();
}
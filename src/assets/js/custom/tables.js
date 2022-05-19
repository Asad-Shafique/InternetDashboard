$(document).ready(function(){
	
  SetUserInfo();

	 var allUsers = "http://160.153.251.84/PureNikahAPIs/api/Smart/GetAllUsers?gender=";
 
	var table =  $('#userTbl').DataTable({
		   "ajax": allUsers,
        "columns": [
          {"data":"userId"},
            { "data": "userName" },
            { "data": "currentLocation" },
            { "data": "strapLine" },
           
            { "data": "country" },
            { "data": "maritalStatus" },
			  { "data": "age" },
			   {
        "data": "status",
        "render": function ( data, type, row, meta ) {
console.log(data);
          if (data == '00') {
            return "<span class='badge badge-sm bg-gradient-success'>Active</span>";  // Column will display firstname lastname
 
          }
         else {
            return "<span class='badge badge-sm bg-gradient-danger'>Inactive</span>";  // Column will display firstname lastname
 
          }
        
            // return "<a href='javascript:;' class='text-secondary font-weight-bold text-xs' data-toggle='tooltip' data-original-title='Detail user' id='userDetail'>Detail</a>";  // Column will display firstname lastname
 
        }
    } 
        ],

        "columnDefs": [
          {
              "targets": [ 0 ],
              "visible": false,
              "searchable": false
          }
      ],
		        dataSrc: 'data',
    "paging": true // false to disable pagination (or any other option)
  });
  $('.dataTables_length').addClass('bs-select');

    
	
	
	
	
	
	
	    $("a#userDetail").click(function(){
			alert("show Details");
			
		});
	
	
    $('#userTbl tbody').on('click', 'tr', function () {
      var row = table.row(this).data();
      let user = row.userId;
      window.location.href = 'profile.html?userid='+user;
   debugger;
  });

	






	
    });
	
	

	
$(document).ready(function(){

    let obj = JSON.parse(persistanceMemoryRetrieve("userInfo"));
	try{
    if(obj.userId==undefined||obj.userId==''){
		showToastError(NOT_AUTHORIZED)
		navigate(SIGNIN_PAGE);
	}
	}catch(error){
		showToastError(NOT_AUTHORIZED)
		navigate(SIGNIN_PAGE);
	}
	showToast("Welcome "+obj.firstName+" "+obj.lastName);
   

	 $("#txtBranches").html(loader); 
	 $("#txtActiveUsers").html(loader); 
	 $("#txtInActiveUsers").html(loader); 
	 $("#txtTotalComplaints").html(loader); 
	 $("#txtInProgressComplaints").html(loader); 
	 $("#txtResolvedComplaints").html(loader); 
	 $("#txtRejectedComplaints").html(loader); 
	 $("#txtPendingComplaints").html(loader); 
		
     get(BASE_URL+END_PONT_GET_COMPANY_STATS,function success(json){
		 console.log(JSON.stringify(json));
		 
		 if(json.success){
			 
			  $("#txtBranches").html(json.data[0].activeBranches); 
			  $("#txtActiveUsers").html(json.data[0].activeUsers); 
			  $("#txtInActiveUsers").html(json.data[0].inActiveUsers); 
			  $("#txtTotalComplaints").html(json.data[0].totalComplaints); 
			  $("#txtInProgressComplaints").html(json.data[0].inProgressComplaints); 
			  $("#txtResolvedComplaints").html(json.data[0].resolvedComplaints); 
			  $("#txtRejectedComplaints").html(json.data[0].rejectedComplaints); 
			  $("#txtPendingComplaints").html(json.data[0].pendingComplaints); 
			 
			 
			 
		 }else{
			 sohwToastError(ERROR);
		 }
		 
		 
		 
	 },function error(error){
		 sohwToastError(ERROR);
	 });  
   

 });

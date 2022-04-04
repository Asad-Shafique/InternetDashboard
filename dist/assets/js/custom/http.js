
function get(url,success,error){
	 $.ajax({
		
            url:url,
            type: "GET",
			headers: {
					'companyId':COMPANY_ID
			},
           // Notice! JSONP <-- P (lowercase)
            success:function(json){
          	  success(json)
				
            },
            error:function(error){
				 success(error)
				
				console.log(error);
            }      
       });
	
	
	
	
	
	
}
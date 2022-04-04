
$(document).ready(function(){


      

    var signInUrl=BASE_URL+END_PONT_SIGN_IN;
	$("#btnLogin").click(function(){
    var email = $("#txtEmail").val();
    var pwd = $("#txtPassword").val();
    // Checking for blank fields.
    if( email =='' || pwd ==''){
    $('input[type="text"],input[type="password"]').css("border","2px solid red");
    $('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
    showToast("Please fill all fields.");
    }else {
		
		
		 $("#btnLogin").html(loader);
		
		var obj = {
            "userId": email,
            "password": pwd
         };
       
         $.ajax({
		
            url:signInUrl,
            type: "POST",
			headers: {
					'companyId':COMPANY_ID
			},
        
            data:obj,
            
           // Notice! JSONP <-- P (lowercase)
            success:function(json){
             	if(json.success){
					if(json.data[0].roleType==ROLE_TYPE_BRANCH_TECHNICIAN||
					json.data[0].roleType==ROLE_TYPE_COMPANY_ADMIN||
					json.data[0].roleType==ROLE_TYPE_BRANCH_ADMIN){
					persistanceMemoryStore("userInfo",JSON.stringify(json.data[0]));
             		navigate(DASHBOARD_PAGE);
					}
					else{
					showToastError(NOT_AUTHORIZED);
					 $("#btnLogin").html('Log in');
					}
				
				}else{
					 $("#btnLogin").html('Log in');
					  showToastError(json.message);
				}
				
            },
            error:function(){
				 $("#btnLogin").html('Log in');
		         showToastError("Oops!Something went wrong...");

            }      
       });
  
    }
    });
	
	

	
	
    });
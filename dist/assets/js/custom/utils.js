var loader = '<span id="loader" class="spinner-border spinner-border-sm" role="status" aria-hidden="false" ></span> Loading...';

function setHeader(){
   var obj = JSON.parse(persistanceMemoryRetrieve("userInfo"));
   
    $("#txtAvatar").html(obj.firstName.substring(0,2)); 
	$("#txtName").html(obj.firstName+" "+obj.lastName); 
	$("#txtMobile").html(obj.mobile); 
    $("#menuCompanySettings").css('display','none'); 
    $('#menuLogout').on('click', function (e) {
        persistanceMemoryStore("userInfo",null);
        window.location.href ="auth-login.html";
    });

}


function showToast(msg){
	 Toastify({
        text: msg,
        duration: 3000,
        close:true,
        gravity:"bottom",
        position: "right",
        backgroundColor: "#4fbe87",
    }).showToast();

}
function showToastError(msg){
	 Toastify({
        text: msg,
        duration: 3000,
        close:true,
        gravity:"bottom",
        position: "right",
        backgroundColor: "#a40046",
    }).showToast();

}

function navigate(page)
{
	   window.location.href = page;
				
}

var loader = '<span id="loader" class="spinner-border spinner-border-sm" role="status" aria-hidden="false" ></span> Loading...';


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

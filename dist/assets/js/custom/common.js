
 function persistanceMemoryStore(key,value){
 
  localStorage.setItem(key, value); 

 }

 function persistanceMemoryRetrieve(key){
 
 return localStorage.getItem(key);

 }



 function setCookie(cname, cvalue, exdays) {
   const d = new Date();
   d.setTime(d.getTime() + (exdays*24*60*60*1000));
   let expires = "expires="+ d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  
	
 
}

function getCookie(cname) {
	console.log("cname = "+cname);
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  console.log("decodedCookie="+decodedCookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
		console.log("GetCookies="+c.substring(name.length, c.length));
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function SetUserInfo()
{

var k = JSON.parse(getCookie("userInfo"));


$(".d-sm-inline.d-none").html(k.userName);

}

 
	
    
    $("#logout").click(function(){

      deleteAllCookies();
    });
	

	
    function deleteAllCookies() {
      var cookies = document.cookie.split(";");
  
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

      window.location.href = 'sign-in.html';
  }
    



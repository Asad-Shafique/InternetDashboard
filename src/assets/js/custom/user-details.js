$(document).ready(function(){
	


  
 

   var userId = GetURLParameter('userid');


   var userDetails = "http://160.153.251.84/PureNikahAPIs/api/Smart/GetUsersCompleteDetail?userid="+userId;

   var updateStatus = "http://160.153.251.84/PureNikahAPIs/api/Smart/UpdateUserStatus";

SetUserInfo();


   function StyleSet(name,slideWidth,slideHeight,slideUlWidth){
    $("."+name+".slider").css({"max-width":slideWidth, "height": slideHeight});
    $("."+name+".slider ul").css({"width":slideUlWidth, "margin-left": - slideWidth });
    $("."+name+".slider ul li:last-child").prependTo($("."+name+".slider ul"));
   }



function SlideCount(name){
return $("."+name+".slider ul li").length;
}

function SlideWidth(name){
  return $("."+name+".slider ul li").width();
  }

  function SlideHeight(name){
    return $("."+name+".slider ul li").height();
    }


    function SlideUlWidth(slideCount,slideWidth){
      return slideCount * slideWidth;
      }
  


   function moveLeft(name,slideWidth) {
     $("."+name+".slider ul").stop().animate({
       left: + slideWidth
     },700, function() {
       $("."+name+".slider ul li:last-child").prependTo($("."+name+".slider ul"));
       $("."+name+".slider ul").css("left","");
     });
   }
   
   function moveRight(name,slideWidth) {

    
     $("."+name+".slider ul").stop().animate({
       left: - slideWidth
     },700, function() {
       $("."+name+".slider ul li:first-child").appendTo($("."+name+".slider ul"));
       $("."+name+".slider ul").css("left","");
     });
   }
   
   
   $(".next").on("click",function(){

    var name = $(this).attr('data-name');
    var width = $(this).attr('data-width');

    console.log(name);
     moveRight(name,width);
   });
   
   $(".prev").on("click",function(){
    var name = $(this).attr('data-name');
    var width = $(this).attr('data-width');

    console.log(name);
     moveLeft(name,width);
   });
   
  
	
	

$("#Images-btn").click(function(){
  

  $("div#profile-area").hide();
 $("div#images-area").show();


});
	

$("#Profile-btn").click(function(){
  
  $("div#images-area").hide();
  $("div#profile-area").show();
 


});
	
   






GetUserDetail();
   

function Clean(){
  $(".other.slider").hide();
  $(".selfie.slider").hide();
  $(".doc.slider").hide();
 }
   function GetUserDetail(){
		  
      Clean();


    $.ajax({

       url:userDetails,
       type: "GET",

       
       success:function(json){
           debugger;
   if(json.success){
   
   var data = json.data;
    let generalDetail =  data.GeneralDetail[0];
    let appearanceDetail = data.AppearanceDetail[0];
    let completionDetail = data.CompletionDetail[0];
    let educationDetail = data.EducationDetail[0];
let religionDetail = data.ReligionDetail[0];
let workDetail = data.WorkDetail[0];
let traits = data.traits[0];
let images =data.images[0];


$("h5#userName").html(generalDetail.userName);
$("p#professionalDesc").html(workDetail.professionDesc);



FillGeneralDetails(generalDetail);
FillAppearanceDetails(appearanceDetail);
FillCompletionDetails(completionDetail);
FillEducationDetails(educationDetail);
FillReligiousDetails(religionDetail);
FillWorkDetails(workDetail);
FillImages(data);



 
   }
   
       },
       error:function(){
           alert("Error");
       }      
  });

}
	
	
	
	
function FillAppearanceDetails(appearanceDetail){
  $("<span> "+appearanceDetail.heightId+"</span>").insertAfter("#heigth .text-dark");
    $("<span> "+appearanceDetail.weight+"</span>").insertAfter("#weight .text-dark");
    $("<span> "+appearanceDetail.build+"</span>").insertAfter("#build .text-dark");
    
    $("<span> "+appearanceDetail.hijab+"</span>").insertAfter("#hijab .text-dark");
    
    $("<span> "+appearanceDetail.looks+"</span>").insertAfter("#looks .text-dark");
    
    $("<span> "+appearanceDetail.eyeColour+"</span>").insertAfter("#eye-color .text-dark");
    
    $("<span> "+appearanceDetail.healthProblem+"</span>").insertAfter("#health .text-dark");


    $("<span> "+appearanceDetail.smoke+"</span>").insertAfter("#smoke .text-dark");
    
    $("<span> "+appearanceDetail.beardStyle+"</span>").insertAfter("#beard .text-dark");
}



	function FillGeneralDetails(generalDetail){

    $("<span> "+generalDetail.maritalStatus+"</span>").insertAfter("#marry-status .text-dark");
    $("<span> "+generalDetail.dob+"</span>").insertAfter("#dob .text-dark");
    $("<span> "+generalDetail.lookingFor+"</span>").insertAfter("#lookingfor .text-dark");
    
    $("<span> "+generalDetail.aboutMe+"</span>").insertAfter("#about .text-dark");
    
    $("<span> "+generalDetail.lookingToMarry+"</span>").insertAfter("#lookingtomarry .text-dark");
    
    $("<span> "+generalDetail.lang1+"</span>").insertAfter("#prlang .text-dark");
    
    $("<span> "+generalDetail.lang2+"</span>").insertAfter("#seclang .text-dark");
    
  }


function FillCompletionDetails(completionDetail){
  $("<span> "+completionDetail.isCompleted+"</span>").insertAfter("#completed .text-dark");
  $("<span> "+completionDetail.datetime+"</span>").insertAfter("#completion-time .text-dark");
  $("<span> "+completionDetail.isLinked+"</span>").insertAfter("#islinked .text-dark");
  
  $("<span> "+completionDetail.updatedDatetime+"</span>").insertAfter("#update-time .text-dark");
  
  $("<span> "+completionDetail.linkedDateTime+"</span>").insertAfter("#linked-time .text-dark");
  
  $("<span> "+completionDetail.isPinGenerated+"</span>").insertAfter("#pin-gen .text-dark");
  
  $("<span> "+completionDetail.isVisible+"</span>").insertAfter("#isvisible .text-dark");
  $("<span> "+completionDetail.isActive+"</span>").insertAfter("#isactive .text-dark");
  ChangeActiveStatus(completionDetail);
   
}

function ChangeActiveStatus(obj){
debugger
  if(obj.isActive=='Yes'){
    $("#dropDownId").val(1);
  }
  else{
    $("#dropDownId").val(2);
  }

}

function FillEducationDetails(educationDetail){
  $("<span> "+educationDetail.EducationDesc+"</span>").insertAfter("#edu-desc .text-dark");
  $("<span> "+educationDetail.educationLevelDesc+"</span>").insertAfter("#edu-level .text-dark");
   
}



function FillReligiousDetails(religionDetail) {
  $("<span> "+religionDetail.identify+"</span>").insertAfter("#identify .text-dark");
  $("<span> "+religionDetail.isrevert+"</span>").insertAfter("#revert .text-dark");
   
  $("<span> "+religionDetail.salah+"</span>").insertAfter("#salah .text-dark");
  $("<span> "+religionDetail.favSpeaker+"</span>").insertAfter("#fav-sp .text-dark");
   
  $("<span> "+religionDetail.favIslamicBook+"</span>").insertAfter("#fav-isl-book .text-dark");
  $("<span> "+religionDetail.favIslamicQuote+"</span>").insertAfter("#fav-isl-quo .text-dark");
  $("<span> "+religionDetail.sect+"</span>").insertAfter("#sect .text-dark");


}


function FillWorkDetails(workDetail){
  $("<span> "+workDetail.professionDesc+"</span>").insertAfter("#prof-desc .text-dark");
  $("<span> "+workDetail.jobTitle+"</span>").insertAfter("#job-title .text-dark");
  $("<span> "+workDetail.income+"</span>").insertAfter("#income .text-dark");
   
}

function FillImages(data){

  var imagesSelfie="",otherImages="",docImages="";


  






for(let i =0;i<data.images.length;i++){

  console.log(data.images[i].imageTypeId);
  switch(data.images[i].imageTypeId){

    case "1":
      if(data.images[i].imageUrl!="")
      {
        imagesSelfie+="<li><img style='height:250px;width: 394px;'  src='" + data.images[i].imageUrl + "'></li>";
        
console.log("selfie "+data.images[i].imageUrl);
      }
     
    break;
    case "1001":
      if(data.images[i].imageUrl!="")
      {
        otherImages+="<li><img  style='height:250px;width: 394px;' src='" + data.images[i].imageUrl + "'></li>";
        
        console.log("otherimage "+data.images[i].imageUrl);
      }

     
      break;
      case "2":
        if(data.images[i].imageUrl!="")
        {

          docImages+="<li><img style='height:250px;width: 394px;'  src='" + data.images[i].imageUrl + "'></li>";
          
        console.log("docImages "+data.images[i].imageUrl);
        }

        break;

  }




  
}




if(data.images.some(a=>a.imageTypeId=="1001"))
{
  


let count = SlideCount("other");

let width = SlideWidth("other");


let height = SlideHeight("other");

let UIWidth = SlideUlWidth("other");

StyleSet("other",width,height,UIWidth);


$(".other.slider>a").attr('data-width',width);

$(".other.slider ul").html(otherImages);
  $(".other.slider").show();
}
if(data.images.some(a=>a.imageTypeId=="1"))
{

  var img = data.images.filter(x=>x.imageTypeId=='1')[0].imageUrl;
  

  $("img#avatar").attr("src",img);

let count = SlideCount("selfie");

let width = SlideWidth("selfie");


let height = SlideHeight("selfie");

let UIWidth = SlideUlWidth("selfie");

StyleSet("selfie",width,height,UIWidth);


$(".selfie.slider>a").attr('data-width',width);


$(".selfie.slider ul").html(imagesSelfie);

  $(".selfie.slider").show();
}
if(data.images.some(a=>a.imageTypeId=="2"))
{
 

  
let count = SlideCount("doc");

let width = SlideWidth("doc");


let height = SlideHeight("doc");

let UIWidth = SlideUlWidth("doc");

StyleSet("doc",width,height,UIWidth);
$(".doc.slider>a").attr('data-width',width);
$(".doc.slider ul").html(docImages);

  $(".doc.slider").show();
}


}

    function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}











function ChangeStatus(status){

  var comment = $("#comment").val();
  var status = status;
  var props = {
    "status": status,
    "comment": comment,
    "userId":userId
  };
  
  $.ajax({
  
    url:updateStatus,
    type: "POST",
  
  
    data:props,
    
   // Notice! JSONP <-- P (lowercase)
    success:function(json){
        debugger
  alert(json.message);
        // do stuff with json (in this case an array)
  if(json.success){
  console.log(json);

  window.location.href = 'tables.html';
  }
  
    },
    error:function(){
        alert("Error");
    }      
  });
}














$("#submit").click(function(){

  let val = $('#dropDownId :selected').val();

if(val=="1"){
  ChangeStatus('00');
}
else{
  ChangeStatus('99');
}

});


// var switchStatus = false;
// $("#statusCheck").on('change', function() {
//   debugger
//     if ($(this).is(':checked')) {
//         switchStatus = $(this).is(':checked');
//         console.log(switchStatus);// To verify

//         ChangeStatus('00');
//     }
//     else {
//        switchStatus = $(this).is(':checked');
//        ChangeStatus('99');
//        console.log(switchStatus);// To verify
//     }
// });


	
    });
	
	

	
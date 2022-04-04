$(document).ready(function(){
	
var accountNo=0;


  SetUserInfo();


	 var linkUsers = "http://160.153.251.84/PureNikahAPIs/api/Smart/GetLinkAccounts";
   var linkAccounts = "http://160.153.251.84/PureNikahAPIs/api/Smart/GetBloodRelationDetails?linkAccountId=";
   var updateBlood = "http://160.153.251.84/PureNikahAPIs/api/Smart/UpdateBloodRelation";
 
	var table =  $('#linkTbl').DataTable({
		   "ajax": linkUsers,
        "columns": [
          {"data":"waliName"},
            { "data": "daughterName" },
            {
              "data": "waliConsent",
              "render": function ( data, type, row, meta ) {
      console.log(data);
                if (data == 'Y') {
                  return "<span class='badge badge-sm bg-gradient-success'>Yes</span>";  // Column will display firstname lastname
       
                }
               else {
                  return "<span class='badge badge-sm bg-gradient-danger'>No</span>";  // Column will display firstname lastname
       
                }
              
                  // return "<a href='javascript:;' class='text-secondary font-weight-bold text-xs' data-toggle='tooltip' data-original-title='Detail user' id='userDetail'>Detail</a>";  // Column will display firstname lastname
       
              }
          } ,



          {
            "data": "daughterConsent",
            "render": function ( data, type, row, meta ) {
    console.log(data);
              if (data == 'Y') {
                return "<span class='badge badge-sm bg-gradient-success'>Yes</span>";  // Column will display firstname lastname
     
              }
             else {
                return "<span class='badge badge-sm bg-gradient-danger'>No</span>";  // Column will display firstname lastname
     
              }
            
                // return "<a href='javascript:;' class='text-secondary font-weight-bold text-xs' data-toggle='tooltip' data-original-title='Detail user' id='userDetail'>Detail</a>";  // Column will display firstname lastname
     
            }
        } ,








        {
          "data": "authorized",
          "render": function ( data, type, row, meta ) {
  console.log(data);
            if (data == 'Y') {
              return "<span class='badge badge-sm bg-gradient-success'>Yes</span>";  // Column will display firstname lastname
   
            }
           else {
              return "<span class='badge badge-sm bg-gradient-danger'>No</span>";  // Column will display firstname lastname
   
            }
          
              // return "<a href='javascript:;' class='text-secondary font-weight-bold text-xs' data-toggle='tooltip' data-original-title='Detail user' id='userDetail'>Detail</a>";  // Column will display firstname lastname
   
          }
      } ,




            { "data": "linkDateTime" },
            { "data": "linkAccountId" },
		
        ],

        "columnDefs": [
          {
              "targets": [ 6],
              "visible": false,
              "searchable": false
          }
      ],
		        dataSrc: 'data',
    "paging": true // false to disable pagination (or any other option)
  });
  $('.dataTables_length').addClass('bs-select');

    
	
	
	
	
	
	
	
	
    $('#linkTbl tbody').on('click', 'tr', function () {
      var row = table.row(this).data();
      let acc = row.linkAccountId;
     
      GetLinkAccounts(acc);
   debugger;
  });

	


  $("#LinkAcc-btn").click(function(){
  
    $("#linkaccount-area").show();

    $("#link-detail-area").hide();
  
  
  });
 



  function setAccountLinkInfo(){
    
$("#linkaccount-area").hide();

$("#link-detail-area").show();



  }


  function GetLinkAccounts(acc){
   let accUrl =  linkAccounts+acc;

accountNo = acc;

   $.ajax({

    url:accUrl,
    type: "GET",

    
    success:function(json){
        debugger;

        

   var data = json.data;
   let waliDetails =  data.waliDetails[0];
   let daughterDetails = data.daughterDetails[0];
   let waliImages = data.waliImages;
   let daughterImages = data.daughterImages;
if(json.success){

if(Object.keys(json.data).length>0){
setAccountLinkInfo(json.data);
FillWaliDetails(waliDetails);

FillDaughterDetails(daughterDetails);
FillWaliImages(waliImages);

 FillDaughterImages(daughterImages);
}

}

    },
    error:function(){
        alert("Error");
    }      
});















var  waliSelfieObj = {
 

};

var waliOtherObj = {
 

};


var waliDocObj = {
 

};








var  daughterSelfieObj = {
 

};

var daughterOtherObj = {
 

};


var daughterDocObj = {
 

};

function FillWaliImages(data){


  var imagesSelfie="",otherImages="",docImages="";



for(let i =0;i<data.length;i++){

  console.log(data[i].imageTypeId);
  switch(data[i].imageTypeId){

    case "1":
      if(data[i].imageUrl!="")
      {
     
console.log("selfie "+data[i].imageUrl);
//imagesSelfie+="<li><img style='height:250px;width: 394px;'  src='" + data[i].imageUrl + "'></li>";
$("#wali-self").attr('src',data[0].imageUrl);



      }
     
    break;
    case "1001":
      if(data[i].imageUrl!="")
      {
     
        otherImages+="<li><img  style='height:250px;width: 394px;' src='" + data[i].imageUrl + "'></li>";

        console.log("otherimage "+data[i].imageUrl);
      }

     
      break;
      case "2":
        if(data[i].imageUrl!="")
        {
          docImages+="<li><img style='height:250px;width: 394px;'  src='" + data[i].imageUrl + "'></li>";

        console.log("docImages "+data[i].imageUrl);
        }

        break;

  }




  
}







if(data.some(a=>a.imageTypeId=="1001"))
{
  


let count = SlideCount("wali-other");

let width = SlideWidth("wali-other");


let height = SlideHeight("wali-other");

let UIWidth = SlideUlWidth("wali-other");

StyleSet("wali-other",width,height,UIWidth);


$(".wali-other.slider>a").attr('data-width',width);

$(".wali-other.slider ul").html(otherImages);
  $(".wali-other.slider").show();
}

if(data.some(a=>a.imageTypeId=="2"))
{
 

  
let count = SlideCount("wali-doc");

let width = SlideWidth("wali-doc");


let height = SlideHeight("wali-doc");

let UIWidth = SlideUlWidth("wali-doc");

StyleSet("wali-doc",width,height,UIWidth);
$(".wali-doc.slider>a").attr('data-width',width);
$(".wali-doc.slider ul").html(docImages);

  $(".wali-doc.slider").show();
}





}






function FillDaughterImages(data){



  
  var imagesSelfie="",otherImages="",docImages="";



for(let i =0;i<data.length;i++){

  console.log(data[i].imageTypeId);
  switch(data[i].imageTypeId){

    case "1":
      if(data[i].imageUrl!="")
      {
     
console.log("selfie "+data[i].imageUrl);
//imagesSelfie+="<li><img style='height:250px;width: 394px;'  src='" + data[i].imageUrl + "'></li>";

$("#daughter-self").attr('src',data[0].imageUrl);



      }
     
    break;
    case "1001":
      if(data[i].imageUrl!="")
      {
     
        otherImages+="<li><img  style='height:250px;width: 394px;' src='" + data[i].imageUrl + "'></li>";

        console.log("otherimage "+data[i].imageUrl);
      }

     
      break;
      case "2":
        if(data[i].imageUrl!="")
        {
          docImages+="<li><img style='height:250px;width: 394px;'  src='" + data[i].imageUrl + "'></li>";

        console.log("docImages "+data[i].imageUrl);
        }

        break;

  }




  
}







if(data.some(a=>a.imageTypeId=="1001"))
{
  


let count = SlideCount("daughter-other");

let width = SlideWidth("daughter-other");


let height = SlideHeight("daughter-other");

let UIWidth = SlideUlWidth("daughter-other");

StyleSet("daughter-other",width,height,UIWidth);


$(".daughter-other.slider>a").attr('data-width',width);

$(".daughter-other.slider ul").html(otherImages);
  $(".daughter-other.slider").show();
}

if(data.some(a=>a.imageTypeId=="2"))
{
 

  
let count = SlideCount("daughter-doc");

let width = SlideWidth("daughter-doc");


let height = SlideHeight("daughter-doc");

let UIWidth = SlideUlWidth("daughter-doc");

StyleSet("daughter-doc",width,height,UIWidth);
$(".daughter-doc.slider>a").attr('data-width',width);
$(".daughter-doc.slider ul").html(docImages);

  $(".daughter-doc.slider").show();
}




}









function FillDaughterDetails(daughterDetails){

  $("<span> "+daughterDetails.userName+"</span>").insertAfter("#daughter-name .text-dark");

  
  
  $("<span> "+daughterDetails.age+"</span>").insertAfter("#daughter-age .text-dark");

  $("<span> "+daughterDetails.maritalStatus+"</span>").insertAfter("#daughter-marry-status .text-dark");
  $("<span> "+daughterDetails.dob+"</span>").insertAfter("#daughter-dob .text-dark");
  $("<span> "+daughterDetails.comment+"</span>").insertAfter("#daughter-comment .text-dark");
  
  $("<span> "+daughterDetails.aboutMe+"</span>").insertAfter("#daughter-about .text-dark");
  
  $("<span> "+daughterDetails.lookingToMarry+"</span>").insertAfter("#daughter-lookingtomarry .text-dark");
  
  $("<span> "+daughterDetails.lang1+"</span>").insertAfter("#daughter-prlang .text-dark");
  
  $("<span> "+daughterDetails.lang2+"</span>").insertAfter("#daughter-seclang .text-dark");

  $("<span> "+daughterDetails.aboutMe+"</span>").insertAfter("#daughter-seclang .text-dark");

}



function FillWaliDetails (waliDetails){

  $("<span> "+waliDetails.userName+"</span>").insertAfter("#wali-name .text-dark");

  
  
  $("<span> "+waliDetails.age+"</span>").insertAfter("#wali-age .text-dark");

  $("<span> "+waliDetails.maritalStatus+"</span>").insertAfter("#wali-marry-status .text-dark");
  $("<span> "+waliDetails.dob+"</span>").insertAfter("#wali-dob .text-dark");
  $("<span> "+waliDetails.comment+"</span>").insertAfter("#wali-comment .text-dark");
  
  $("<span> "+waliDetails.aboutMe+"</span>").insertAfter("#wali-about .text-dark");
  
  $("<span> "+waliDetails.lookingToMarry+"</span>").insertAfter("#wali-lookingtomarry .text-dark");
  
  $("<span> "+waliDetails.lang1+"</span>").insertAfter("#wali-prlang .text-dark");
  
  $("<span> "+waliDetails.lang2+"</span>").insertAfter("#wali-seclang .text-dark");

  $("<span> "+waliDetails.aboutMe+"</span>").insertAfter("#wali-seclang .text-dark");
  
}






  }



function fetchDataFromElement(name){


  var k =   $(name).attr("data-val");
  k = JSON.parse(k);

  return k;
}




  
  
 
$(".wali-img-btn").click(function(){

  
  $("#daughter-other-images").hide();
  $("#daughter-doc-images").hide();

  let name = $(this).attr('data-name');

switch(name){

  case "other":

    $("#wali-other-images").show();
    $("#wali-doc-images").hide();
  break;

  case "doc":
    $("#wali-doc-images").show();
    
    $("#wali-other-images").hide();
  break;
}

  $('#exampleModal').modal('toggle');
  $(".stage").show();



});













  $(".daughter-img-btn").click(function(){
    
    $("#wali-other-images").hide();
    
    $("#wali-doc-images").hide();
    let name = $(this).attr('data-name');

switch(name){

  case "other":

    $("#daughter-other-images").show();
    $("#daughter-doc-images").hide();
  break;

  case "doc":
    $("#daughter-doc-images").show();
    $("#daughter-other-images").hide();
  break;
}




    $('#exampleModal').modal('toggle');
    $(".stage").show();

    
  

    
    
    });




























function ChangeStatus(status){

  var comment = $("#comment").val();
  var status = status;
  var props = {
    "status": status,
    "comment": comment,
    "linkAccountId":accountNo
  };
  
  $.ajax({
  
    url:updateBlood,
    type: "POST",
  
  
    data:props,
    
   // Notice! JSONP <-- P (lowercase)
    success:function(json){
        
  alert(json.message);
        // do stuff with json (in this case an array)
  if(json.success){
  console.log(json);
  window.location.href = 'Link-Account.html';



  }
  
    },
    error:function(){
        alert("Error");
    }      
  });
}














$("#submit").click(function(){

  let val = $('#dropDownId :selected').val();

 
    ChangeStatus(val);
 

});





function Clean(){
  //stage clean
  $(".ring.posAb").html("");

}














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
 


	
    });
	
	

	
(function ( $ ) {

  var mangaListObject;
  var source = "mangafox.me";
  var page = 0;
  var searchVal;

  $(document).ready(function(){
    console.log("document ready!");
    $.ajax({
      beforeSend: function(request){
        request.setRequestHeader("X-Mashape-Key", "9bF2fE4br2mshOohWmEcxGeC38Jgp1toGPLjsnWzUL3hxxWvxm");
      },
      url: "https://doodle-manga-scraper.p.mashape.com/" + source + "/search?cover=1",
      dataType:"json",
      success: function(json){
        mangaListObject = json;
        console.log(mangaListObject);
        $.each(mangaListObject, function(index, element){

          //console.log(index);

          if(index > ((-1) + (page * 10)) && index < (10 + (page * 10))){
            $("#mangaThumbnails").append("<div id='imgdiv'> <img id='" + element.mangaId + "' src='" + element.cover + "'/></div>");
          }

        });
      }
    });
  });



  $("#mangaThumbnails").click(function(e){
    console.log("The manga ID is: " + e.target.id);
    if(e.target.id != "mangaThumbnails" && e.target.id != "imgdiv"){
      localStorage.mangaId = e.target.id;
      window.location.href = "index.html"
    }
  });



  $("#search").on("click", function(){
    searchVal = $("#searchBox").val();
    console.log($("#searchBox").val());
    $("#mangaThumbnails").empty();

    $.ajax({
      beforeSend: function(request){
        request.setRequestHeader("X-Mashape-Key", "9bF2fE4br2mshOohWmEcxGeC38Jgp1toGPLjsnWzUL3hxxWvxm");
      },
      url: "https://doodle-manga-scraper.p.mashape.com/" + source + "/search?cover=1&q=" + searchVal,
      dataType:"json",
      success: function(json){
        mangaListObject = json;
        console.log(mangaListObject);
        if($.isEmptyObject(mangaListObject)){

          $("#mangaThumbnails").append("<div id='nothing'>GET CUCKED</div>");

        }else{
          $.each(mangaListObject, function(index, element){

            //console.log(index);

            if(index > ((-1) + (page * 10)) && index < (10 + (page * 10))){
              $("#mangaThumbnails").append("<div id='imgdiv'> <img id='" + element.mangaId + "' src='" + element.cover + "'/></div>");
            }
          });
        }
      }
    });
  });



  $("#nextPage").on("click", function(){
    if(mangaListObject.length > 10){
      $("#mangaThumbnails").empty();
      page+=1;

      $.each(mangaListObject, function(index, element){

        //console.log(index);

        if(index > ((-1) + (page * 10)) && index < (10 + (page * 10))){
          $("#mangaThumbnails").append("<div id='imgdiv'> <img id='" + element.mangaId + "' src='" + element.cover + "'/></div>");
        }
      });
    }
  });



  $("#previousPage").on("click", function(){
    if(mangaListObject.length > 10){
      $("#mangaThumbnails").empty();
      page-=1;

      $.each(mangaListObject, function(index, element){

        //console.log(index);

        if(index > ((-1) + (page * 10)) && index < (10 + (page * 10))){
          $("#mangaThumbnails").append("<div id='imgdiv'> <img id='" + element.mangaId + "' src='" + element.cover + "'/></div>");
        }
      });
    }
  });


}(jQuery));

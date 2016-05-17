(function ( $ ) {

  var mangaListObject;
  var source = "mangareader.net";
  var page = localStorage.indexPage;
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
        $("#currentPage").empty();
        $("#currentPage").append(parseInt(localStorage.indexPage) + 1);
        $.each(mangaListObject, function(index, element){

          //console.log(index);

          if(index > ((-1) + (parseInt(localStorage.indexPage) * 10)) && index < (10 + (parseInt(localStorage.indexPage) * 10))){
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
      window.location.href = "chapters.html"
    }
  });



  $("#search").on("click", function(){
    searchVal = $("#searchBox").val();
    console.log($("#searchBox").val());
    $("#mangaThumbnails").empty();
    $("#searchBox").val("");

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
          localStorage.indexPage = 0;

        }else{
          $.each(mangaListObject, function(index, element){

            //console.log(index);
            localStorage.indexPage = 0;
            $("#currentPage").empty();
            $("#currentPage").append(parseInt(localStorage.indexPage) + 1);

            if(index > ((-1) + (parseInt(localStorage.indexPage) * 10)) && index < (10 + (parseInt(localStorage.indexPage) * 10))){
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
      localStorage.indexPage = parseInt(localStorage.indexPage)+1;

      $.each(mangaListObject, function(index, element){

        //console.log(index);

        if(index > ((-1) + (parseInt(localStorage.indexPage) * 10)) && index < (10 + (parseInt(localStorage.indexPage) * 10))){
          $("#mangaThumbnails").append("<div id='imgdiv'> <img id='" + element.mangaId + "' src='" + element.cover + "'/></div>");
        }
      });
      $("#currentPage").empty();
      $("#currentPage").append(parseInt(localStorage.indexPage) + 1);
    }
  });



  $("#previousPage").on("click", function(){
    if(mangaListObject.length > 10 && parseInt(localStorage.indexPage) != 0){
      $("#mangaThumbnails").empty();
      localStorage.indexPage = parseInt(localStorage.indexPage)-1;

      $.each(mangaListObject, function(index, element){

        //console.log(index);

        if(index > ((-1) + (parseInt(localStorage.indexPage) * 10)) && index < (10 + (parseInt(localStorage.indexPage) * 10))){
          $("#mangaThumbnails").append("<div id='imgdiv'> <img id='" + element.mangaId + "' src='" + element.cover + "'/></div>");
        }
      });
      $("#currentPage").empty();
      $("#currentPage").append(parseInt(localStorage.indexPage) + 1);
    }
  });


}(jQuery));

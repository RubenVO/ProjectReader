(function ( $ ) {

  var mangaListObject;
  var source = "mangafox.me";
  var manga = localStorage.mangaId;
  var page = 0;
  var searchVal;

  $(document).ready(function(){
    console.log("document ready!");

    $.ajax({
      beforeSend: function(request){
        request.setRequestHeader("X-Mashape-Key", "9bF2fE4br2mshOohWmEcxGeC38Jgp1toGPLjsnWzUL3hxxWvxm");
      },
      url: "https://doodle-manga-scraper.p.mashape.com/" + source + "/manga/" + manga,
      dataType:"json",
      success: function(json){
        mangaListObject = json;
        console.log(mangaListObject);

        $("#mangaThumbnails").append("<div id='imgdiv'> <img src='" + mangaListObject.cover + "'/></div>");
        $("#info").append("<p>" + mangaListObject.info + "</p>");

        $.each(mangaListObject.chapters, function(index, element){

            $("#chapters").append("<div id='chapter'><div id='chapterIndex'>" + element.chapterId + "</div><div id='chapterName'>" + element.name + "</div></div>");

        });

      }
    });
  });



  $("#mangaThumbnails").click(function(e){
    console.log("The manga ID is: " + e.target.id);
    if(e.target.id != "mangaThumbnails" && e.target.id != "imgdiv"){
      localStorage.mangaId = e.target.id;
      window.location.href = "reader.html"
    }
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
    if(mangaListObject.length > 10 && page != 0){
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

(function ( $ ) {

    // TODO: -Browse manga
    //       -Search manga
    //       -Follow manga
    //       -Manga page
    //          -make "getManga" function that returns manga info and chapter count
    //       -Actual layout Kappa

    //global variables
    var chapterObject;
    var source = "mangafox.me";
    var manga = localStorage.mangaId;
    var chapter = 1;
    var currentPage;

    /*gets chapter info + displays first page
    *
    *object syntax:
    *   {href:"mangaLink", name: "mangaName", pages: Array[x], lastUpdate: "date"}
    *
    *objects in array syntax:
    *   x: {pageId: x, url: "imgLink"}
    *   where x is array index
    *
    *   TODO: -make temp buttons dissapear when reading
    *         -create back button
    */
    $(document).ready(function(){
      console.log("doc ready!");
      $.ajax({
        beforeSend: function(request){
          request.setRequestHeader("X-Mashape-Key", "9bF2fE4br2mshOohWmEcxGeC38Jgp1toGPLjsnWzUL3hxxWvxm");
        },
        url: "https://doodle-manga-scraper.p.mashape.com/" + source + "/manga/" + manga + "/" + chapter,
        dataType:"json",
        success: function(json){
          chapterObject = json;
          console.log(chapterObject);
          $("#imgdiv").append("<img src='" + chapterObject.pages[0].url + "' />")
          currentPage = 1;
        }
      });
    });

    /*gets next page of current manga chapter
    *
    *   TODO: -check for chapter length
    *         -invoke getChapter function for next chapter on chapter end
    *         -
    */
    $("#imgdiv").on("click", function(){
      console.log("you clicked the nextPage button!");
      $("#imgdiv img").attr("src", chapterObject.pages[currentPage + 1].url);
      currentPage += 1;
    });


}(jQuery));

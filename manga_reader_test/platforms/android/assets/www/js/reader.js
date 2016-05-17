(function ( $ ) {

    // TODO: -Browse manga CHECK
    //       -Search manga CHECK
    //       -Follow manga
    //       -Manga page CHECK
    //          -make "getManga" function that returns manga info and chapter count
    //       -Actual layout Kappa

    //global variables
    var chapterObject;
    var source = "mangareader.net";
    var manga = localStorage.mangaId;
    var chapter = localStorage.chapterId;
    var intChapter = parseInt(localStorage.chapterId);
    var page = 0;

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
      console.log("Selected manga: " + localStorage.mangaId);
      console.log("Selected chapter: " + localStorage.chapterId);
      $.ajax({
        beforeSend: function(request){
          request.setRequestHeader("X-Mashape-Key", "9bF2fE4br2mshOohWmEcxGeC38Jgp1toGPLjsnWzUL3hxxWvxm");
        },
        url: "https://doodle-manga-scraper.p.mashape.com/" + source + "/manga/" + manga + "/" + intChapter,
        dataType:"json",
        success: function(json){
          chapterObject = json;
          console.log(chapterObject);
          $("#imgdiv").append("<img src='" + chapterObject.pages[page].url + "' />");
        }
      });
    });

    /*gets next page of current manga chapter
    *
    *   TODO: -check for chapter length
    *         -invoke getChapter function for next chapter on chapter end
    *         -
    */
    $("#imgdiv").on("swipeleft", function(){

      if(page == chapterObject.pages.length - 1){
        $("#imgdiv").empty();
        intChapter += 1;
        page = 0;
        console.log(intChapter);
        $.ajax({
          beforeSend: function(request){
            request.setRequestHeader("X-Mashape-Key", "9bF2fE4br2mshOohWmEcxGeC38Jgp1toGPLjsnWzUL3hxxWvxm");
          },
          url: "https://doodle-manga-scraper.p.mashape.com/" + source + "/manga/" + manga + "/" + intChapter,
          dataType:"json",
          success: function(json){
            chapterObject = json;
            console.log(chapterObject);
            console.log(page);
            $("#imgdiv").append("<img src='" + chapterObject.pages[0].url + "' />");
          }
        });
      }else{

        console.log("you clicked the nextPage button!");
        //console.log(chapterObject.pages.length);
        page += 1;

        console.log(page);
        $("#imgdiv img").attr("src", chapterObject.pages[page].url);

      }
    });



    $("#imgdiv").on("swiperight", function(){

      if(page == 0){
        $("#imgdiv").empty();
        intChapter -= 1;
        console.log(intChapter);
        $.ajax({
          beforeSend: function(request){
            request.setRequestHeader("X-Mashape-Key", "9bF2fE4br2mshOohWmEcxGeC38Jgp1toGPLjsnWzUL3hxxWvxm");
          },
          url: "https://doodle-manga-scraper.p.mashape.com/" + source + "/manga/" + manga + "/" + intChapter,
          dataType:"json",
          success: function(json){
            chapterObject = json;
            console.log(chapterObject);
            //console.log(chapterObject.pages.length);
            $("#imgdiv").append("<img src='" + chapterObject.pages[chapterObject.pages.length - 1].url + "' />");
            page = chapterObject.pages.length - 1;
          }
        });
      }else{

        console.log("you clicked the nextPage button!");
        //console.log(chapterObject.pages.length);
        page -= 1;

        console.log(page);
        $("#imgdiv img").attr("src", chapterObject.pages[page].url);

      }
    });


}(jQuery));

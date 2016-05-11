(function ( $ ) {
    $("#getpage").click(function(){
      console.log("you clicked the getpage button!");
      $.ajax({
        beforeSend: function(request){
          request.setRequestHeader("X-Mashape-Key", "9bF2fE4br2mshOohWmEcxGeC38Jgp1toGPLjsnWzUL3hxxWvxm");
        },
        url: "https://doodle-manga-scraper.p.mashape.com/mangafox.me/manga/naruto/1",
        dataType:"json",
        success: function(json){
          console.log(json);
          $("#imgdiv").prepend("<img src='" + json.pages[0].url + "' />")
        }
      });
    });
}(jQuery));

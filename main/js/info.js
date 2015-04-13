$(function() {
      $("#search-txt").on("keypress", function(e) {
        if (e.which === 13) {
          e.preventDefault();
          $("#search-btn").trigger("click");
        }
      });
      $("#search-btn").on("click", function() {
        $("#video-data-1, #video-data-2").empty();
        var videoid = $("#search-txt").val();
        var matches = videoid.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i);
        if (matches) {
          videoid = matches[1];
        }
        if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
          $("<p style='color: #F00;'>Unable to parse Video ID/URL.</p>").appendTo("#video-data-1");
          return;
        }
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+video_id+'?v=2&alt=json',function(data,status,xhr){
    alert(data.data.title);
});
          $("<h1></h1>").text(data.data.title).appendTo("#video-data-1");
          
        };




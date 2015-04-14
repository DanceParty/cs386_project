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
        var matches = videoid.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i) || videoid.match(/^https:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^https:\/\/youtu\.be\/([^?]+)/i);
        if (matches) {
          videoid = matches[1];
        }
        if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
          $("<p style='color: #F00;'>Unable to parse Video ID/URL.</p>").appendTo("#video-data-1");
          return;
        }
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+videoid +'?v=2&alt=json',function(data,status,xhr){
    
    
		 var sanitizeTitle = function(title){
						var _has = function(char) { return title.indexOf(char) !== -1 }
						var cleanTitle = title;
						if (_has('(') || _has('[') || _has('{')){
							var matches = title.match(/\(.*\)|\[.*\]|\{.*\}/);
							if (matches.length > 0) {
								for ( var i in matches ){
									cleanTitle = title.replace(/\(.*\)|\[.*\]|\{.*\}/, '').replace(/ - /, ' ').replace(/-/, ' ');
								}
							}
						}
						return cleanTitle;
					};
					
		
		var songTitle = sanitizeTitle(data.entry.title.$t);
		//Test 3
		if (songTitle === data.entry.title.$t) {
            return; 
        }
		var url1 = 'https://api.spotify.com/v1/search?type=track&query=' + songTitle;
		var url = url1.split(' ').join('+');		
		
		//Test 4
		if(url1 === url){
			return;
		}
		
		$.get(url, function(data){
			var spotifyResponse = data;
			var link = data.tracks.items[0].uri;
			
			$("#para").append("<a href='" + link +"' target='_blank'> Open in Spotify</a>");
			
			//Test 5
			if( link === null){
				return;
			}
		});
		
});
         
});
          
          
        });
	
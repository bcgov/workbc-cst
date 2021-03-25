// <!-- Snowplow starts plowing - Standalone vE.2.14.0 -->
;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","https://www2.gov.bc.ca/StaticWebResources/static/sp/sp-2-14-0.js","snowplow"));
var collector = 'spm.apps.gov.bc.ca';
window.snowplow('newTracker','rt',collector, {
    appId: "Snowplow_standalone_WorkBC",
    cookieLifetime: 86400 * 548,
    platform: 'web',
    post: true,
    forceSecureTracker: true,
    contexts: {
    webPage: true,
    performanceTiming: true
    }
});

window.snowplow('enableActivityTracking', 30, 30); // Ping every 30 seconds after 30 seconds
window.snowplow('enableLinkClickTracking');
window.snowplow('trackPageView');

// Each iFrame must have the JS Api enabled by appending 
// 'enablejsapi=1' to the src URL parameters. Ex:
// "https://www.youtube.com/embed/G9NL-ED0xdQ?enablejsapi=1"

// Gets called when the youtube player changes state, and sends
// and triggers a snowplow event with player status info.
function onPlayerStateChange(event) {
  var player_info = {
    status: '', 
    video_id: event.target.getVideoData().video_id,
    video_src: event.target.getVideoUrl(),
    title: event.target.getVideoData().title,
    author: event.target.getVideoData().author
  };
  
  switch(event.data) {
    case YT.PlayerState.PLAYING:
      player_info.status = 'Playing';
      track_youtube_player(player_info);
      break;
    case YT.PlayerState.PAUSED:
      player_info.status = 'Paused';
      track_youtube_player(player_info);
      break;
    case YT.PlayerState.ENDED:
      player_info.status = 'Ended';
      track_youtube_player(player_info);
      break;
    default:
      return;
  }
}

// Creates new youtube player object when the API loads and attaches the two 
// callbacks, onReady and onStateChange. Alternatively, if you are already
// creating the player object elsewhere in your code, you can add the two
// event callbacks at that time.
function onYouTubeIframeAPIReady() {
  
  // Retrieve each iFrame by classname.
  // Replace "class-name" with your iFrame classname.
  var yt_players = Array.from(document.getElementsByClassName("youtube_player"));
  
  // Create a new Player object for each Player iframe 
  yt_players.forEach(function(item){
    player = new YT.Player(item.id, {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  })
}

// This gets called when the youtube player is ready.
function onPlayerReady(event) {
  var player_info = {
    status: 'Ready', 
    video_id: event.target.getVideoData().video_id,
    video_src: event.target.getVideoUrl(),
    title: event.target.getVideoData().title,
    author: event.target.getVideoData().author
  };
  track_youtube_player(player_info);
}

// Sends snowplow event with youtube player state.
function track_youtube_player(player_info) {
  window.snowplow('trackSelfDescribingEvent', {
    schema: "iglu:ca.bc.gov.youtube/youtube_playerstate/jsonschema/3-0-0",
    data: {
      status: player_info.status,
      video_src: player_info.video_src,
      video_id: player_info.video_id,
      title: player_info.title,
      author: player_info.author
    }
  });
}




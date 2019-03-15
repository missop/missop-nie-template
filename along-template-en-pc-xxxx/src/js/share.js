var shareEvent = function() {
  var share_config = {
    'title': $('#share_title').html(),
    'link': $('#share_url').html(),
    'pic': $('#share_pic').attr('src'),
    'desc': $('#share_desc').html()
  };
  var _uri = 'https://twitter.com/share?url=' + encodeURIComponent(share_config.link) + '&text=' + encodeURIComponent(share_config.desc);
  //facebook
  $(".Jfacebook").on("click", function() {
    window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(share_config.link)+
        "&picture="+encodeURIComponent(share_config.pic)+
        "&description="+encodeURIComponent(share_config.desc)+
        "&title="+encodeURIComponent(share_config.title)+
        "&display=popup&ref=plugin&src=share_button","facebook","height=500, width=750, top="+($(window).height()/2-250)+", left=" + (document.body.offsetWidth/2-375)+", toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
  });
  //twitter
  $(".Jtwitter").on("click", function() {
    window.open(_uri,"twiiter","height=300, width=600, top="+($(window).height()/2-250)+", left=" + (document.body.offsetWidth/2-375)+", toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
  });
};
shareEvent();
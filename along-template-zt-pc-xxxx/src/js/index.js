nie.config.copyRight.setWhite();
nie.define(function () {
  var PopDialog = nie.require("nie.util.PopDialog");
  var fn = {
    init: function () {
      this.bind();
    },
    bind: function () {

    },
    bindVideo: function () {
      $('.wrap').on('click', '.video-play', function () {
        var vurl = $(this).data("src");
        if (!vurl) {
          alert('敬请期待');
          return
        }
        $('#video-box').html('<video controls="controls" src="' + vurl + '" width="100%" height="100%" autoplay="autoplay"></video>');
        $("#videoPop").addClass('on');
        $(".zzc").addClass("on");
        $('#video-box video')[0].play();
      });
      $('.video-close').on('click', function () {
        $("#videoPop").removeClass('on');
        $('#video-box').html('');
        $(".zzc").removeClass("on");
      });
    }
  };
  fn.init();
});

nie.define("Index", function () {
  __inline('utils.js');
  var fn = {
    _init: function () {
      this.initContainer();
      this.videoPop();
      this.bind();
    },
    bind: function () {

    },
    initContainer: function () {
      var main = new Swiper('#swiper1', {
        direction: 'vertical',
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        resistanceRatio: 0
      });
      $('.btn-toTop').on('click', function () {
        main.slideTo(0, 0);
      });

      fixSingleScreenBug(main);
    },
    videoPop: function () {
      $(".video-play").click(function () {
        var vurl = $(this).data("src");
        $('#video-box').html('<video controls="controls" src="' + vurl + '" width="100%" height="100%" autoplay="autoplay"></video>');
        $("#videoPop").addClass('on');
        $(".Layer").addClass("on");
        $('#video-box video')[0].play();
      });
      $('.video-close').on('click', function () {
        $("#videoPop").removeClass('on');
        $('#video-box').html('');
        $(".Layer").removeClass("on");
      });
    }
  };
  fn._init();
});

nie.define("Index", function () {
    var fn = {
        _init: function () {
            this.featureSwiper();
            this.videoPop();
            this.bind();
        },
        bind: function () {

        },
        featureSwiper: function () {

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

nie.define('Index', function () {
  var PopDialog = nie.require("nie.util.PopDialog");
  var alert = PopDialog.Alert;
  var fn = {
    init: function () {

    },
    featureSwiper: function (id, parentClass) {
      var base = {
        effect: 'fade',
        fade: {
          crossFade: true
        },
        autoplay: 8000,
        autoplayDisableOnInteraction: false,
        pagination: parentClass + ' .swiper-pagination',
        paginationClickable: true,
        prevButton: parentClass + ' .swiper-button-prev',
        nextButton: parentClass + ' .swiper-button-next'
      };
      return new Swiper(id, base);
    },
    /*填写信息*/
    _submit_info: function () {
      function submit(params) {
        api.submit_info(
            params,
            function () {
              alert('提交成功！');
              fn.hidePop($('.pop'));
              $('.pop input').val('');
            }
        )
      }

      function getVal(obj) {
        return $(obj).val().trim()
      }

      // 实物奖励
      $('.pop-info1').on('click', '.btn-submit', function () {
        var addr = getVal('.j_addr'), name = getVal('.in-name'), cell = getVal('.j_cell');
        if (!name) {
          alert('请填写姓名！');
        } else if (!cell) {
          alert('请填写手机号码！')
        } else if (!ca.fn.validPhone(cell)) {
          alert('手机号码格式不正确！')
        } else if (!addr) {
          alert('请填写邮寄地址！');
        } else {
          submit({
            phone: cell,
            address: addr,
            name: name,
            game: 19
          })
        }
      });
    },
    bindVideo: function () {
      var needVideo = ca.fn.queryString('video')
      if (needVideo) {
        $('.video-play').addClass('on');
      }
      $('.wrap').on('click', '.video-play', function () {
        var vurl = $(this).data("src");
        if (!vurl) {
          alert('敬请期待');
          return
        }
        $('#video-box').html('<video controls="controls" src="' + vurl + '" width="100%" height="100%" autoplay="autoplay"></video>');
        $("#videoPop").addClass('on');
        $('#video-box video')[0].play();
        $(".zzc").addClass("on");
      });
      $('.video-close').on('click', function () {
        $("#videoPop").removeClass('on');
        $('#video-box').html('');
        $(".zzc").removeClass("on");
      });
    },
    showPop: function (obj) {
      $('.zzc').addClass('on');
      $(obj).addClass('on');
    },
    hidePop: function (obj) {
      $('.zzc').removeClass('on');
      obj.removeClass('on');
    }
  };
  fn.init();
});
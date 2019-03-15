nie.config.copyRight.setWhite();
nie.define(function () {
  var PopDialog = nie.require("nie.util.PopDialog"),
      videoModule = nie.require("nie.util.videoV2"),
      $popbg = $('.Layer');
  window.alert = window.PopDialog.Alert;
  __inline('share.js');
  var page = {
    init: function () {

    },
    showFixed: function (cls) {
      $(cls).show();
      $popbg.addClass('on');
    },
    hidePop: function () {
      $popbg.removeClass("on");
      $('.pop').hide();
    }
  };
  page.init();
});
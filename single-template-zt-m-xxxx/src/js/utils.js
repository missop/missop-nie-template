function adapt(content) {
  var startH = $(window).height();
  var Timer = null;
  Timer = setInterval(function () {
    var newH = $(window).height();
    if (startH > newH && window.orientation == 0) {
      $('.container').height(newH);
      $('#main_box').height(newH);
      setTimeout(function () {
        content.update();
      }, 20);

      clearInterval(Timer);
    }
    startH = newH;
  }, 300);
}

function fixSingleScreenBug(content) {
  setTimeout(function () {
    content.update();
  }, 300);
  if (ca.fn.isWeiXin()) {
    adapt();
  }
}
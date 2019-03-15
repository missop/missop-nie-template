var host1 = 'https://mumu-game-prize.webapp.163.com'
var gameID = 19

// ca.debug(true)
/*下载*/
function downloading(success, error) {
  return ca.remote._doAjax(
      host1 + '/download',
      {
        game: gameID
      },
      success,
      error
  );
}

/*分享*/
function sharing(success, error) {
  return ca.remote._doAjax(
      host1 + '/share',
      {
        game: gameID
      },
      success,
      error
  );
}

/*抽奖记录*/
function prize_record(success, error) {
  if (ca.debug()) {
    return ca.remote._fakeAjax(success, {
      status: true, // 是否成功
      msg: "" // 具体错误信息（中文，unicode），success为false时返回
    });
  } else {
    return ca.remote._doAjax(
        host1 + '/prize_record',
        {
          game: gameID
        },
        success,
        error
    );
  }
}

/*提交信息*/
function submit_info(params, success, error) {
  return ca.remote._doAjax(
      host1 + '/submit_info',
      params,
      success,
      error
  );
}

/*抽奖*/
function draw(success, error) {
  if (ca.debug()) {
    return ca.remote._fakeAjax(success, {
      status: true, // 是否成功
      msg: "" // 具体错误信息（中文，unicode），success为false时返回
    });
  } else {
    return ca.remote._doAjax(
        host1 + '/draw',
        {
          game: gameID
        },
        success,
        error
    );
  }
}
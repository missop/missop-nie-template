nie.define("share", function () {
    var share = nie.require("nie.util.mobiShare2"),
        shareTitle = $("#share_title").html(),
        shareTxt = $("#share_desc").html(),
        sharePic = $("#share_pic").attr('data-src');

    var _initShare = function () {//初始化分享组件
        MobileShare.init({
            title: shareTitle,//分享标题
            desc: shareTxt,//分享正文
            url: location.href,//分享URL
            imgurl: sharePic,//分享图片
            // circleTitle:title,//分享到朋友圈的标题。不填则与title一致
            guideText: "点击上方<br/>分享到朋友圈哦~",//微信中点分享按钮显示的分享引导语
            qrcodeIcon: __uri(''),//二维码图标
            shareCallback: function (res) {//微信易信分享回调res=｛type:0,res:[微信返回的提示]｝res.type：0表示取消，-1：分享失败，1：分享到朋友圈，2：分享给好友，3：QQ，4：微博。易信只返回1或2两种情况。

            },
            wxSdkCallback: function () {//微信sdk加载完成后回调，可在此回调中调用微信JS-SDK的其他API,如上传图片等。

            }
        });
        $("#btn_share").click(function (e) {//分享按钮绑定点事件，显示分享弹层
            MobileShare.showShare();
        })
    }

    var _initAttention = function () {//初始化关注公众号弹层
        $("#btn_attention,.btn_attention").bind("click", function (e) {
            $("#md_attention").show();
            var st = setTimeout(function () {
                $("#md_attention").addClass("show");
            }, 50)
        });
        $("#md_attention").bind("click", function (e) {
            $("#md_attention").removeClass("show");
            var st = setTimeout(function () {
                $("#md_attention").hide();
            }, 300);
        })
        !!$("#md_attention")[0] && $("#md_attention")[0].addEventListener("touchmove", function (e) {
            e.preventDefault();
        }, false);
    };


    var _initPage = function () {//官网通用页面初始化处理
        _initShare();
        _initAttention();
    }
    _initPage();
});
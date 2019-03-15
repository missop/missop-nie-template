nie.define("sharetest", function() {
	var shareTitle = $("#share_title").html(),
		shareDesc = $("#share_desc").html(),
		shareImg = $("#share_img").attr('src'),
		shareUrl = $("#share_url").html(),
		shareV5 = nie.require("nie.util.shareV5"),
		share = shareV5({
            fat: "#NIE-share",
            type: 1,
            defShow: [22,8,23,2,1,24],
            title: shareTitle,
            img: shareImg,
            content: shareDesc
    });
});

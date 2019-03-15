nie.define("sharetest", function() {
	var shareTitle = $("#share_title").html(),
		shareDesc = $("#share_desc").html(),
		shareImg = $("#share_img").attr('src'),
		shareV5 = nie.require("nie.util.shareV5"),
		share = shareV5({
			fat: "#share",
			type: 1,
			defShow: [23, 22, 2, 1, 3,24],
			title: shareTitle,
			img: shareImg,
			content: shareDesc
		});
		
		
});
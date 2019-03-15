/*********公用基础变量更换*************/
    //注意1.更换的是对应变量的值，变量名不可更换
    //注意2.部分变量值是根据已有的变量值来确定的，这部分变量值不允许更换(以下有相关说明)

    // var baseurl = "http://test.tc.netease.com/xylive/";//测试地址
var baseurl = "https://live.game.163.com/xylive/";  //正式地址
var product = "sv"
var productname = "sv"
var liveId = 90;//直播间id
var firsttimeView = 1;//第一次打开页面
var liveIdstate = true;
var phonestate = true;//是否需要填写手机号
var serverstate = false;//是否需要收集游戏服务器和游戏角色等信息
var danmushowstate = true;//是否加载弹幕(true加载，false不加载)
//////////无其他情况该部分变量值不要更换///////////////

var username = product + "_username_" + "svlive"; //保存在localstorage的名称
var headimage = product + "_headimage_" + "svlive"; //保存在localstorage的头像
var giftcontent = ethdata.tool;//礼物相关变量名
var emojilist = ethdata.emotion;//表情相关变量名
var headimagenuber = ethdata.headimg;//头像相关变量名
var videosrc = "";//直播地址

//////////////////////////////////////////////////////////


//////该部分是对应的另一个直播间的变量值参数（一般用于向策划提问，问题竞猜，需要配置两个直播间的时候才用）///////

var liveId_2 = 148; //策划提问接入的直播
var username_2 = product + "_username_" + liveId_2; //保存在localstorage的名称
var headimage_2 = product + "_headimage_" + liveId_2; //保存在localstorage的头像

//////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//该部分变量可根据所指定的直播间来修改对应的后缀liveId    (例如向直播间122收集，填写liveId.  向直播间148收集，填写liveId_2)
var phone = product + "_phone_" + liveId_2; //保存在localstorage的phone
var server = product + "_server_" + liveId_2; //保存在localstorage的server
var roleId = product + "_region_" + liveId_2; //保存在localstorage的roleId

/////////////////////////////////////////////////////////////////////////

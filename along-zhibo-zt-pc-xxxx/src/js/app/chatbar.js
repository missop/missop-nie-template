nie.define("live", function() {
    //如果是测试环境，__DEBUG为true，否则为false
    if(__DEBUG) {
    }
    //获取cdn-path或者cdn-path-release的值，具体要看是测试或者发布环境

    ///////////引入的相关组件
    var img = __CDNPATH + "images/1.jpg";
    var FormCheck = nie.require("nie.util.FormCheck");
    var flash = nie.require("util.swfobject");
    ///////////////////////////

    function Init() {
        //启动cc直播
        startvediolive()//获取后台直播地址和相关配置
        // 二维码显示
        qrcode()
        //设置个人头像
        setpersonalinfor();

        //自定义关闭弹窗
        /*
        $(".closepop ").click(function() {
            $(".mask").hide();
            $(".popwin").hide();
            $(".imgpop").hide();
            $(".videopop").hide();
        })
        */

        ////////////////////////////////////
        //    滚动到视频直播区
        ////////////////////////////////////
        setTimeout(function() {
            if($(window).scrollTop() == 0) {
                //$('body,html').animate({ scrollTop: 850 }, 500);
            }
            ///////////////////多少秒之后开始滚动    
        }, 1500)
    }

    function startvediolive() {
        $.ajax({
            url: baseurl + "live/config.do",
            dataType: "jsonp",
            data: {
                liveId: liveId,
                type: 1
            },
            jsonp: "callback",
            type: "get",
            success: function(data) {
                if(data){
                    $("#Jlinve").html("")
                    if(/ipad/i.test(navigator.userAgent.toLowerCase()) == true) {
                        $("#Jlinve").html(' <video autoplay="autoplay" preload="auto" controls="controls" webkit-playsinline="" id="video_xianchang"><source src="'+data.ccMCode+'"></source></video>')
                    } else {
                        $('#Jlinve').flash({
                            swf: data.ccCode,
                            width: 900,
                            height: 542,
                            allowFullScreen: true,
                            allowScriptAccess: 'always',
                            wmode: 'opaque',
                            base: '.', //该参数不可少，否则直播无法出来
                            autoPlay: true
                        });
                    }
                }
            }
        });
    }

    function qrcode() {

        $(".scan").hover(function() {
            $("#qrcode1").show()
        }, function() {
            $("#qrcode1").hide()
        })
    }

    function setpersonalinfor() {

        if(!window.localStorage) {
            //直接出弹窗选择头像和内容
            $(".textlive").hide();
            $("#chat").hide();
            $("#qrcodeforphone").show();

        } else {
            //读取localstorage里面的头像和昵称
            var storage = window.localStorage;

            if(storage.firsttimeView) {
                firsttimeView = storage.firsttimeView
            } else {
                storage.firsttimeView = 0;
            }

        }
    }

    Init()
    if((navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") || (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.")) {
        $(".textlive").hide();
        $("#chat").hide();
        $("#qrcodeforphone").show();
        $(".book").hide()
        $("#qrcode1").addClass('on');
        $("#mobilecode").addClass('lowie');
    } else {
        liveM = new Vue({
            el: "#main",
            data: {
                productname:productname,
                product:product,
                //配置相关
                startTime: "",
                endTime: "",
                intro: "",
                headImage: "",
                title: "",
                onlineNum: 100,
                videosrc:"",//当前需要播放的小视频源
                //策划和图文直播状态切换
                livestate: true,

                //聊天室相关
                countdown: 0,
                countdowntimeout:null,
                comdata: [],
                comend: 0,
                comstart: 0,
                chatcontent: "",
                chatcontent_last: [0, 0, 0, 0, 0],

                showlist: {
                    quickmsg: false,
                    gift: false,
                    emoji: false
                },

                //弹幕相关
                danmushow: false, //////   hasBarrage 改成0就不从后台加载弹幕内容
                danmushowstate:danmushowstate,
                //用户信息相关
                personalinfo:{
                    show:false,
                    selectedheadming:headimagenuber.init+1+"."+headimagenuber.type,
                    headimgNumber:headimagenuber,
                    nikename: "",
                    nikephone: "",
                    server:"",
                    roleId:"",
                    errmsg: "",
                    afteraction: ""
                },
                showimg:{
                    show:false
                },
                videopop:{
                    show:false
                },
                //弹幕相关

                //互动问题相关
                answerquestion:{
                    show:false,
                    title:"",
                    desc:"",
                    content:"",
                    error:""
                },
                phonestate:phonestate,//是否填写手机号（默认填写）
                serverstate:serverstate,//是否填写服务器相关信息
                inputmessage:"",
                storagestatus:true,
                giftcontent:giftcontent,//道具
                emojilist:emojilist//表情
            },
            watch: {
                comdata: function(val, oldVal) {
                    if(this.comdata.length > 500) {
                        this.comdata.splice(500, 100)
                    }
                    if(this.comdata.length > 0) {
                        this.comstart = this.comdata[this.comdata.length - 1].id;
                        this.comend = this.comdata[0].id;
                    }
                },
                countdown: function () {
                    var that = this;

                    if (this.countdown > 0 && this.countdown <= 15) {
                        that.countdowntimeout = setTimeout(function () {
                            that.countdown = that.countdown - 1
                        }, 1000)
                    } else {
                        clearTimeout(that.countdowntimeout);
                        that.countdowntimeout=null;
                        that.countdown = 0;
                    }
                }
            },
            computed: {
                maskshow: function () {
                    var that = this
                    return that.personalinfo.show || that.answerquestion.show
                }
            },
            created: function() {
                var that = this

                /* 获取评论内容 */
                $.ajax({
                    url: baseurl + "live/comment.do",
                    dataType: "jsonp",
                    data: {
                        liveId: liveId,
                        stand: 0
                    },
                    jsonp: "callback",
                    type: "get",
                    success: function(resp) {
                        that.comdata = resp.comdata;
                        that.onlineNum = resp.onlinenum;
                    }
                })



                /*获取配置*/
                $.ajax({
                    url: baseurl + "live/config.do",
                    dataType: "jsonp",
                    data: {
                        liveId: liveId,
                        type: firsttimeView
                    },
                    jsonp: "callback",
                    type: "get",
                    success: function(resp) {
                        that.endTime = resp.endTime;
                        that.startTime = resp.startTime;
                        that.tilte = resp.title;
                        that.headImage = resp.headImage;
                        that.intro = resp.intro;
                    }
                })

                //清楚弹幕
                if(that.danmushowstate){
                    var clearbar = window.setInterval(function() {
                        var len = $(".danmu li").length;

                        $(".danmu").find("li").each(function() {
                            var left = parseInt($(this).css("left"));
                            if(left <= -875) {
                                $(this).remove();
                            }
                        });
                    }, 5 * 1000);
                    var timebar = window.setInterval(function() {
                        if(that.danmushow){
                            that.getbarrage();
                        }
                    }, 5 * 1000);
                }
                var timecom = window.setInterval(function() {
                    that.addcommore();
                }, 5 * 1000);

                $(".c_content_1").scroll(function() {

                    if($(".c_content_1").scrollTop() + $(".c_content_1").height() >= $(".c_content_1").find(".c_list").height()) {

                        that.addcomend(false, true)
                    }
                })

                //写cookie中的ruserid
                function guid() {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                }
                //获取cookie
                function getCookie(name) {
                    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                    if(arr=document.cookie.match(reg))
                        return unescape(arr[2]);
                    else
                        return null;
                }

                uuid = guid();
                if(getCookie("ruserid")){
                    uuid = getCookie("ruserid")
                }
                var exp = new Date();
                exp.setTime(exp.getTime() + 2*24*60*60*1000);
                var cookies="ruserid="+uuid+";expires="+ exp.toGMTString()+";path=/;domain=.163.com";
                document.cookie=cookies;


                //昵称和姓名相关内容//////////////////////////////////////////
                if(that.serverstate){
                    if (window.localStorage[phone]&&window.localStorage[username] && window.localStorage[headimage]&&window.localStorage[server]&&window.localStorage[roleId]){
                        that.personalinfo.selectedheadming=window.localStorage[headimage];
                        that.personalinfo.nikename=window.localStorage[username];
                        that.personalinfo.nikephone=window.localStorage[phone];
                        that.personalinfo.server=window.localStorage[server];
                        that.personalinfo.roleId=window.localStorage[roleId];
                        that.storagestatus = false
                    }
                }else if(that.phonestate){
                    if (window.localStorage[phone]&&window.localStorage[username] && window.localStorage[headimage]){
                        that.personalinfo.selectedheadming=window.localStorage[headimage];
                        that.personalinfo.nikename=window.localStorage[username];
                        that.personalinfo.nikephone=window.localStorage[phone];
                        that.storagestatus = false
                    }

                }else{
                    if (window.localStorage[username] && window.localStorage[headimage]){
                        that.personalinfo.selectedheadming=window.localStorage[headimage];
                        that.personalinfo.nikename=window.localStorage[username];
                        that.storagestatus = false
                    }
                }

                this.danmushow = true;
                if(/ipad/i.test(navigator.userAgent.toLowerCase()) == true) {
                    this.danmushow = false;
                }

            },
            mounted:function(){
                var that=this;
                that.$nextTick(function () {
                    $(".c_content_1").scroll(function() {

                        if($(".c_content_1").scrollTop() + $(".c_content_1").height() >= $(".c_content_1").find(".c_list").height()) {

                            that.addcomend(false, true)
                        }
                    })
                    $(".scan").hover(function() {
                        $("#qrcode1").show()
                    }, function() {
                        $("#qrcode1").hide()
                    })
                })
            },
            methods: {
                //载入过往评论
                addcomend: function() {
                    var that = this;
                    $.ajax({
                        url: baseurl + "live/comment.do",
                        dataType: "jsonp",
                        data: {
                            liveId: liveId,
                            stand: -that.comstart
                        },
                        jsonp: "callback",
                        type: "get",
                        success: function(resp) {
                            that.comdata = that.comdata.concat(resp.comdata);
                        }
                    })
                },
                //获取弹幕
                getbarrage: function() {
                    var that = this;
                    $.ajax({
                        url: baseurl + "live/barrage.do",
                        dataType: "jsonp",
                        data: {
                            liveId: liveId
                        },
                        jsonp: "callback",
                        type: "get",
                        success: function(resp) {
                            var r_len = parseInt(5 * Math.random());
                            resp.bar.splice(0, resp.length - r_len);
                            if(that.danmushow) {
                                var topArr = ['20', '30', '40', '70','100', '120', '150','180','210','240','270','300','320'];
                                var colorArr = ['#ffffff', "#00aaff", '#f6486e'];
                                var speedArr = [6, 7, 10, 9, 10, 8, 8, 12, 9, 15];
                                for(var i = 0; i < resp.bar.length; i++) {

                                    var danTemp = '';
                                    var top = parseInt(13 * Math.random());
                                    var color = parseInt(3 * Math.random());
                                    var speed = parseInt(10 * Math.random());
                                    var x = resp.bar[i];
                                    danTemp = '<li style="transition:all ' + speedArr[speed] + 's linear;;color:' + colorArr[color] + ';top:' + topArr[top] + 'px">' + x.content + '</li>'

                                    for(var z = 0; z < giftcontent.length; z++) { //礼物道具
                                        var to_o = new RegExp(giftcontent[z].val, "g");
                                        danTemp = danTemp.replace(to_o, giftcontent[z].desc);
                                    }

                                    for(var j = 0; j < emojilist.length; j++) { //表情道具
                                        var em_o = new RegExp(emojilist[j].val, "g");
                                        danTemp = danTemp.replace(em_o, emojilist[j].desc);
                                    }

                                    $('.danmu').append(danTemp);
                                }
                                $(".danmu li").not('.act').each(function(index) {
                                    (function(_this, _time) {
                                        setTimeout(function() {
                                            _this.addClass('act');
                                        }, _time);
                                    })($(this), 150 * index);
                                });
                            }
                        }
                    })
                },
                //获取最新评论
                addcommore: function() {
                    var that = this;
                    $.ajax({
                        url: baseurl + "live/comment.do",
                        dataType: "jsonp",
                        data: {
                            liveId: liveId,
                            stand: 0
                        },
                        jsonp: "callback",
                        type: "get",
                        success: function(resp) {
                            for(var i = resp.comdata.length - 1; i >= 0; i--) {
                                if(resp.comdata[i].id > that.comend) {
                                    that.comdata.unshift(resp.comdata[i])
                                }
                                //保存5个id
                            }
                            that.onlineNum = resp.onlinenum;

                        }
                    })
                },
                //删除聊天内容
                deleteelement: function(element) {
                    var that = this;
                    for(var i = 0; i < element.length; i++) {
                        for(var j = 0; j < that.condata.length; j++) {
                            if(element[i] == that.condata[j].id) {
                                that.condata.splice(j, 1);
                                //console.log(true, that.condata[j].id);
                            }
                        }
                    }
                },
                ///聊天室方法/////////////////////////
                // 送礼物
                startedit: function (type) {
                    var that = this
                    if (that.storagestatus) {
                        that.setnickname('startedit')
                    } else {
                        //开始进入编辑状态
                        if (type == 'gift') {
                            that.showlist.emoji = false;
                            that.showlist.quickmsg = false;
                            that.showlist.gift = !that.showlist.gift;
                        }
                        if (type == 'quickmsg') {
                            that.showlist.emoji = false;
                            that.showlist.gift = false;
                            that.showlist.quickmsg = !that.showlist.quickmsg;
                        }
                        if (type == 'emoji') {
                            that.showlist.quickmsg = false;
                            that.showlist.gift = false;
                            that.showlist.emoji = !that.showlist.emoji;
                        } else if (type == "submit") {
                            if (that.inputmessage.length > 0 && !that.inputmessage.match("^[ ]+$" && that.countdown == 0)) {
                                that.uploadcontent(that.inputmessage, that.personalinfo, function () {
                                    that.showlist.emoji=that.showlist.quickmsg = that.showlist.gift = false
                                    that.inputmessage = "";
                                    that.addcommore()
                                })
                            }
                        }
                    }
                },
                //发送道具
                startgift: function(val){
                    var that=this;
                    that.uploadcontent(val,that.personalinfo, function () {
                        that.showlist.emoji=that.showlist.quickmsg = that.showlist.gift = false
                        //that.inputmessage = "";
                        that.addcommore()
                    })
                },
                startactive: function (title, desc) {
                    var that = this
                    that.answerquestion.title = title||that.answerquestion.title;
                    that.answerquestion.desc = desc||that.answerquestion.desc;
                    if (that.storagestatus) {
                        that.setnickname('startactive')
                    } else {
                        that.answerquestion.show = true;
                    }
                },
                submitactive:function(){
                    var that = this
                    if(that.answerquestion.content.length<=0||that.answerquestion.content.match("^[ ]+$")){
                        that.answerquestion.error="互动内容不能为空！";
                    }
                    else if(that.answerquestion.content.length > 0 && !that.answerquestion.content.match("^[ ]+$") && that.countdown == 0){

                        that.uploadcontent("#"+that.answerquestion.title+"#"+that.answerquestion.content,that.personalinfo,function(){
                            that.answerquestion.desc = "";
                            that.answerquestion.title = "";
                            that.answerquestion.content = "";
                            that.answerquestion.error="";
                            that.answerquestion.show = false;
                            that.addcommore()
                        })
                    }
                },
                showlist_f: function (list) {
                    var that = this
                    if (that.storagestatus) {
                        that.setnickname('showlist' + list)
                    } else {
                        // console.log('showlist'+list)
                        that.showlist[list] = !that.showlist[list];
                    }
                },
                setnickname: function (afteraction) {
                    var that = this;
                    if(afteraction=='startactive'||afteraction=='startedit'){
                        that.personalinfo.show = true;
                        that.personalinfo.afteraction = afteraction
                    }
                },
                submitnickname: function (val) {
                    var that = this
                    if(val=="personalinfo"){
                        if(that.serverstate){
                            if(that.personalinfo.server == "" || that.personalinfo.server.match("^[ ]+$")){
                                that.personalinfo.errmsg = "请输入正确的服务器信息";
                                return;
                            }
                            if(that.personalinfo.roleId == "" || that.personalinfo.roleId.match("^[ ]+$")){
                                that.personalinfo.errmsg = "请输入正确的游戏角色信息";
                                return;
                            }
                        }

                        if(that.phonestate){
                            if(!FormCheck.phone(that.personalinfo.nikephone)){
                                that.personalinfo.errmsg = "请输入正确的手机号"
                                return;
                            }
                        }

                        if (that.personalinfo.nikename == "" || that.personalinfo.nikename.match("^[ ]+$")) {
                            that.personalinfo.errmsg = "请输入正确的昵称"
                        } else {
                            that.storagestatus = false;
                            that.personalinfo.show = false;
                            if (window.localStorage) {
                                window.localStorage[headimage] = that.personalinfo.selectedheadming;
                                window.localStorage[username] = that.personalinfo.nikename;
                                if(that.phonestate){
                                    window.localStorage[phone] = that.personalinfo.nikephone;
                                }
                                if(that.serverstate){
                                    window.localStorage[server] = that.personalinfo.server;
                                    window.localStorage[roleId] = that.personalinfo.roleId;
                                }
                            }
                            switch (that.personalinfo.afteraction) {
                                case 'startedit':
                                    that.startedit()
                                    break;
                                case 'startactive':
                                    that.startactive()
                                    break;
                                case 'startactive_2':
                                    that.startactive_2()
                                    break;
                                case 'showlistquickmsg':
                                    that.showlist_f('quickmsg')
                                    break;
                                case 'showlistgift':
                                    that.showlist_f('gift')
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                },
                uploadcontent: function (msg, ele,cb) {
                    var that = this
                    if (that.countdown == 0) {
                        that.countdown = 15;
                        if(that.serverstate){
                            var data={liveId: liveId, content: msg, author: ele.nikename, headImage: ele.selectedheadming,remark:ele.nikephone,serverInfo:ele.server+","+ele.roleId}
                        }else if(that.phonestate){
                            var data={liveId: liveId, content: msg, author: ele.nikename, headImage: ele.selectedheadming,remark:ele.nikephone}
                        }else{
                            var data={liveId: liveId, content: msg, author: ele.nikename, headImage: ele.selectedheadming}
                        }
                        $.ajax({
                            url: baseurl + "live/submitcomment.do",
                            dataType: "jsonp",
                            data: data,
                            type: 'get',
                            success: function (resp) {
                                if (resp.res_code == "10000") {
                                    cb()
                                }
                            }
                        })
                    }
                },
                sentlistmsg:function(msg){
                    var that = this
                    that.showlist.quickmsg=false;
                    that.showlist.emoji=false;
                    that.showlist.gift=false;
                    if((that.inputmessage+msg).length>144){
                        alert("内容太多，不能再加入表情！");
                        return;
                    }
                    that.inputmessage=that.inputmessage+msg;
                },
                //关闭小视频
                closepop:function(val){
                    var that=this;
                    that[val].show=false;
                },
                replacehtml:function(value){
                    if(!value){
                        return;
                    }
                    for(var i=0;i<giftcontent.length;i++){//礼物道具
                        var to_o=new RegExp(giftcontent[i].val,"g");
                        value = value.replace(to_o, "<img alt='"+giftcontent[i].desc+"' src='"+giftcontent[i].addr+"'/>");
                    }

                    for(var j=0;j<emojilist.length;j++){//表情道具
                        var em_o=new RegExp(emojilist[j].val,"g");
                        value = value.replace(em_o,'<img alt="" src="'+emojilist[j].addr+'">');
                    }
                    return value;
                }
            },
            filters: {
                changetogift:function(value){
                    if(!value){
                        return;
                    }
                    for(var i=0;i<giftcontent.length;i++){//礼物道具
                        var to_o=new RegExp(giftcontent[i].val,"g");
                        value = value.replace(to_o, "<img alt='"+giftcontent[i].desc+"' src='"+giftcontent[i].addr+"'/>");
                    }

                    for(var j=0;j<emojilist.length;j++){//表情道具
                        var em_o=new RegExp(emojilist[j].val,"g");
                        value = value.replace(em_o,'<img alt="" src="'+emojilist[j].addr+'">');
                    }
                    return value;
                }
            }
        })
    }
    return {
        init: function() {},
        liveM: liveM
    }
});
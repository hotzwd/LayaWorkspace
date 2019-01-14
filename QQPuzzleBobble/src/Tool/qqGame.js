window.openid = null;
window.wxLoadVideoAd = false;
window.qqPlayFinish = false;
 /**
 * qqGame
 */
var qqGame = (function (_super) {

    Laya.class(qqGame, "qqGame", _super);
    var _proto = qqGame.prototype;

    var instance;

    function getInstance() {
        if (instance === undefined) {
            instance = new qqGame();
        }
        return instance;
    }

    function qqGame() {
        //无父类
        // qqGame.super(this);
    }

    //两个广告切换
    _proto.bannerAd_1 = null;
    _proto.bannerAd_2 = null;
    //视频广告
    _proto.videoAd = null;
    //游戏开始时间
    _proto.start_game_time = 0;

    _proto.Init = function () {
        // BK.Script.log(1, 0, "------GameStatusInfo" + JSON.stringify(GameStatusInfo));
        this.start_game_time = (new Date()).getTime();
    }

    /**发送分数 */
    _proto.uploadUserScore = function(_score){
        if (!GameInQQ) 
            return;
        
        var data = {
            userData: [
                {
                    openId: GameStatusInfo.openId,
                    startMs: this.start_game_time.toString(),    //必填，游戏开始时间，单位为毫秒，字符串类型
                    endMs: ((new Date()).getTime()).toString(),  //必填，游戏结束时间，单位为毫秒，字符串类型
                    scoreInfo: {
                        score: _score, //分数，类型必须是整型数
                        // 附加属性（选填），最多16个，且名称必须为a1 ~ a16，类型必须是整型数
                        // a1: 100,
                        // ...
                        // a16: 100
                            },
                        },
                ],
                // type 描述附加属性的用途
                // order 排序的方式，
                // 1: 从大到小，即每次上报的分数都会与本周期的最高得分比较，如果大于最高得分则覆盖，否则忽略
                // 2: 从小到大，即每次上报的分数都会与本周期的最低得分比较，如果低于最低得分则覆盖，否则忽略
                // 3: 累积，即每次上报的积分都会累积到本周期已上报过的积分上（本质上是从大到小的一种特例）
                // 4: 直接覆盖，每次上报的积分都会将本周期的得分覆盖，不管大小
                // 如score字段对应，上个属性.
                attr: {
                    score: {   
                        type: 'rank',
                        order: 1,
                    },
                    // a1: {
                    //     type: 'rank',
                    //     order: 2,
                    // }
                    },
            };

        // gameMode: 游戏模式，如果没有模式区分，直接填 1
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        BK.QQ.uploadScoreWithoutRoom(1, data, function(errCode, cmd, data) {
            // 返回错误码信息
            if (errCode !== 0) {
                BK.Script.log(1,1,'上传分数失败!错误码：' + errCode);
                Gamelog("---------发送分数失败--------");
                LocalStorage.setItem("uploadScore",0);
            }else{
                Gamelog("---------发送分数成功--------");
                LocalStorage.setItem("uploadScore",1);	
            }
        });


    }

    /**显示好友排行 */
    _proto.showFriendRank = function(_page){
        if (!GameInQQ) 
            return;
         // 当前不支持一次同时拉取多个排行榜，需要拉取多次，而且必须等上一个拉取回来后才能拉取另外一个排行榜
        // 先拉 score 排行榜
        var attr = "score";//使用哪一种上报数据做排行，可传入score，a1，a2等
        var order = 1;     //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
        var rankType = 0; //要查询的排行榜类型，0: 好友排行榜
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        BK.QQ.getRankListWithoutRoom(attr, order, rankType, function(errCode, cmd, data) {
            BK.Script.log(1,1,"getRankListWithoutRoom callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
            // 返回错误码信息
            if (errCode !== 0) {
                BK.Script.log(1,1,'获取排行榜数据失败!错误码：' + errCode);
                return;
            }
            // 解析数据
            if (data) {
                for(var i=0; i < data.data.ranking_list.length; ++i) {
                    var rd = data.data.ranking_list[i];
                    Gamelog("-------排行榜--name="+rd.nick+",score="+rd.score);
                    // rd 的字段如下:
                    //var rd = {
                    //    url: '',            // 头像的 url
                    //    nick: '',           // 昵称
                    //    score: 1,           // 分数
                    //    selfFlag: false,    // 是否是自己
                    //};
                }

                var rankUI = UIManager.getInstance().getUI("GameRankUI");
                rankUI.updateRankData(data.data.ranking_list);	
            }
        });
    }

    //分享游戏
    _proto.shareGame = function () {
        if (!GameInQQ) {
             return;
         }
        BK.Share.share({
            // qqImgUrl: 'http://hudong.qq.com/docs/engine/img/848B76B5530AA7EE7B38E9A1267D7086.png',
            qqImgUrl: "http://staticmaterial-1251316161.cosgz.myqcloud.com/5639/bigIcon.1546400352597.png",
            // msgUrl: 'http://hudong.qq.com',
            isToFriend: true,
            socialPicPath: 'GameRes://Game/share.png',
            title: '小熊猫泡泡龙',
            summary: '[有人@我]小姐姐，小姐姐，我有个游戏你玩吗？',
            success: function (succObj) {
                BK.Console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
            },
            fail: function (failObj) {
                BK.Console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
            },
            complete: function() {
                BK.Console.log('------分享完成，不论成功失败');
                //监听分享结束事件
                MusicManager.getInstance().playMusic("res/music/1.mp3");
            }
            // complete :function (res) {
            //     BK.Script.log(1,1,"----- 分享完成，不论成功失败")
            //     //监听分享结束事件
            //     MusicManager.getInstance().playMusic("res/music/1.mp3");
            // }
        });
    }

    //显示banner广告
    _proto.showBannerAD = function(_show){
        return;
        if (!GameInQQ) {
             return;
         }
        
        Gamelog("showBannerAD-----");

        this.bannerAd_1 = BK.Advertisement.createBannerAd({
            viewId:1001,
        });
        this.bannerAd_1.onError(function (err) {
            Gamelog("showBannerAD 拉取失败 err.errMsg="+err.msg+" errCode="+err.code);
        });

        this.bannerAd_1.onLoad(function () {
            Gamelog("showBannerAD 拉取成功 = true");
        });
        if(_show){
            this.bannerAd_1.show();
        }else{
            this.bannerAd_1.destory();
        }
    }

    //显示广告
    _proto.createVideoAD = function () {
         if (!GameInQQ) {
             return;
         }
        
        Gamelog("createVideoAD-----");

        
        this.videoAd = BK.Advertisement.createVideoAd();

        // var t_videoAd = this.videoAd;
        this.videoAd.onLoad(function () {
            //加载成功
            BK.Script.log(1,1,"createVideoAD----- onLoad")
            Gamelog("createVideoAD 拉取成功 = true");
            window.wxLoadVideoAd = true;
        });

         this.videoAd.onError(function (err) {
            Gamelog("createVideoAD 拉取失败 err.errMsg="+err.msg+" errCode="+err.code);
            window.wxLoadVideoAd = false;
        });

    }

    /**展示视频广告 */
    _proto.showVideoAD = function (_call,_callbackFun) {
        if (!GameInQQ) {
            _callbackFun.call(_call,true);
             return;
         }
         Gamelog("showVideoAD-----this.videoAd="+this.videoAd+",window.wxLoadVideoAd="+window.wxLoadVideoAd);
        // var t_videoAd = wxGame.getInstance().videoAd;
        // var t_videoAd = this.videoAd;
        //没有加载完播放失败
        if(this.videoAd == null || !window.wxLoadVideoAd)
            return;

        window.qqPlayFinish = false;

        this.videoAd.onPlayStart(function () {
            //开始播放
            BK.Script.log(1,1,"------------showVideoAD  onPlayStart")
            //QQ玩一玩或者是引擎的bug 播放广告时没有关闭背景音效需要手动处理
            MusicManager.getInstance().stopMusic();
            
        });

        this.videoAd.onPlayFinish(function () {
            //播放结束
            BK.Script.log(1,1,"------------showVideoAD onPlayFinish")
            window.qqPlayFinish = true;
        });
    
        
        this.videoAd.onClose( function(){
            // t_videoAd.offClose(this);
            Gamelog("------------showVideoAD onClose  window.qqPlayFinish="+window.qqPlayFinish);
            //监听视频界面关闭事件
            MusicManager.getInstance().playMusic("res/music/1.mp3");
            _callbackFun.call(_call,window.qqPlayFinish);
        });

        this.videoAd.show();
    }

    return {
        getInstance: getInstance
    }
})();
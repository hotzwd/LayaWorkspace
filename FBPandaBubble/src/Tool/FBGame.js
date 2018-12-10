/**当前微信版本 */
window.wxSDKVersion;
window.FBRewardAd;
window.FBRewardAdLoad;
window.FBInterstitialAd;
window.FBInterstitialAdLoad;
/**
 * FBGame
 */
var FBGame = (function (_super) {

    Laya.class(FBGame, "FBGame", _super);
    var _proto = FBGame.prototype;

    var instance;

    function getInstance() {
        if (instance === undefined) {
            instance = new FBGame();
        }
        return instance;
    }
    function FBGame() {
        //无父类
        // FBGame.super(this);
    }

    _proto.sharedCanvasTexture = null;
    _proto.rewardAd = null;
    var preloadedInterstitial = null;
    //var rewardAd = null;
    var contextId = null;
    _proto.Init = function () {
        if (!GameInFackBook) 
            return;
        
        contextId = FBInstant.context.getID();
        window.FBRewardAd = null;
        window.FBRewardAdLoad = false;
        window.FBInterstitialAd = null;
        window.FBInterstitialAdLoad = false;

        
        console.log("base64=" + this.getImgBase64()); 
        //视频 757410831128353_843225039213598
        //插屏  757410831128353_758273957708707
        // FBInstant.getInterstitialAdAsync(
        //     '757410831128353_758273957708707', // Your Ad Placement Id
        // ).then(function(interstitial) {
        //     // Load the Ad asynchronously
        //     console.log('-------Load the Ad asynchronously');
        //     preloadedInterstitial = interstitial;
        //     return preloadedInterstitial.loadAsync();
        // }).then(function() {
        //     console.log('Interstitial preloaded')
        // }).catch(function(err){
        //     console.error('Interstitial failed to preload: ' + err.message);
        // });

        /*
        FBInstant.getRewardedVideoAsync('757410831128353_843225039213598').then(function(rewardedVideo) {
            rewardAd = rewardedVideo;
            return rewardAd.loadAsync();
        }).then(function() {
            // Ad loaded
            return rewardAd.showAsync();
        }).then(function() {
            // Ad watched
        });
        */
        // this.showRewardAd();

    }

    // _proto.showRewardAd = function(){
    //     FBInstant.getRewardedVideoAsync('757410831128353_843225039213598').then(function(rewardedVideo) {
    //         rewardAd = rewardedVideo;
    //         return rewardAd.loadAsync();
    //     });

    // }
    /**
     * 加载奖励广告
     */
    _proto.loadRewardAd = function(){
        if (!GameInFackBook) 
            return;
        window.FBRewardAd = null;
        window.FBRewardAdLoad = false;

        console.log("----------loadRewardAd ");
        FBInstant.getRewardedVideoAsync('306539786860916_306552303526331').then(function(rewardedVideo) {
            window.FBRewardAd = rewardedVideo;
            return window.FBRewardAd.loadAsync();
        }).then(function() {
            // Ad loaded
            window.FBRewardAdLoad = true;
            console.log("----------loadRewardAd load success");
        });
    }

    //加载插屏广告
    _proto.loadInterstitialAd = function(){
        if (!GameInFackBook) 
            return;
        window.FBInterstitialAd = null;
        window.FBInterstitialAdLoad = false;
        console.log("----------loadInterstitialAd ");
        //插屏
        FBInstant.getInterstitialAdAsync('306539786860916_306552213526340').then(function(interstitial) {
            window.FBInterstitialAd = interstitial;
            return window.FBInterstitialAd.loadAsync();
        }).then(function() {
            // Ad loaded
            window.FBInterstitialAdLoad = true;
            console.log("----------loadInterstitialAd load success");
        });
    }

    /**显示奖励广告 */
    _proto.showRewardAD = function(){
        if (!GameInFackBook) 
            return;
        window.FBRewardAd.showAsync().then(
            function() {
                // Ad watched
            }
        );
    }
    /**
     * 上传分数
     */
    _proto.uploadUserScore = function (_score) {
        if (!GameInFackBook) 
            return;
        contextId = FBInstant.context.getID();
        var score = parseInt(_score);
        //好友排行榜
        //  if (contextId != null) {
        //     FBInstant
        //     .getLeaderboardAsync('friendScore.' + contextId)
        //     .then(function(leaderboard){
        //         console.log("---score name="+leaderboard.getName());
        //         console.log("---score id="+leaderboard.getContextID())
        //         return leaderboard.setScoreAsync(score);
        //     })
        //     .then(function(){
        //         console.log('Score saved');
        //     });
        //  }

        //全部排行榜

        FBInstant.getLeaderboardAsync('globlaScore')
        .then(function(leaderboard) {
            console.log("---globlaScore name="+leaderboard.getName());
            console.log("---globlaScore id="+leaderboard.getContextID())
            return leaderboard.setScoreAsync(score);
        })
        .then(function(entry) {
            console.log(entry.getScore()); // 42
            console.log(entry.getExtraData()); // '{race: "elf", level: 3}'
        });

    }
    /**显示全部排行榜 */
    _proto.showGloblaRank = function(){
        FBInstant.getLeaderboardAsync('globlaScore')
        .then(function(leaderboard) {
            return leaderboard.getEntriesAsync();
        })
        .then(function(entries) {
            console.log(entries.length); // 10
            console.log(entries[0].getRank()); // 1
            console.log(entries[0].getScore()); // 42
            console.log(entries[0].getPlayer().getName()); // 2
            console.log(entries[0].getPlayer().getPhoto()); // 40

            var data = [];
            for (var i = 0; i < entries.length; ++i)
            {
                var t_entrie = entries[i];
                data.push({
                    rank:t_entrie.getRank(),
                    score:t_entrie.getScore(),
                    name:t_entrie.getPlayer().getName(),
                    icon:t_entrie.getPlayer().getPhoto(),
                });
            }
            UIManager.getInstance().getUI("GameRankUI").updateRankData(data);
        });
    }
     /**
     * 保存分数
     */
    _proto.saveUserScore = function (score) {
        if (!GameInFackBook) 
            return;
        
        var t_weekKey = 'score_' + GetWeekNum();

        FBInstant.player
        .getDataAsync(['scoreWeekKey','scoreWeekValue'])
        .then(function(data) {
            console.log('data is loaded');
            var t_scoreWeekKey = data['scoreWeekKey'];
            var t_scoreWeekValue = data['scoreWeekValue'];

            if(t_scoreWeekKey == null || score >t_scoreWeekKey){

                FBInstant.player.setDataAsync({
                    scoreWeekKey: t_weekKey,
                    scoreWeekValue:score,
                }).then(function(e) {
                    console.log('data is set');
                }); 
            }

            
            var connectedPlayers = FBInstant.player.getConnectedPlayersAsync()
            .then(function(players) {
                console.log(players.map(function(player) {
                return {
                    id: player.getID(),
                    name: player.getName(),
                }
                }));
            });


        });

    }

    /**
     * 分享游戏
     */
    
    _proto.shareGame = function () {

        if (!GameInFackBook) 
            return;
        console.log('-------------shareGame');
       //需要base64编码
       var t_image = this.getImgBase64();
       
        FBInstant.shareAsync({
            intent: "SHARE",
            image: t_image,
            text:"welcome to play game!",
            //data: { myReplayData: '...' },
            }).then(function() {
            // 继续游戏
            });
    }

    /**获取图片base64 地址 */
    _proto.getImgBase64 = function(){
        var shareSp = new Laya.Sprite();
        shareSp.loadImage("game/shard.png");

        var shareWidth = 500;
        var shareHeight = 400;
        var htmlC = shareSp.drawToCanvas(shareWidth, shareHeight, 0, 0);
        var canvas = htmlC.getCanvas();

        return canvas.toDataURL("image/png");
    }
    return {
            getInstance: getInstance
        }
})();
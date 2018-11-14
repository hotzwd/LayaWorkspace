/**
 * 主游戏界面
 */

var GameUILogic = (function (_super) {

    function GameUILogic() {
        GameUILogic.super(this);
    }
    Laya.class(GameUILogic, "GameUILogic", _super);
    _proto = GameUILogic.prototype;
    _proto.scoreLable = null;                                                //分数文字
     

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        
        // this.aniCloud.play(0,true);
        // this.btn_share.on(Laya.Event.CLICK,this,this._shareClickEvent);
        // this.btn_guid.on(Laya.Event.CLICK,this,this._guidClickEvent);
        // this.btn_tip.on(Laya.Event.CLICK,this,this._tipClickEvent);
        // this.btn_getGold.on(Laya.Event.CLICK,this,this._getGoldClickEvent);

        wxGame.getInstance().showClubBtn(false);
        
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    

    //显示分数
    _proto.setScore = function(p_score,p_anim){
        // Gamelog("-------gamescore="+SceneManager.getInstance().currentScene.gameScore)
        this.scoreLable.text = p_score;
        if(p_anim){
            this.scoreLable.scale(1.2,1.2);
            Laya.Tween.to(this.scoreLable,
            {
                scaleX:1,
                scaleY:1,
            },500,Laya.Ease.elasticOut);
        }
    }


  _proto._shareClickEvent = function(){
      wxGame.getInstance().shareGame();
  }

  //更新金币数量
  _proto.updateGoldNum = function(){
      this.t_gold.text = GetLocalGoldNum();
  }
  //更新生命值
  _proto.updateLifeNum = function(){
      this.t_life.text = GetLocalLifeNum();
  }

  //点击引导
  _proto._guidClickEvent = function(){
      UIManager.getInstance().showUI("GuidGameUI");
  }

  //更新视频图标状态
  _proto.updateVideoAd = function(){
        this.btn_getGold.visible = false;
        if(Browser.onMiniGame){
            if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd)
                return;
            this.btn_getGold.visible = true;
        }else{
            this.btn_getGold.visible = true;
        }
    }

    
  //展示奖励广告
  _proto.showRewardAd = function () {

        if (!Browser.onMiniGame) {
            return;
        }
        var t_gameUI = SceneManager.getInstance().currentScene.gameUI;

        var t_videoAd = wxGame.getInstance().videoAd;
        t_videoAd.show();
        t_videoAd.onClose( function(res){
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                Gamelog("正常播放结束");
                t_gameUI.rewardEffect();
            }
            else {
                // 播放中途退出，不下发游戏奖励
                Gamelog("视频中途退出");
            }
            t_videoAd.offClose();
            t_gameUI.updateVideoAd();
        })
    }

    //获取奖励效果
    _proto.rewardEffect = function(){
        var t_rewardNum = 10;
        SetLocalGoldNum(GetLocalGoldNum() + t_rewardNum);
        this.ani_addGold.play(0,false);
        this.updateGoldNum();
    }
  


    return GameUILogic;
})(GameUI);
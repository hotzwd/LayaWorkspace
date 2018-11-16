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
        
        this.aniLife.play(0,true);
        // this.btn_addLife.visible= true;

        this.guidBox.on(Laya.Event.CLICK,this,this.guidBoxClickEvent);
        this.btn_addLife.on(Laya.Event.CLICK,this,this.addLifeClick);

        this.bulletList.renderHandler = new Laya.Handler(this, this.updateBulletItem);
        this.hitDucktList.renderHandler = new Laya.Handler(this, this.updateHitDucktItem);


        wxGame.getInstance().showClubBtn(false);
        this.guidBox.visible = true;
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    //引导
    _proto.guidBoxClickEvent = function(){
        this.guidBox.visible = false;
        SceneManager.getInstance().currentScene.resumeGame();
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

    /**子弹数量数据 */
    _proto.updateBulletData = function(){
        this.t_noBullet.visible = false;

        // var t_list = new Laya.List();
        this.bulletList.array = [];
        var t_data = [];
        var t_bulletNum = SceneManager.getInstance().currentScene.bulletNum;
        for (var i = 0; i < t_bulletNum; i++) {
            t_data.push(i);
        }
        this.bulletList.array = t_data;
        if(t_bulletNum == 0)
            this.t_noBullet.visible = true;
    }

    _proto.updateBulletItem = function(cell, index) {
        // Gamelog("index = " + index);

    }
  

    /**击中鸭子数据 */
    _proto.updateHitDuckData = function(){
        this.hitDucktList.array = SceneManager.getInstance().currentScene.hitDuckList;
    }

    _proto.updateHitDucktItem = function(cell, index) {
        // Gamelog("index = " + index);
        var t_isHit = cell._dataSource;

        var duckImg = cell.getChildByName("img_duck");
        duckImg.skin ="Game/hit_icon_0"+ (t_isHit+1)+".png";
    }

    //点击增加生命
    _proto.addLifeClick = function(){
        this.btn_addLife.visible= false;
        SceneManager.getInstance().currentScene.pauseGame();
        //播放广告
        if (!Browser.onMiniGame) {
            SceneManager.getInstance().currentScene.addLife(true);
         }else{
             wxGame.getInstance().showVideoAD(SceneManager.getInstance().currentScene,SceneManager.getInstance().currentScene.addLife);
         }
    }

    //刷新是否可以显示增加生命
    _proto.updateAddLifeState = function(){
        if(Browser.onMiniGame){
            if(wxGame.getInstance().videoAd == null || !window.wxLoadVideoAd)
                return;
            this.btn_addLife.visible = true;
        }else{
            this.btn_addLife.visible = true;
        }
    }


    return GameUILogic;
})(GameUI);
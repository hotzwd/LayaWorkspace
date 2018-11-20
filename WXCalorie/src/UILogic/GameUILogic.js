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
        
        // this.aniLife.play(0,true);
        // this.btn_addLife.visible= true;

        this.plate1.on(Laya.Event.CLICK,this,this.onPlate1ClickEvent);
        this.plate2.on(Laya.Event.CLICK,this,this.onPlate2ClickEvent);
        // this.btn_addLife.on(Laya.Event.CLICK,this,this.addLifeClick);

        // this.bulletList.renderHandler = new Laya.Handler(this, this.updateBulletItem);
        // this.hitDucktList.renderHandler = new Laya.Handler(this, this.updateHitDucktItem);


        // wxGame.getInstance().showClubBtn(false);
        // this.guidBox.visible = true;
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

    /**
     * 显示计算结果
     */
    _proto.showCalculateText = function(p_str,p_isRight){
        this.t_calculate.visible = true;
        this.t_calculate.text = p_str;
        if(p_isRight){
            this.t_num.color = "#2db200";
        }else{
            this.t_num.color = "#d90000";
        }
        this.ani_num.play(0, false);
        this.ani_num.on(Laya.Event.COMPLETE,this,this.onAniNumComplete);
        
    }
   
    _proto.onAniNumComplete = function(){
        this.t_calculate.visible = false;
        this.plate1.visible = false;
        this.plate2.visible = false;
        this.t_num.color = "#666666";
        //重新开始
        SceneManager.getInstance().currentScene.updateFoodList();
    }

    

    //刷新盘子
    _proto.updateSelectPlate = function(){
        this.plate1.visible = false;
        this.plate2.visible = false;

        var t_select1 = SceneManager.getInstance().currentScene.selectPlate1;
        var t_select2 = SceneManager.getInstance().currentScene.selectPlate2;
        if(t_select1 != null){
            this.plate1.visible = true;
            this.showPlate(this.plate1,t_select1);
        }
        if(t_select2 != null){
            this.plate2.visible = true;
            this.showPlate(this.plate2,t_select2);
        }
    }
    //更新显示盘子
    _proto.showPlate = function(p_plate,p_targetPlate){
        p_plate.t_num.text = p_targetPlate.m_num;
        p_plate.img_food.skin = "Game/food"+p_targetPlate.m_type+".png";
        p_plate.img_left.visible = false;
    }


    //点击盘子1
    _proto.onPlate1ClickEvent = function(){
        this.plate1.visible = false;
        SceneManager.getInstance().currentScene.resetPlate(1);
    }

    //点击盘子2
    _proto.onPlate2ClickEvent = function(){
        this.plate2.visible = false;
        SceneManager.getInstance().currentScene.resetPlate(2);
    }

    _proto._shareClickEvent = function(){
        wxGame.getInstance().shareGame();
    }

   

    //点击增加生命
    _proto.addLifeClick = function(){
        this.btn_addLife.visible= false;
        SceneManager.getInstance().currentScene.pauseGame();
        //播放广告
        if (!Browser.onMiniGame) {
            // SceneManager.getInstance().currentScene.addLife(true);
            wxGame.getInstance().showVideoAD(SceneManager.getInstance().currentScene,SceneManager.getInstance().currentScene.addLife);
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
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

        // this.ani_num.on(Laya.Event.COMPLETE,this,this.onAniNumComplete);
        this.anim_face.on(Laya.Event.COMPLETE,this,this.onAniNumComplete);
        

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
        // this.t_calculate.text = p_str;
        // Gamelog("-----结果 length="+p_str.length);

        var t_time = p_str.length * 200;
        for (var i = 0; i < p_str.length; i++) {
            
            Laya.timer.once(200*i,this,function(_num){
                this.t_calculate.text = p_str.substring(0,_num);;
            },[i+1]);
        }


        Laya.timer.once(t_time,this,function(){
            
            if(p_isRight){
                this.t_num.color = "#2db200";
                SceneManager.getInstance().currentScene.addGameScore();

                this.plate1.img_left.visible = true;
                this.plate2.img_left.visible = true;
                this.plate1.img_food.visible = false;
                this.plate2.img_food.visible = false;

                //播放动画
                this.anim_face.play(0, false, "face_eat");
                this.anim_left.play(0,false,"human_left");
                this.anim_right.play(0,false,"human_right");

            }else{
                this.t_num.color = "#d90000";
                //播放动画
                this.anim_face.play(0, false, "face_fail");
                this.ani_arm.play(0, false);
                Laya.timer.once(500,this,function(){
                    //游戏结束
                    SceneManager.getInstance().currentScene.gameover();
                });
                // this.ani_arm.on(Laya.Event.COMPLETE,this,function(){
                // });
            }

            this.ani_num.play(0, false);
        });
        
        
    }
   
    _proto.onAniNumComplete = function(){
        this.anim_face.play(0, false, "face_eat");
        this.anim_face.stop();

        this.ani_arm.play(0, false);
        this.ani_arm.stop();

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
        p_plate.img_food.visible = true;
    }


    //点击盘子1
    _proto.onPlate1ClickEvent = function(){
        if(SceneManager.getInstance().currentScene.clickPlate){
            this.plate1.visible = false;
            SceneManager.getInstance().currentScene.resetPlate(1);
        }
    }

    //点击盘子2
    _proto.onPlate2ClickEvent = function(){
        
        if(SceneManager.getInstance().currentScene.clickPlate){
            this.plate2.visible = false;
            SceneManager.getInstance().currentScene.resetPlate(2);
        }
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


    //更新动画
    _proto.updateHumainAnim = function(){

        switch (SceneManager.getInstance().currentScene.gameScore) {
            case 50:
                
                break;
        
            default:
                break;
        }
    }

    
    return GameUILogic;
})(GameUI);
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
        
        // this.ani1.play(0,true);
        // this.btn_addLife.visible= true;


        this.guidBox.on(Laya.Event.CLICK,this,this.guidBoxfangkuai_ClickEvent);
        // this.btn_addLife.on(Laya.Event.CLICK,this,this.addLifeClick);

        // this.blockList.renderHandler = new Laya.Handler(this, this.updateBlockItem);

        this.curLevel = 0;
        // this.updateBlockData();
        wxGame.getInstance().showClubBtn(false);
        // this.guidBox.visible = true;
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    //引导
    _proto.guidBoxfangkuai_ClickEvent = function(){
        // MusicManager.getInstance().playSound("res/music/click.wav");
        this.guidBox.visible = false;
        SceneManager.getInstance().currentScene.fangkuai_startGame();
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

    //更新图块数据
    _proto.updateBlockData = function(){
        
        var t_level = this.curLevel;
        var t_levelData = LevelData[t_level];

       
    }

    
    


    return GameUILogic;
})(GameUI);
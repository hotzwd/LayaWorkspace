/**
 * 游戏结束界面
 */

var GameOverUILogic = (function (_super) {

    function GameOverUILogic() {
        GameOverUILogic.super(this);
    }
    Laya.class(GameOverUILogic, "GameOverUILogic", _super);
    _proto = GameOverUILogic.prototype;

    _proto.onInit = function () {
        this.zOrder = 100;

        this.btn_next.on(Laya.Event.CLICK,this,this._nextLevelEvent);
        this.btn_restart.on(Laya.Event.CLICK,this,this._researtLevelEvent);
        this.btn_help.on(Laya.Event.CLICK,this,this._helpClickEvent);

        this.initLevel();
    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    _proto.initUI = function(_win){

        if(_win){
            this.img_result.skin = "game_resoure/win-bg.png";
        }else{
            this.img_result.skin = "game_resoure/over-bg.png";
        }
    }

    //初始化关卡
    _proto.initLevel = function(p_score){
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        var t_leveData = GameLevelData[t_index];

        switch (t_index) {
            case 1:
                // this.m_canRotate = true;
                break;
        
            default:
                break;
        }


    }

    _proto._nextLevelEvent = function(){
        UIManager.getInstance().closeUI("GameOverUI");
        //如果最后一关重头开始
        var t_index= SceneManager.getInstance().currentScene.curLevelIndex;
        if(t_index == GameLevelData.length -1){
            SceneManager.getInstance().currentScene.curLevelIndex = -1;
        }
        SceneManager.getInstance().currentScene.nextlevelGame();
    }

    _proto._researtLevelEvent = function(){
        UIManager.getInstance().closeUI("GameOverUI");
        SceneManager.getInstance().currentScene.curLevelIndex --;
        SceneManager.getInstance().currentScene.nextlevelGame();

    }

    _proto._helpClickEvent = function(){
        wxGame.getInstance().shareGame();
    }

    

    return GameOverUILogic;
})(GameOverUI);
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
     /** 是否震动中 */
    this._isShake = false;

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        // MusicManager.getInstance().playMusic("res/music/1.mp3");

        
        // UIManager.getInstance().showUI("GameStartUI");
        
        this.aniCloud.play(0,true);

    }
    
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }

    // _proto.addScore = function(p_score){

    // }

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
   * 震动屏幕 
   * @param callBack
   * @param times
   * @param offset
   * @param speed
   *
   */  
    _proto.stageShake = function(){
        if(this._isShake)
             return;
        var times = 1;
        var offset = 10;
        var speed = 32

        this._isShake = true;
        var num = 0;
        var offsetArr = [0, 0];
        var point = new Laya.Point(Laya.stage.x, Laya.stage.y);
        Laya.stage.timerLoop(speed, this, shakeObject);
        
        function shakeObject(){
            var count = (num++) % 4;
            offsetArr[num % 2] = count < 2 ? 0 : offset;
            Laya.stage.x = offsetArr[0] + point.x;
            Laya.stage.y = offsetArr[1] + point.y;
            if(num > (times * 4 + 1)){
                Laya.stage.clearTimer(this, shakeObject);
                num = 0;
                this._isShake = false;
            }
        }
   
  }


    return GameUILogic;
})(GameUI);